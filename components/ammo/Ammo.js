import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import ConfirmationBox from '../common/bootstrapModal/ConfirmationBox';
import Search from '../common/Search';
import AddAmmo from './AddAmmo';
import AmmoDetail from './AmmoDetail';
import EditAmmo from './EditAmmo';
import config from '../services';

const Ammo = (props) => {

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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/deleteAllData/ammosStatic`, {
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
    fetch(`${config.getAllData}/adminPanel/getAllData/ammosStatic`, {
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
      width: "150px",
      reorder: true
    },
    {
      id: 3,
      name: "Description",
      selector: (row) => row.desc,
      width: "200px",
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Type",
      selector: (row) => row.type
    },
    {
      id: 5,
      name: "Weight",
      selector: (row) => row.weight
    },
    {
      id: 6,
      name: "Damage",
      selector: (row) => row.damage
    },
    {
      id: 7,
      name: "Experience",
      selector: (row) => row.exp
    },
    {
      id: 8,
      name: "Actions",
      width: "200px",
      button: true,
      cell: (row) => (
        <>
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

  //:Delete Record
  const deleteClickHandler = (e, _id) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/deleteData/${_id}/ammosStatic`, {
      method: 'POST',
      body: JSON.stringify(),
    }).then((res) => {
      setData(data.filter(data => data._id !== _id))
      res.json().then((resp) => {
        setConfirmation({ ...confirmation, flag: false })
      })
    })

  };

  // :: Update Data
  function updatedDataNew(_id) {

    localStorage.setItem('editedItem', _id)
    setModalEdit(true)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getAllData/${_id}/ammosStatic/`, {
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
          <h2 className="font-weight-bold mb-2"> Ammo </h2>
        </div>
        <div className='col-lg-6 d-flex justify-content-end mb-2 gap-1'>
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
            <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary btn-fw">Add Ammo</button>
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

      {/* <!-- ADD ammo --> */}
      <AddAmmo
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        show={modalShow}
        className='model-box'
      />

      {/* View Ammo Detail */}
      <AmmoDetail
        onHide={() => {
          localStorage.removeItem('selectedItem');
          setModalView(false)
        }
        }
        show={modalView}
      />

      {/* Edit Detail */}
      <EditAmmo
        onHide={() => {
          localStorage.removeItem('editedItem');
          setModalEdit(false)
        }
        }
        onClose={() => setModalEdit(false)}
        editData={editData}
        show={modalEdit}
      />


      {/* Confirmation Delete */}
      <ConfirmationBox
        onHide={() => setConfirmation({ ...confirmation, flag: false })}
        show={confirmation.flag}
        onClose={() => setConfirmation(false)}
        delFun={(e) => deleteClickHandler(e, confirmation.id)}
        title="Ammos"
      />

    </div>
  )
}

export default Ammo
