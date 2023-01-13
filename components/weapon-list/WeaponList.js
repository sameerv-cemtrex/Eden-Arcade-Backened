import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Search from '../common/Search';
import qs from 'qs';
import Image from 'next/image';
import axios from 'axios';
import AddWeapon from './AddWeapon';
import WeaponDetail from './WeaponDetail';
import EditWeapon from './EditWeapon';
import ConfirmationBox from '../common/bootstrapModal/ConfirmationBox';


const WeaponList = (props) => {

  //:object Declaration 
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [confirmation, setConfirmation] = useState({ flag: false, id: "" });
  const [searchKey, setSearchKey] = useState("");
  const [editData, setEditData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [change, setChange] = useState(false);

  //:: Enable delete button on click checkbox
  function isDisabled() {
    const len = selectedRows.filter(change => change).length;
    return len === 0;
  }

  // :: Multiple Delete selected Row check box
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const deleteSelectedRow = () => {
    var arr = [];
    selectedRows.map((ele) => {
      console.log('id', ele._id)
      arr.push(ele._id)
    })
    const multipleData = {};
    multipleData['d1'] = arr;
    // console.log(arr)
    console.log('multipleData', multipleData);

    if (window.confirm("Are you want to delete?")) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/deleteAllData/weaponsStatic`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        },
        body: JSON.stringify(multipleData)

      }).then((res) => {
        console.log("result", res);
        window.location.reload();
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }

  //:: Call Get Api
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getAllData/weaponsStatic`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify()

    }).then(response => response.json())
      .then(data => {
        setData(data.message);
        //console.log("result", data);
      }
      );
  }, []);

  //:Delete single Record
  const deleteClickHandler = (e, _id) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/deleteData/${_id}/weaponsStatic/`, {
      method: 'POST'
    }).then((res) => {
      setData(data.filter(data => data._id !== _id))
      res.json().then((resp) => {
        // console.warn(resp);
        setConfirmation({ ...confirmation, flag: false })
      })
    })
  };

  // :: Update Data
  function updatedDataNew(_id) {

    localStorage.setItem('editedItem', _id)
    setModalEdit(true)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getAllData/${_id}/weaponsStatic/`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify()

    }).then(response => response.json())
      .then(data => {
        setEditData(data.message);
        console.log(data);
      }
      );
  }

  const columns = [
    {
      id: 1,
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
      reorder: true
    },
    {
      id: 3,
      name: "Type",
      width: "150px",
      selector: (row) => row.type,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Gun Fire Mode",
      width: "140px",
      selector: (row) => row.gunFireMode
    },
    {
      id: 5,
      name: "Screen Shake Duration",
      width: "180px",
      selector: (row) => row.screenShakeDuration
    },
    {
      id: 6,
      name: "Ammo Type",
      selector: (row) => row.ammoType
    },
    {
      id: 7,
      name: "Fire Spread",
      selector: (row) => row.fireSpread
    },
    {
      id: 8,
      name: "Damage",
      selector: (row) => row.damage
    },
    {
      id: 9,
      name: "Magazine Size",
      width: "160px",
      selector: (row) => row.magazineSize
    },
    {
      id: 10,
      name: "Gun Shot Intensity",
      width: "170px",
      selector: (row) => row.gunShotIntensity
    },
    {
      id: 11,
      name: "Shooting Range",
      selector: (row) => row.shootingRange
    },
    {
      id: 12,
      name: "Muzzle Flash Intensity",
      width: "180px",
      selector: (row) => row.muzzleFlashIntensity
    },
    {
      id: 13,
      name: "Recoil",
      selector: (row) => row.recoil
    },
    {
      id: 14,
      name: "Fire Rate",
      width: "100px",
      selector: (row) => row.fireRate
    },
    {
      id: 15,
      name: "Screen Shake Duration",
      width: "190px",
      selector: (row) => row.screenShakeDuration
    },
    {
      id: 16,
      name: "ReloadTime",
      selector: (row) => row.reloadTime
    },
    {
      id: 17,
      name: "Bullet Shot Audio Clip",
      width: "180px",
      selector: (row) => row.bulletShotAudioClip
    },
    {
      id: 18,
      name: "Bullet Hole Prefab",
      width: "150px",
      selector: (row) => row.bulletHolePrefab
    },
    {
      id: 19,
      name: "Desc",
      width: "200px",
      selector: (row) => row.desc
    },
    {
      id: 21,
      name: "Exp",
      selector: (row) => row.exp
    },
    {
      id: 22,
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      id: 23,
      name: "Actions",
      width: "200px",
      button: true,
      cell: (row) => (
        <>
          {/*  onClick={() => viewAllData(row.id)} */}
          <button className="btn btn-outline btn-xs border"
            onClick={() => {
              localStorage.setItem('selectedItem', row.id)
              setModalView(true)
            }
            } >
            View
          </button>
          <button
            className="btn btn-outline btn-xs border"
            onClick={() => {
              updatedDataNew(row._id)
            }
            }
          >
            Edit
          </button>
          <button className="btn btn-outline btn-xs border"
            // onClick={(e) => deleteClickHandler(e, row._id)}
            onClick={(e) => {
              setConfirmation({ flag: true, id: row._id })
            }
            }
          >
            Delete
          </button>
        </>
      ),
    }
  ];

  //::Edit button click handler
  const handleButtonClick = (e, id) => {
    e.preventDefault();
    console.log("Row Id", id);
  };


  // :: Style for table
  const customStyles = {
    title: {
      style: {
      },
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


  return (
    <div>
      <div className="row">
        <div className='col-lg-6 mb-2'>
          <h2 className=" font-weight-bold mb-2"> Weapons </h2>
        </div>
        <div className='col-lg-6 d-flex justify-content-end mb-2 gap-2'>
          <div>
          <button key="delete"  disabled={isDisabled()}
              className="btn btn-danger btn-fw "
              onClick={deleteSelectedRow}
            >
              Delete
            </button>
          </div>
          <div>
            <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary btn-fw">Add Weapon</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className='data-table-wrapper'>
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

      {/*  ADD Armor  */}
      <AddWeapon
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className='model-box'
      />


      {/* View Detail */}
      <WeaponDetail
        onHide={() => {
          localStorage.removeItem('selectedItem');
          setModalView(false)
        }
        }
        show={modalView}
      />

      {/* Edit weapon */}
      <EditWeapon
        onHide={() => {
          localStorage.removeItem('editedItem');
          setModalEdit(false)
        }
        }
        onClose={() => setModalEdit(false)}
        editData={editData}
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

    </div>
  )
}
export default WeaponList