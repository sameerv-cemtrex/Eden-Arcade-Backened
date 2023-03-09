import AddGun from "components/guns/AddGun";
import EditGun from "components/guns/EditGun";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

function GunsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const customStyles = {
    title: {
      style: {},
    },
    rows: {
      style: {
        minHeight: "48px", // override the row height
      },
    },
    head: {
      style: {
        backgoundColor: "#505",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "16px",
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
      name: "Part",
      selector: (row) => row.part,
      sortable: true,
      width: "150px",
      reorder: true,
    },
    {
      id: 3,
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
      width: "200px",
      reorder: true,
    },
    {
      id: 4,
      name: "Texture",
      selector: (row) => row.texture,
    },
    {
      id: 5,
      name: "Accuracy Rating",
      selector: (row) => row.capacity,
    },
    {
      id: 6,
      name: "Damage Rating",
      selector: (row) => row.exp,
    },
    {
      id: 7,
      name: "Ergonomics Rating",
      selector: (row) => row.resources.water,
    },
    {
      id: 8,
      name: "Fire Rate Rating",
      selector: (row) => row.resources.fire,
    },
    {
      id: 9,
      name: "Firing Sound (Gunshot)",
      selector: (row) => row.resources.heat,
    },
    {
      id: 10,
      name: "Firing VFX (Muzzle Flash)",
      selector: (row) => row.resources.air,
    },
    {
      id: 11,
      name: "Length (cm)",
      selector: (row) => row.resources.air,
    },
    {
      id: 12,
      name: "Range Rating",
      selector: (row) => row.resources.air,
    },
    {
      id: 13,
      name: "Recoil Rating",
      selector: (row) => row.resources.air,
    },
    {
      id: 14,
      name: "Weight",
      selector: (row) => row.resources.air,
    },
    {
      id: 11,
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

  return (
    <div className="main-content">
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className="font-weight-bold mb-2">Guns</h2>
        </div>
        <div className="col-lg-6 d-flex justify-content-end mb-2 gap-2">
          <div>
            <button
              key="delete"
              disabled={true}
              className="btn btn-danger btn-fw "
              //   onClick={(e) => {
              // setMultipleConfirmation({ flag: true });
              //   }}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              type="button"
              className="btn btn-primary btn-fw"
            >
              Add Gun
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
                  columns={[
                    { id: 1, name: "Title", selector: (row) => row.name },
                    { id: 2, name: "part", selector: (row) => row.part },
                    { id: 3, name: "model", selector: (row) => row.model },
                  ]}
                  data={[
                    { part: "grip", name: "AK47", model: "assault rifle" },
                    { part: "stock", name: "SPAS-12", model: "shotgun" },
                    { part: "pad", name: "uzi", model: "sub-machine" },
                  ]}
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

      {showAddModal ? (
        <AddGun show={showAddModal} onHide={() => setShowAddModal(false)} />
      ) : null}

      {showEditModal ? (
        <EditGun show={showEditModal} onClose={() => setShowEditModal(false)} />
      ) : null}
    </div>
  );
}

export default GunsPage;
