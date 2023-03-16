import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  deleteMutipleStats,
  deleteSingleStat,
  getAllCategoryStats,
} from "services/stats.service";
import { customStyles } from "styles/components/table-custom-style";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import MultiConfirmation from "../common/bootstrapModal/MultiConfirmation";
import AddNpc from "./AddNpc";
import EditNpc from "./EditNpc";
import NpcDetail from "./NpcDetail";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ExpandedComponent from "components/common/ExpandedComponent";

const category = "npcStatic";

const NpcList = (props) => {
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
          {expandToggle && row === currentRow ? (
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

  // select multiple rows
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
                  expandToggle && row === currentRow ? true : false
                }
                expandableRowsComponent={({ data }) =>
                  ExpandedComponent({ data }, [
                    "name",
                    "level",
                    "enemy",
                    "id",
                    "_id",
                    "__v",
                    "createdAt",
                    "updatedAt",
                  ])
                }
                expandableRowsHideExpander
                highlightOnHover
                striped
                title={
                  <div className="col-lg-6 mb-2 text-white text-uppercase">
                    <h2 className="font-weight-bold mb-2"> NPCs </h2>
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
                        Add NPC
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
        <ConfirmationBox
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
