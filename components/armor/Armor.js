import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddArmor from "./AddArmor";
import ArmorDetail from "./ArmorDetail";
import EditArmor from "./EditArmor";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import MultiConfirmation from "../common/bootstrapModal/MultiConfirmation";
import {
  deleteMutipleStats,
  deleteSingleStat,
  getAllCategoryStats,
} from "services/stats.service";
import Loader from "components/Loader.component";

const category = "armorStatic";

const Armor = (props) => {
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [confirmation, setConfirmation] = useState({ flag: false, id: "" });
  const [multipleConfirmation, setMultipleConfirmation] = useState({
    flag: false,
    id: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);

  const customStyles = {
    title: {
      style: {},
    },
    rows: {
      style: {
        minHeight: "48px", // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        lineHeight: "16px",
        fontWeight: "500",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        lineHeight: "16px",
        fontWeight: "500",
        textTransform: "uppercase",
      },
    },
  };

  //:: Table Column
  const columns = [
    {
      id: 1,
      name: "Id",
      selector: (row) => row.id,
      cell: (row, index) => index + 1,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      id: 3,
      name: "Description",
      selector: (row) => row.desc,
      sortable: true,
      width: "200px",
      reorder: true,
    },
    {
      id: 4,
      name: "Type",
      selector: (row) => row.type,
    },
    {
      id: 5,
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      id: 6,
      name: "Shield",
      selector: (row) => row.shield,
    },
    {
      id: 7,
      name: "Exp",
      selector: (row) => row.exp,
    },
    {
      id: 8,
      name: "Water",
      selector: (row) => row.resources.water,
    },
    {
      id: 9,
      name: "Fire",
      selector: (row) => row.resources.fire,
    },
    {
      id: 10,
      name: "Heat",
      selector: (row) => row.resources.heat,
    },
    {
      id: 11,
      name: "Air",
      selector: (row) => row.resources.air,
    },
    {
      id: 12,
      name: "Actions",
      width: "200px",
      button: true,
      fixed: "right",
      cell: (row) => (
        <>
          {/*  onClick={() => viewAllData(row.id)} */}
          <button
            className="btn btn-outline btn-xs border"
            onClick={() => {
              setRowId(row._id);
              setModalView(true);
            }}
          >
            View
          </button>
          <button
            className="btn btn-outline btn-xs border"
            onClick={() => {
              setRowId(row._id);
              setModalEdit(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-outline btn-xs border"
            //  onClick={(e) => deleteClickHandler(e, row._id)}
            onClick={(e) => {
              setConfirmation({ flag: true, id: row._id });
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  // delete multiple
  const deleteSelectedRow = () => {
    var arr = [];
    selectedRows.map((ele) => {
      arr.push(ele._id);
    });
    const multipleData = {};
    multipleData["d1"] = arr;

    deleteMutipleStats(category, multipleData).then((res) =>
      setMultipleConfirmation({ ...multipleConfirmation, flag: false })
    );
  };

  const deleteClickHandler = (e, _id) => {
    e.preventDefault();
    deleteSingleStat(category, _id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllCategoryStats(category).then((res) => setData(res.data));
  }, [modalShow, modalEdit, confirmation, multipleConfirmation]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className="font-weight-bold mb-2"> Armor </h2>
        </div>
        <div className="col-lg-6 d-flex justify-content-end mb-2 gap-2">
          <div>
            <button
              key="delete"
              disabled={selectedRows.length === 0}
              className="btn btn-danger btn-fw "
              onClick={(e) => {
                setMultipleConfirmation({ flag: true });
              }}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={() => setModalShow(true)}
              type="button"
              className="btn btn-primary btn-fw"
            >
              Add Armor
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="data-table-wrapper">
                {data ? (
                  <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    selectableRows={true}
                    onSelectedRowsChange={handleRowSelected}
                    responsive
                    pagination
                  />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- ADD Armor --> */}
      <AddArmor
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className="model-box"
      />

      {/* View Detail */}
      <ArmorDetail
        onHide={() => {
          setModalView(false);
        }}
        id={rowId}
        show={modalView}
      />

      {/* Edit Detail */}
      <EditArmor
        onHide={() => {
          setModalEdit(false);
        }}
        onClose={() => setModalEdit(false)}
        id={rowId}
        show={modalEdit}
      />

      {/* Confirmation Delete */}
      <ConfirmationBox
        onHide={() => setConfirmation({ ...confirmation, flag: false })}
        show={confirmation.flag}
        onClose={() => setConfirmation(false)}
        delFun={(e) => deleteClickHandler(e, confirmation.id)}
        title="Armor"
      />

      <MultiConfirmation
        onHide={() =>
          setMultipleConfirmation({ ...multipleConfirmation, flag: false })
        }
        show={multipleConfirmation.flag}
        onClose={() => setMultipleConfirmation(false)}
        delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
        title="Armor"
      />
    </div>
  );
};

export default Armor;
