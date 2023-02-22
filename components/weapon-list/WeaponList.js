import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddWeapon from "./AddWeapon";
import WeaponDetail from "./WeaponDetail";
import EditWeapon from "./EditWeapon";
import ConfirmationBox from "../common/bootstrapModal/ConfirmationBox";
import MultiConfirmation from "../common/bootstrapModal/MultiConfirmation";
import {
  deleteMutipleStats,
  deleteSingleStat,
  getAllCategoryStats,
} from "../../services/stats.service";

const category = "weaponsStatic";

const WeaponList = (props) => {
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
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
    {
      id: 5,
      name: "Screen Shake Duration",
      width: "180px",
      selector: (row) => row.screenShakeDuration,
    },
    {
      id: 6,
      name: "Ammo Type",
      width: "140px",
      selector: (row) => row.ammoType,
    },
    {
      id: 7,
      name: "Fire Spread",
      width: "130px",
      selector: (row) => row.fireSpread,
    },
    {
      id: 8,
      name: "Damage",
      selector: (row) => row.damage,
    },
    {
      id: 9,
      name: "Magazine Size",
      width: "160px",
      selector: (row) => row.magazineSize,
    },
    {
      id: 10,
      name: "Gun Shot Intensity",
      width: "170px",
      selector: (row) => row.gunShotIntensity,
    },
    {
      id: 11,
      name: "Shooting Range",
      width: "140px",
      selector: (row) => row.shootingRange,
    },
    {
      id: 12,
      name: "Muzzle Flash Intensity",
      width: "180px",
      selector: (row) => row.muzzleFlashIntensity,
    },
    {
      id: 13,
      name: "Recoil",
      selector: (row) => row.recoil,
    },
    {
      id: 14,
      name: "Fire Rate",
      width: "100px",
      selector: (row) => row.fireRate,
    },
    {
      id: 15,
      name: "Screen Shake Duration",
      width: "190px",
      selector: (row) => row.screenShakeDuration,
    },
    {
      id: 16,
      name: "ReloadTime",
      width: "110px",
      selector: (row) => row.reloadTime,
    },
    {
      id: 17,
      name: "Bullet Shot Audio Clip",
      width: "180px",
      selector: (row) => row.bulletShotAudioClip,
    },
    {
      id: 18,
      name: "Bullet Hole Prefab",
      width: "150px",
      selector: (row) => row.bulletHolePrefab,
    },
    {
      id: 19,
      name: "Desc",
      width: "200px",
      selector: (row) => row.desc,
    },
    {
      id: 21,
      name: "Exp",
      selector: (row) => row.exp,
    },
    {
      id: 22,
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      id: 23,
      name: "Water",
      selector: (row) => row.resources.water,
    },
    {
      id: 24,
      name: "Fire",
      selector: (row) => row.resources.fire,
    },
    {
      id: 25,
      name: "Heat",
      selector: (row) => row.resources.heat,
    },
    {
      id: 26,
      name: "Air",
      selector: (row) => row.resources.air,
    },
    {
      id: 27,
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
  const deleteClickHandler = (e, _id) => {
    e.preventDefault();

    deleteSingleStat(category, _id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

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

  useEffect(() => {
    getAllCategoryStats(category).then((res) => setData(res.message));
  }, [modalEdit, modalShow, multipleConfirmation, confirmation]);
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className=" font-weight-bold mb-2"> Weapons </h2>
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
              Add Weapon
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="data-table-wrapper">
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                  selectableRows={true}
                  onSelectedRowsChange={handleRowSelected}
                  responsive
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddWeapon
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className="model-box"
      />

      <WeaponDetail
        onHide={() => {
          setModalView(false);
        }}
        id={rowId}
        show={modalView}
      />

      {/* Edit weapon */}
      <EditWeapon
        onHide={() => {
          setModalEdit(false);
        }}
        onClose={() => setModalEdit(false)}
        editdata={rowId}
        show={modalEdit}
        // inputChangeHandler={inputChangeHandler}
      />

      {/* Confirmation Delete */}
      <ConfirmationBox
        onHide={() => setConfirmation({ ...confirmation, flag: false })}
        show={confirmation.flag}
        onClose={() => setConfirmation(false)}
        delFun={(e) => deleteClickHandler(e, confirmation.id)}
        title="Weapon"
      />

      <MultiConfirmation
        onHide={() =>
          setMultipleConfirmation({ ...multipleConfirmation, flag: false })
        }
        show={multipleConfirmation.flag}
        onClose={() => setMultipleConfirmation(false)}
        delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
        title="weapon"
      />
    </div>
  );
};
export default WeaponList;
