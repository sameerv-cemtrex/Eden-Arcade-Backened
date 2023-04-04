import ConfirmationBox from "components/common/bootstrapModal/ConfirmationBox";
import Loader from "components/Loader.component";
import AddLocation from "components/locations/AddLocation";
import EditLocation from "components/locations/EditLocation";
import ViewLocation from "components/locations/ViewLocation";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  deleteLocation,
  deleteMultipleLocations,
  getAllLocations,
} from "services/locations.service";

import { customStyles } from "styles/components/table-custom-style";

function LocationsPage() {
  const [data, setData] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [rowId, setRowId] = useState(null);
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
      name: "Location Detection Radius",
      selector: (row) => row.locationDetectionRadius,
      sortable: true,
      width: "100px",
      reorder: true,
    },
    {
      id: 5,
      name: "Location Id",
      width: "150px",
      selector: (row) => row.locationId,
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

    deleteMultipleLocations(multipleData).then((res) => {
      setMultipleConfirmation({ ...multipleConfirmation, flag: false });
    });
  };

  const deleteClickHandler = (_id) => {
    deleteLocation(_id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllLocations().then((res) =>
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
                highlightOnHover
                striped
                title={
                  <div className="col-lg-6 mb-2 text-white text-uppercase">
                    <h2 className="font-weight-bold mb-2">Locations</h2>
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
                        Add Location
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
        <ViewLocation
          show={showViewModal}
          id={rowId}
          onHide={() => setShowViewModal(false)}
          onClose={() => setShowViewModal(false)}
        />
      ) : null}

      {showAddModal ? (
        <AddLocation
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        />
      ) : null}

      {showEditModal ? (
        <EditLocation
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
          title="Drone"
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
          title="Drone"
        />
      ) : null}
    </div>
  );
}

export default LocationsPage;
