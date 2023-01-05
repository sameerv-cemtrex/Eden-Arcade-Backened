import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Link from 'next/link'
import AddBagPack from './AddBagPack';
import Search from '../common/Search';
import BagPackDetail from './BagPackDetail';
import EditBagPack from './EditBagPack';

const BagPack = (props) => {

  //:object Declaration 
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [editData, setEditData] = useState({});


  //:: Call Get Api
  useEffect(() => {
    fetch('https://eden-dev.cetxlabs.com:5000/adminPanel/getAllData/bagPackStatic', {
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
      name: "Description",
      selector: (row) => row.desc,
      sortable: true,
      width: "200px",
      reorder: true
    },
    {
      id: 4,
      name: "Type",
      selector: (row) => row.type
    },
    {
      id: 5,
      name: "Capacity",
      selector: (row) => row.capacity
    },
    {
      id: 6,
      name: "Experience",
      selector: (row) => row.exp
    },
    {
      id: 7,
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
            onClick={(e) => deleteClickHandler(e, row._id)}
          // onClick={(e) => {
          //   setConfirmation(true)
          // }
          // }
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

    fetch(`https://eden-dev.cetxlabs.com:5000/adminPanel/deleteData/${_id}/bagPackStatic`, {
      method: 'POST'
    }).then((res) => {
      setData(data.filter(data => data._id !== _id))
      res.json().then((resp) => {
        // console.warn(resp);
      })
    })
  };

  // :: Update Data
  function updatedDataNew(_id) {

    localStorage.setItem('editedItem', _id)
    setModalEdit(true)

    fetch(`https://eden-dev.cetxlabs.com:5000/adminPanel/getAllData/${_id}/bagPackStatic`, {
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

  return (
    <div>
      <div className="row">
        <div className='col-lg-6 mb-2'>
          <h2 className="font-weight-bold mb-2"> Bag Pack </h2>
        </div>
        <div className='col-lg-6 d-flex justify-content-end mb-2 gap-2'>
          {/* <div>
            <Search />
          </div> */}
          <div>
          <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary btn-fw">Add BagPack</button>
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
                  responsive
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- ADD Armor --> */}
      <AddBagPack
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className='model-box'
      />

      {/* View Detail */}
      <BagPackDetail
        onHide={() => {
          localStorage.removeItem('selectedItem');
          setModalView(false)
        }
        }
        show={modalView}
      />

      {/* Edit Detail */}
      <EditBagPack
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

    </div>
  )
}

export default BagPack
