import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState, useReducer } from 'react'
import DataTable from 'react-data-table-component';
import ConfirmationBox from '../common/bootstrapModal/ConfirmationBox';
import Search from '../common/Search';
import AddNpc from './AddNpc';
import EditNpc from './EditNpc';
import NpcDetail from './NpcDetail';

const NpcList = (props) => {

  //:object Declaration 
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [confirmation, setConfirmation] = useState({ flag: false, id: "" });
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/deleteAllData/npcStatic`, {
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getAllData/npcStatic`, {
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

  //:: Grid Columns
  const columns = [
    // {
    //   id: 1,
    //   name: "Id",
    //   selector: (row) => row.id,
    //   sortable: true,
    //   reorder: true
    // },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Description",
      selector: (row) => row.desc,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Level",
      selector: (row) => row.level
    },
    {
      id: 5,
      name: "Enemy",
      selector: (row) => row.enemy
    },
    {
      id: 6,
      name: "Health",
      selector: (row) => row.health
    },
    {
      id: 7,
      name: "Damage",
      selector: (row) => row.damage
    },
    {
      id: 8,
      name: "Fire Rate",
      selector: (row) => row.fireRate
    },
    {
      id: 9,
      name: "Range",
      selector: (row) => row.range
    },
    {
      id: 10,
      name: "Movement Speed",
      selector: (row) => row.movementSpeed
    },
    {
      id: 11,
      name: "Experience",
      selector: (row) => row.exp
    },
    {
      id: 12,
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
            //  onClick={(e) => deleteClickHandler(e, row._id)}
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

  //:Delete Record
  const deleteClickHandler = (e, _id) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/deleteData/${_id}/npcStatic/`, {
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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getAllData/${_id}/npcStatic/`, {
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
      });
  }


  return (
    <div>
      <div className="row">
        <div className='col-lg-6 mb-2'>
          <h2 className="font-weight-bold mb-2"> NPCs </h2>
        </div>
        <div className='col-lg-6 d-flex justify-content-end mb-2 gap-2'>
          <div>
            {/* <Search /> */}

            <button key="delete" disabled={isDisabled()}
              className="btn btn-danger btn-fw "
              onClick={deleteSelectedRow}
            >
              Delete
            </button>
          </div>
          <div>
            <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary btn-fw">Add NPC</button>
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


      {/* <!-- ADD Armor --> */}
      <AddNpc
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className='model-box'
      />

      {/* View Detail */}
      <NpcDetail
        onHide={() => {
          localStorage.removeItem('selectedItem');
          setModalView(false)
        }
        }
        show={modalView}
      />

      {/* Edit Detail */}
      <EditNpc
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
        title="Npc"
      />

    </div>

  )
}

export default NpcList