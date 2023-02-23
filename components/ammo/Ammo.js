import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import AddAmmo from "./AddAmmo";
import AmmoDetail from "./AmmoDetail";
import EditAmmo from "./EditAmmo";
import MultiConfirmation from "../common/bootstrapModal/MultiConfirmation";
import {
  deleteMutipleStats,
  getAllCategoryStats,
  deleteSingleStat,
} from "services/stats.service";
import Loader from "components/Loader.component";

const category = "ammosStatic";

const Ammo = (props) => {
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

  const columns = [
    {
      id: 1,
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      cell: (row, index) => index + 1,
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
      width: "200px",
      sortable: true,
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
      name: "Damage",
      selector: (row) => row.damage,
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
      cell: (row) => (
        <>
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
            // onClick={(e) => deleteClickHandler(e, row._id)}
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
  // :: Style for table
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

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const deleteSelectedRow = () => {
    var arr = [];
    selectedRows.map((ele) => {
      console.log("id", ele._id);
      arr.push(ele._id);
    });
    const multipleData = {};
    multipleData["d1"] = arr;

    deleteMutipleStats(category, multipleData).then((res) => {
      setMultipleConfirmation(false);
    });
  };

  //:Delete Record
  const deleteClickHandler = (e, _id) => {
    e.preventDefault();

    deleteSingleStat(category, _id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllCategoryStats(category).then((res) => setData(res.message));
  }, [modalShow, modalEdit, confirmation, multipleConfirmation]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className="font-weight-bold mb-2"> Ammo </h2>
        </div>
        <div className="col-lg-6 d-flex justify-content-end mb-2 gap-1">
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
              Add Ammo
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

      {/* <!-- ADD ammo --> */}
      <AddAmmo
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className="model-box"
      />

      {/* View Ammo Detail */}
      <AmmoDetail
        onHide={() => {
          setModalView(false);
        }}
        id={rowId}
        show={modalView}
      />

      {/* Edit Detail */}
      <EditAmmo
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
        title="Ammos"
      />

      <MultiConfirmation
        onHide={() =>
          setMultipleConfirmation({ ...multipleConfirmation, flag: false })
        }
        show={multipleConfirmation.flag}
        onClose={() => setMultipleConfirmation(false)}
        delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
        title="Ammo"
      />
    </div>
  );
};

export default Ammo;
