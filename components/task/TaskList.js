import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "styles/components/table-custom-style";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import TaskDetail from "./TaskDetail";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  deleteMultipleTasks,
  deleteTask,
  getAllTasks,
} from "services/tasks.service";

const category = "taskStatic";

const TaskList = (props) => {
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [expandToggle, setExpandToggle] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [confirmation, setConfirmation] = useState({ flag: false, id: "" });
  const [multipleConfirmation, setMultipleConfirmation] = useState({
    flag: false,
    id: "",
  });
  const [rowId, setRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      id: 1,
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
      cell: (row, index) => index + 1,
      reorder: true,
    },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
      width: "250px",
    },
    {
      id: 4,
      name: "Description",
      maxWidth: "550px",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      width: "150px",
      name: "Type",
      selector: (row) => <span className="text-capitalize">{row.type}</span>,
    },
    {
      id: 6,
      name: "Giver",
      width: "120px",
      selector: (row) => row.giver,
    },
    {
      id: 9,
      width: "50px",
      cell: (row) => (
        <div
          className="text-white"
          role="button"
          onClick={() => {
            setCurrentRow(row);
            setExpandToggle(!expandToggle);
          }}
          data-testid="expander-button-undefined"
        >
          {expandToggle && currentRow === row ? (
            <IoIosArrowUp size={20} />
          ) : (
            <IoIosArrowDown size={20} color="#5b5a5a" />
          )}
        </div>
      ),
    },
    {
      id: 10,
      name: "Actions",
      width: "100px",
      button: true,
      cell: (row) => (
        <div className="dropdown">
          <div
            className="fs-3 text-gray-800"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            &#8943;
          </div>
          <ul className="dropdown-menu fs-6 dropdown-menu-dark">
            <li
              className="dropdown-item d-flex align-items-center "
              role="button"
              onClick={() => {
                setRowId(row._id);
                setModalView(true);
              }}
            >
              <AiOutlineEye size={20} />
              <span className="mx-2">View</span>
            </li>
            <li
              className="dropdown-item d-flex align-items-center "
              role="button"
              onClick={() => {
                setRowId(row._id);
                setModalEdit(true);
              }}
            >
              <BiEditAlt size={20} />
              <span className="mx-2">Edit</span>
            </li>
            <li
              className="dropdown-item d-flex align-items-center "
              role="button"
              onClick={() => {
                setConfirmation({ flag: true, id: row._id });
              }}
            >
              <RiDeleteBinLine size={20} />
              <span className="mx-2">Delete</span>
            </li>
          </ul>
        </div>
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
    multipleData["ids"] = arr;

    deleteMultipleTasks(multipleData).then((res) =>
      setMultipleConfirmation({ ...multipleConfirmation, flag: false })
    );
  };

  //:Delete Record
  const deleteClickHandler = (_id) => {
    deleteTask(_id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  //:: Call Get Api
  useEffect(() => {
    getAllTasks().then((res) => setData(res.data));
  }, [modalShow, modalEdit, confirmation, multipleConfirmation]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
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
                expandableRows
                expandableRowExpanded={(row) =>
                  row === currentRow && expandToggle ? true : false
                }
                expandableRowsComponent={({ data }) => (
                  <ExpandedTaskComponent data={data} />
                )}
                expandableRowsHideExpander
                highlightOnHover
                striped
                title={
                  <div className="col-lg-6 mb-2 text-white text-uppercase">
                    <h2 className="font-weight-bold mb-2"> Task </h2>
                  </div>
                }
                actions={
                  <div className="dropdown">
                    <div
                      className="dropdown-toggle btn btn-secondary  text-uppercase"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="mx-3">actions</span>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-dark ">
                      <li
                        className={`dropdown-item ${
                          selectedRows.length === 0 ? "disabled" : null
                        }`}
                        role="button"
                        onClick={(e) => {
                          setMultipleConfirmation({ flag: true });
                        }}
                      >
                        Delete
                      </li>
                      <li
                        className="dropdown-item"
                        role="button"
                        onClick={() => setModalShow(true)}
                      >
                        Add Task
                      </li>
                    </ul>
                  </div>
                }
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {/* <!-- ADD Armor --> */}
      {modalShow ? (
        <AddTask
          onHide={() => setModalShow(false)}
          onClose={() => setModalShow(false)}
          show={modalShow}
          className="model-box"
        />
      ) : null}

      {/* View Detail */}
      {modalView ? (
        <TaskDetail
          onHide={() => {
            setModalView(false);
          }}
          id={rowId}
          show={modalView}
        />
      ) : null}

      {/* Edit Detail */}
      {modalEdit ? (
        <EditTask
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
          delFun={(e) => deleteClickHandler(confirmation.id)}
          title="Task"
        />
      ) : null}

      {multipleConfirmation.flag ? (
        <ConfirmationBox
          onHide={() =>
            setMultipleConfirmation({ ...multipleConfirmation, flag: false })
          }
          show={multipleConfirmation.flag}
          onClose={() => setMultipleConfirmation(false)}
          delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
          title="Task"
        />
      ) : null}
    </>
  );
};

const ExpandedTaskComponent = ({ data }) => (
  <div className="pe-4 ps-5 pt-3">
    <p className="mb-0 text-gray-600">Goals</p>
    <div className="d-flex flex-wrap">
      {Object.keys(data.goal).map((item) => {
        return (
          <div
            className=" pb-3 pt-1 border-bottom border-secondary px-4"
            key={item}
          >
            <p className="text-gray-800">
              {item.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
              })}
            </p>
            <p className="mb-0 text-white">{data.goal[item]}</p>
          </div>
        );
      })}
    </div>
    <p className="mb-0 mt-3 text-gray-600">Rewards</p>
    <div className="d-flex flex-wrap gap-5">
      {data.rewards.map((r, i) => {
        return (
          <div className="d-flex flex-wrap">
            {Object.keys(r).map((item) => {
              return (
                <div
                  className=" pb-3 pt-1 border-bottom border-secondary px-4"
                  key={item}
                >
                  <p className="text-gray-800">
                    {item
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, function (str) {
                        return str.toUpperCase();
                      })}
                  </p>
                  <p className="mb-0 text-white">{data.rewards[i][item]}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  </div>
);

export default TaskList;
