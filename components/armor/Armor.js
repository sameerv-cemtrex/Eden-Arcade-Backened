import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddArmor from "./AddArmor";
import ArmorDetail from "./ArmorDetail";
import EditArmor from "./EditArmor";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import {
  deleteMutipleStats,
  deleteSingleStat,
  getAllCategoryStats,
} from "services/stats.service";
import Loader from "components/Loader.component";
import { customStyles } from "styles/components/table-custom-style";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ExpandedComponent from "components/common/ExpandedComponent";

const category = "armorStatic";

const Armor = (props) => {
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [expandToggle, setExpandToggle] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [confirmation, setConfirmation] = useState({ flag: false, id: "" });
  const [multipleConfirmation, setMultipleConfirmation] = useState({
    flag: false,
    id: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);

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
      fixed: "right",
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
                    "type",
                    "weight",
                    "sheild",
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
                    <h2 className="font-weight-bold mb-2"> Armor </h2>
                  </div>
                }
                actions={
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-secondary text-uppercase"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="mx-3">actions</span>
                    </button>
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
                        Add Armor
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

      {/*  ADD Armor  */}
      {modalShow ? (
        <AddArmor
          onHide={() => setModalShow(false)}
          onClose={() => setModalShow(false)}
          show={modalShow}
          className="model-box"
        />
      ) : null}

      {/* View Detail */}
      {modalView ? (
        <ArmorDetail
          onHide={() => {
            setModalView(false);
          }}
          id={rowId}
          show={modalView}
        />
      ) : null}

      {/* Edit Detail */}
      {modalEdit ? (
        <EditArmor
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
          title="Armor"
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
          title="Armor"
        />
      ) : null}
    </div>
  );
};

export default Armor;
