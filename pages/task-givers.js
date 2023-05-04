import ConfirmationBox from "components/common/bootstrapModal/ConfirmationBox";
import ExpandedComponent from "components/common/ExpandedComponent";
import Loader from "components/Loader.component";
import AddGiver from "components/task-givers/AddGiver";
import EditGiver from "components/task-givers/EditGiver";
import ViewGiver from "components/task-givers/ViewGiver";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  deleteTaskGiver,
  getAllTaskGivers,
} from "services/task-givers.service";

import { customStyles } from "styles/components/table-custom-style";

function TaskGiversPage() {
  const [data, setData] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [expandToggle, setExpandToggle] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
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
      maxWidth: "100px",
      sortable: true,
      cell: (row, index) => index + 1,
      reorder: true,
    },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "160px",
      reorder: true,
    },
    {
      id: 3,
      name: "Photo",
      selector: (row) => (
        <div>
          <img src={row.photo} className="table-img" alt="task giver" />
        </div>
      ),
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      id: 4,
      name: "Profession",
      selector: (row) => row.profession,
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      id: 5,
      name: "Task Giver Id",
      width: "150px",
      selector: (row) => row.taskGiverId,
    },
    {
      id: 6,
      name: "Priority",
      width: "140px",
      selector: (row) => row.priority,
    },
    {
      id: 7,
      name: "Total Tasks",
      selector: (row) => row.totalTasks,
      width: "140px",
    },
    {
      id: 11,
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
      id: 12,
      name: "Actions",
      width: "200px",
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
                setShowViewModal(true);
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
                setShowEditModal(true);
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

    // deleteMultipleDrones(multipleData).then((res) => {
    //   setMultipleConfirmation({ ...multipleConfirmation, flag: false });
    // });
  };

  const deleteClickHandler = (_id) => {
    deleteTaskGiver(_id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllTaskGivers().then((res) =>
      res.code === 200 ? setData(res.data) : null
    );
  }, [showAddModal, showEditModal, confirmation, multipleConfirmation]);

  return (
    <div className="main-content">
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
                expandableRowsComponent={({ data }) =>
                  ExpandedComponent({ data }, [
                    "name",
                    "photo",
                    "taskGiverId",
                    "priority",
                    "totalTasks",
                    "__v",
                    "_id",
                    "id",
                    "itemId",
                    "createdAt",
                    "updatedAt",
                  ])
                }
                expandableRowsHideExpander
                highlightOnHover
                striped
                title={
                  <div className="col-lg-6 mb-2 text-white text-uppercase">
                    <h2 className="font-weight-bold mb-2">Task Givers</h2>
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
                      {/* <li
                        className={`dropdown-item ${
                          selectedRows.length === 0 ? "disabled" : null
                        }`}
                        role="button"
                        onClick={(e) => {
                          setMultipleConfirmation({ flag: true });
                        }}
                      >
                        Delete
                      </li> */}
                      <li
                        className="dropdown-item"
                        role="button"
                        onClick={() => setShowAddModal(true)}
                      >
                        Add Task Givers
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

      {showViewModal ? (
        <ViewGiver
          show={showViewModal}
          id={rowId}
          onHide={() => setShowViewModal(false)}
          onClose={() => setShowViewModal(false)}
        />
      ) : null}

      {showAddModal ? (
        <AddGiver
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        />
      ) : null}

      {showEditModal ? (
        <EditGiver
          show={showEditModal}
          id={rowId}
          onHide={() => setShowEditModal(false)}
          onClose={() => setShowEditModal(false)}
        />
      ) : null}

      {confirmation.flag ? (
        <ConfirmationBox
          onHide={() => setConfirmation({ ...confirmation, flag: false })}
          show={confirmation.flag}
          onClose={() => setConfirmation(false)}
          delFun={() => deleteClickHandler(confirmation.id)}
          title="Task Giver"
        />
      ) : null}

      {multipleConfirmation.flag ? (
        <ConfirmationBox
          onHide={() =>
            setMultipleConfirmation({ ...multipleConfirmation, flag: false })
          }
          show={multipleConfirmation.flag}
          onClose={() => setMultipleConfirmation(false)}
          delFun={() => deleteSelectedRow(multipleConfirmation.id)}
          title="Task Giver"
        />
      ) : null}
    </div>
  );
}

export default TaskGiversPage;
