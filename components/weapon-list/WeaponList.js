import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddWeapon from "./AddWeapon";
import WeaponDetail from "./WeaponDetail";
import EditWeapon from "./EditWeapon";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import {
  deleteMutipleStats,
  deleteSingleStat,
  getAllCategoryStats,
} from "../../services/stats.service";
import Loader from "components/Loader.component";
import { customStyles } from "styles/components/table-custom-style";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ExpandedComponent from "components/common/ExpandedComponent";

const category = "weaponsStatic";

const WeaponList = (props) => {
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
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
      sortable: true,
      maxWidth: "200px",
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
      name: "Type",
      width: "150px",
      selector: (row) => row.type,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Gun Fire Mode",
      width: "140px",
      selector: (row) => row.gunFireMode,
    },
    // {
    //   id: 5,
    //   name: "Screen Shake Duration",
    //   width: "180px",
    //   selector: (row) => row.screenShakeDuration,
    // },
    {
      id: 6,
      name: "Ammo Type",
      width: "140px",
      selector: (row) => row.ammoType,
    },
    // {
    //   id: 7,
    //   name: "Fire Spread",
    //   width: "130px",
    //   selector: (row) => row.fireSpread,
    // },
    // {
    //   id: 8,
    //   name: "Damage",
    //   selector: (row) => row.damage,
    // },
    // {
    //   id: 9,
    //   name: "Magazine Size",
    //   width: "160px",
    //   selector: (row) => row.magazineSize,
    // },
    // {
    //   id: 10,
    //   name: "Gun Shot Intensity",
    //   width: "170px",
    //   selector: (row) => row.gunShotIntensity,
    // },
    {
      id: 11,
      name: "Shooting Range",
      width: "140px",
      selector: (row) => row.shootingRange,
    },
    // {
    //   id: 12,
    //   name: "Muzzle Flash Intensity",
    //   width: "180px",
    //   selector: (row) => row.muzzleFlashIntensity,
    // },
    {
      id: 13,
      name: "Recoil",
      width: "100px",
      selector: (row) => row.recoil,
    },
    {
      id: 14,
      name: "Fire Rate",
      width: "100px",
      selector: (row) => row.fireRate,
    },
    // {
    //   id: 15,
    //   name: "Screen Shake Duration",
    //   width: "190px",
    //   selector: (row) => row.screenShakeDuration,
    // },
    {
      id: 16,
      name: "ReloadTime",
      width: "110px",
      selector: (row) => row.reloadTime,
    },
    // {
    //   id: 17,
    //   name: "Bullet Shot Audio Clip",
    //   width: "180px",
    //   selector: (row) => row.bulletShotAudioClip,
    // },
    // {
    //   id: 18,
    //   name: "Bullet Hole Prefab",
    //   width: "150px",
    //   selector: (row) => row.bulletHolePrefab,
    // },
    // {
    //   id: 19,
    //   name: "Desc",
    //   width: "200px",
    //   selector: (row) => row.desc,
    // },
    // {
    //   id: 21,
    //   name: "Exp",
    //   selector: (row) => row.exp,
    // },
    // {
    //   id: 22,
    //   name: "Weight",
    //   selector: (row) => row.weight,
    // },
    // {
    //   id: 23,
    //   name: "Water",
    //   selector: (row) => row.resources.water,
    // },
    // {
    //   id: 24,
    //   name: "Fire",
    //   selector: (row) => row.resources.fire,
    // },
    // {
    //   id: 25,
    //   name: "Heat",
    //   selector: (row) => row.resources.heat,
    // },
    // {
    //   id: 26,
    //   name: "Air",
    //   selector: (row) => row.resources.air,
    // },
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
          {expandToggle && currentRow === row ? (
            <IoIosArrowUp size={20} />
          ) : (
            <IoIosArrowDown size={20} color="#5b5a5a" />
          )}
        </div>
      ),
    },
    {
      id: 27,
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

  // :: Multiple Delete selected Row check box
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

  //:Delete single Record
  const deleteClickHandler = (_id) => {
    deleteSingleStat(category, _id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllCategoryStats(category).then((res) => setData(res.data));
  }, [modalEdit, modalShow, multipleConfirmation, confirmation]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="data-table-wrapper p-2 ">
            {data ? (
              <DataTable
                columns={columns}
                data={data}
                title={
                  <div className="col-lg-6 mb-2">
                    <h2 className=" font-weight-bold mb-2 text-white">
                      Weapons
                    </h2>
                  </div>
                }
                customStyles={customStyles}
                selectableRows={true}
                onSelectedRowsChange={handleRowSelected}
                responsive
                pagination
                expandableRows
                expandableRowExpanded={(row) =>
                  row === currentRow && expandToggle ? true : false
                }
                onRowExpandToggled={(row) => setCurrentRow(row)}
                expandableRowsComponent={({ data }) =>
                  ExpandedComponent({ data }, [
                    "name",
                    "gunFireMode",
                    "shootingRange",
                    "reloadTime",
                    "fireRate",
                    "recoil",
                    "ammoType",
                    "type",
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
                actions={
                  <div className="dropdown dropdown-zindex">
                    <div
                      className="dropdown-toggle btn btn-secondary  text-uppercase"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-haspopup="true"
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
                        Add Weapons
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

      {modalShow ? (
        <AddWeapon
          onHide={() => setModalShow(false)}
          onClose={() => setModalShow(false)}
          show={modalShow}
          className="model-box"
        />
      ) : null}

      {modalView ? (
        <WeaponDetail
          onHide={() => {
            setModalView(false);
          }}
          id={rowId}
          show={modalView}
        />
      ) : null}

      {/* Edit weapon */}
      {modalEdit ? (
        <EditWeapon
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
          delFun={() => deleteClickHandler(confirmation.id)}
          title="Weapon"
        />
      ) : null}

      {multipleConfirmation.flag ? (
        <ConfirmationBox
          onHide={() =>
            setMultipleConfirmation({ ...multipleConfirmation, flag: false })
          }
          show={multipleConfirmation.flag}
          onClose={() => setMultipleConfirmation(false)}
          delFun={(e) => deleteSelectedRow(multipleConfirmation.id)}
          title="weapon"
        />
      ) : null}
    </div>
  );
};
export default WeaponList;
