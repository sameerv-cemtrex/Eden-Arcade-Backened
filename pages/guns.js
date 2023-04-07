import ConfirmationBox from "components/common/bootstrapModal/ConfirmationBox";
import AddGun from "components/guns/AddGun";
import EditGun from "components/guns/EditGun";
import ViewGun from "components/guns/ViewGun";
import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  deleteGun,
  deleteMultipleGuns,
  getAllGuns,
} from "services/guns.service";
import { customStyles } from "styles/components/table-custom-style";

function GunsPage() {
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
      width: "200px",
      reorder: true,
    },
    {
      id: 3,
      name: "Accracy",
      cell: (row) => (
        <div className="d-flex gap-3">
          <div className="">
            <p className="mb-1 text-gray-800">Min</p>
            <p className="mb-0">{row.minMaxSettings?.accuracy.min}</p>
          </div>
          <div className="">
            <p className="mb-1 text-gray-800">Max</p>
            <p className="mb-0">{row.minMaxSettings?.accuracy.max}</p>
          </div>
        </div>
      ),
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      id: 5,
      name: "Reload speed",
      width: "150px",
      selector: (row) => (
        <div className="d-flex gap-3">
          <div className="">
            <p className="mb-1 text-gray-800">Min</p>
            <p className="mb-0">{row.minMaxSettings.ReloadSpeed.min}</p>
          </div>
          <div className="">
            <p className="mb-1 text-gray-800">Max</p>
            <p className="mb-0">{row.minMaxSettings.ReloadSpeed.max}</p>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      name: "length",
      width: "100px",
      selector: (row) => row.specificGunValues.OtherTraits.length,
    },
    {
      id: 7,
      name: "Weight",
      selector: (row) => row.specificGunValues.OtherTraits.weight,
      width: "100px",
    },
    {
      id: 8,
      name: "Silencer",
      selector: (row) =>
        row.specificGunValues.OtherTraits.silencer ? "true" : "false",
      width: "100px",
    },
    {
      id: 9,
      name: "Swap Delay",
      selector: (row) => row.additionalSettings.SwapDelay,
      width: "100px",
    },
    {
      id: 10,
      name: "Pickup Delay",
      selector: (row) => row.additionalSettings.PickupDelay,
      width: "100px",
    },
    {
      id: 11,
      name: "Moevment Speed Penalty",
      selector: (row) => row.additionalSettings.MovementSpeedPenalty,
      width: "100px",
    },
    {
      id: 12,
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
    ,
    {
      id: 13,
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

    deleteMultipleGuns(multipleData).then((res) => {
      setMultipleConfirmation({ ...multipleConfirmation, flag: false });
    });
  };

  const deleteClickHandler = (_id) => {
    deleteGun(_id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllGuns().then((res) => (res.code === 200 ? setData(res.data) : null));
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
                expandableRowsComponent={({ data }) => ExpandedGuns({ data })}
                expandableRowsHideExpander
                highlightOnHover
                striped
                title={
                  <div className="col-lg-6 mb-2 text-white text-uppercase">
                    <h2 className="font-weight-bold mb-2">Guns</h2>
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
                        onClick={() => setShowAddModal(true)}
                      >
                        Add guns
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
        <ViewGun
          show={showViewModal}
          id={rowId}
          onHide={() => setShowViewModal(false)}
          onClose={() => setShowViewModal(false)}
        />
      ) : null}

      {showAddModal ? (
        <AddGun
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        />
      ) : null}

      {showEditModal ? (
        <EditGun
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
          title="GUN"
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
          title="Gun"
        />
      ) : null}
    </div>
  );
}

export default GunsPage;

const ExpandedGuns = ({ data }) => {
  return (
    <div className="expanded-row">
      <div className="d-flex flex-wrap pe-4 ps-5 pt-3 gap-4">
        {Object.keys(data.minMaxSettings).map((item) => (
          <div className="d-flex flex-column justify-content-center">
            <p className="text-gray-600 mb-0">{item}</p>
            <div className="d-flex gap-3">
              <div className="">
                <p className="mb-1 text-gray-800">Min</p>
                <p className="mb-0 text-white">
                  {data.minMaxSettings[item].min}
                </p>
              </div>
              <div className="">
                <p className="mb-1 text-gray-800">Max</p>
                <p className="mb-0 text-white">
                  {data.minMaxSettings[item].max}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-uppercase text-gray-500 ms-5 mb-2 mt-3">ratings</p>
      <div className="d-flex flex-wrap pe-4 ps-5 pt-3 gap-4">
        {Object.keys(data.specificGunValues.Ratings).map((item) => (
          <div className="d-flex flex-column justify-content-center">
            <p className="text-gray-600 mb-0">{item}</p>
            <div className="d-flex gap-3">
              {item !== "chance"
                ? data.specificGunValues.Ratings[item].map((t, index) => (
                    <div>
                      <p className="text-gray-700">LV {index + 1}</p>
                      <div className="d-flex gap-3">
                        <div className="">
                          <p className="mb-1 text-gray-800">Min</p>
                          <p className="mb-0 text-white">{t.min}</p>
                        </div>
                        <div className="">
                          <p className="mb-1 text-gray-800">Max</p>
                          <p className="mb-0 text-white">{t.max}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>

      <p className="text-uppercase text-gray-500 ms-5 mb-2 mt-3">Modifiers</p>
      <div className="d-flex flex-wrap pe-4 ps-5 gap-5">
        {Object.keys(data.modifiers).map((item) => (
          <div className="d-flex flex-column justify-content-center">
            <p className="text-gray-500 mb-0">{item}</p>
            <div className="d-flex gap-3">
              {Object.keys(data.modifiers[item]).map((t) => (
                <div className="d-flex flex-column justify-content-center">
                  <p className="text-gray-600 mb-0">{t}</p>
                  <p className="text-white">{data.modifiers[item][t]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
