import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  deleteMutipleStats,
  deleteSingleStat,
  getAllCategoryStats,
} from "services/stats.service";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import MultiConfirmation from "../common/bootstrapModal/MultiConfirmation";
import AddNpc from "./AddNpc";
import EditNpc from "./EditNpc";
import NpcDetail from "./NpcDetail";

const category = "npcStatic";

const NpcList = (props) => {
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [confirmation, setConfirmation] = useState({ flag: false, id: "" });
  const [multipleConfirmation, setMultipleConfirmation] = useState({
    flag: false,
    id: "",
  });
  const [rowId, setRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

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
        fontSize: "16px",
        lineHeight: "16px",
        fontWeight: "bold",
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

  //:: Grid Columns
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
      reorder: true,
    },
    {
      id: 3,
      name: "Description",
      selector: (row) => row.desc,
      sortable: true,
      width: "160px",
      reorder: true,
    },
    {
      id: 4,
      name: "Level",
      selector: (row) => row.level,
    },
    {
      id: 5,
      name: "Enemy",
      selector: (row) => row.enemy,
    },
    {
      id: 6,
      name: "Health",
      selector: (row) => row.health,
    },
    {
      id: 7,
      name: "Damage",
      selector: (row) => row.damage,
    },
    {
      id: 8,
      name: "Fire Rate",
      selector: (row) => row.fireRate,
    },
    {
      id: 9,
      name: "Range",
      selector: (row) => row.range,
    },
    {
      id: 10,
      name: "Movement Speed",
      width: "160px",
      selector: (row) => row.movementSpeed,
    },
    {
      id: 11,
      name: "Exp",
      selector: (row) => row.exp,
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

  // select multiple rows
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

    deleteMutipleStats(category, multipleData).then((res) =>
      setMultipleConfirmation({ ...multipleConfirmation, flag: false })
    );
  };

  //:Delete Record
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
          <h2 className="font-weight-bold mb-2"> NPCs </h2>
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
              Add NPC
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
      {modalShow ? (
        <AddNpc
          onHide={() => setModalShow(false)}
          onClose={() => setModalShow(false)}
          show={modalShow}
          className="model-box"
        />
      ) : null}

      {/* View Detail */}
      {modalView ? (
        <NpcDetail
          onHide={() => {
            setModalView(false);
          }}
          id={rowId}
          show={modalView}
        />
      ) : null}

      {/* Edit Detail */}
      {modalEdit ? (
        <EditNpc
          onHide={() => {
            setModalEdit(false);
          }}
          onClose={() => setModalEdit(false)}
          id={rowId}
          show={modalEdit}
        />
      ) : null}

      {/* Confirmation Delete */}
      {confirmation.flag ? (
        <ConfirmationBox
          onHide={() => setConfirmation({ ...confirmation, flag: false })}
          show={confirmation.flag}
          onClose={() => setConfirmation(false)}
          delFun={(e) => deleteClickHandler(e, confirmation.id)}
          title="Npc"
        />
      ) : null}

      {multipleConfirmation.flag ? (
        <MultiConfirmation
          onHide={() =>
            setMultipleConfirmation({ ...multipleConfirmation, flag: false })
          }
          show={multipleConfirmation.flag}
          onClose={() => setMultipleConfirmation(false)}
          delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
          title="Npc"
        />
      ) : null}
    </div>
  );
};

export default NpcList;
