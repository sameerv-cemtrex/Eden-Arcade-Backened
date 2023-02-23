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
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import TaskDetail from "./TaskDetail";

const category = "taskStatic";

const Task = (props) => {
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

  const customStyles = {
    title: {
      style: {
        FontFace: "DM Sans",
      },
    },
    rows: {
      style: {
        minHeight: "48px",
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
      width: "150px",
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
      name: "Giver",
      selector: (row) => row.giver,
    },
    {
      id: 6,
      name: "Goal",
      selector: (row) => row.goal,
    },
    {
      id: 7,
      name: "Reward",
      selector: (row) => row.reward,
    },
    {
      id: 8,
      name: "Exp",
      selector: (row) => row.exp,
    },
    {
      id: 9,
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

  // multiple row select
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const deleteSelectedRow = () => {
    var arr = [];
    selectedRows.map((ele) => {
      arr.push(ele._id);
    });
    const multipleData = {};
    multipleData["d1"] = arr;

    deleteMutipleStats(category, multipleData).then(
      (res) =>
        res.status === 200 &&
        setMultipleConfirmation({ ...multipleConfirmation, flag: false })
    );
  };

  //:Delete Record
  const deleteClickHandler = (e, _id) => {
    e.preventDefault();
    deleteSingleStat(category, _id).then(
      (res) =>
        res.status === 200 && setConfirmation({ ...confirmation, flag: false })
    );
  };

  //:: Call Get Api
  useEffect(() => {
    getAllCategoryStats(category).then((res) => setData(res.message));
  }, [modalShow, modalEdit, confirmation, multipleConfirmation]);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className="font-weight-bold mb-2"> Task </h2>
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
              Add Task
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
      <AddTask
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className="model-box"
      />

      {/* View Detail */}
      <TaskDetail
        onHide={() => {
          setModalView(false);
        }}
        id={rowId}
        show={modalView}
      />

      {/* Edit Detail */}
      <EditTask
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
        title="Task"
      />

      <MultiConfirmation
        onHide={() =>
          setMultipleConfirmation({ ...multipleConfirmation, flag: false })
        }
        show={multipleConfirmation.flag}
        onClose={() => setMultipleConfirmation(false)}
        delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
        title="Task"
      />
    </>
  );
};

export default Task;
