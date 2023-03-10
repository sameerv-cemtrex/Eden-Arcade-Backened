import AddAttachment from "components/attachments/AddAttachment";
import EditAttachment from "components/attachments/EditAttachment";
import ViewAttachment from "components/attachments/ViewAttachment";
import ConfirmationBox from "components/common/bootstrapModal/ConfirmationBox";
import MultiConfirmation from "components/common/bootstrapModal/MultiConfirmation";
import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  deleteAttachment,
  deleteMultipleAttachments,
  getAllAttachments,
} from "services/attachments.service";

function AttachmentsPage() {
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
      selector: (row) => row.accuracyRating,
    },
    {
      id: 6,
      name: "Damage Rating",
      selector: (row) => row.damageRating,
    },
    {
      id: 7,
      name: "Ergonomics Rating",
      selector: (row) => row.ergonomicsRating,
    },
    {
      id: 8,
      name: "Fire Rate Rating",
      selector: (row) => row.fireRateRating,
    },
    {
      id: 9,
      name: "Firing Sound (Gunshot)",
      selector: (row) => row.firingSoundGunshot,
    },
    {
      id: 10,
      name: "Firing VFX (Muzzle Flash)",
      selector: (row) => row.firingVFXMuzzleFlash,
    },
    {
      id: 11,
      name: "Length (cm)",
      selector: (row) => row.lengthInCm,
    },
    {
      id: 12,
      name: "Range Rating",
      selector: (row) => row.rangeRating,
    },
    {
      id: 13,
      name: "Recoil Rating",
      selector: (row) => row.recoilRating,
    },
    {
      id: 14,
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      id: 15,
      name: "Actions",
      width: "200px",
      button: true,
      cell: (row) => (
        <>
          <button
            className="btn btn-outline btn-xs border"
            onClick={() => {
              setRowId(row._id);
              setShowViewModal(true);
            }}
          >
            View
          </button>
          <button
            className="btn btn-outline btn-xs border"
            onClick={() => {
              setRowId(row._id);
              setShowEditModal(true);
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

  // multiple row select
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

    deleteMultipleAttachments(multipleData).then((res) => {
      setMultipleConfirmation({ ...multipleConfirmation, flag: false });
    });
  };

  const deleteClickHandler = (e, _id) => {
    e.preventDefault();
    deleteAttachment(_id).then((res) =>
      setConfirmation({ ...confirmation, flag: false })
    );
  };

  useEffect(() => {
    getAllAttachments().then((res) =>
      res.code === 200 ? setData(res.data) : null
    );
  }, [showAddModal, showEditModal, multipleConfirmation, confirmation]);

  return (
    <div className="main-content">
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className="font-weight-bold mb-2">Attachments</h2>
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
              onClick={() => setShowAddModal(true)}
              type="button"
              className="btn btn-primary btn-fw"
            >
              Add Attachment
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
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
                  />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal ? (
        <AddAttachment
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        />
      ) : null}

      {showEditModal ? (
        <EditAttachment
          show={showEditModal}
          id={rowId}
          onClose={() => setShowEditModal(false)}
          onHide={() => setShowEditModal(false)}
        />
      ) : null}

      {showViewModal ? (
        <ViewAttachment
          show={showViewModal}
          id={rowId}
          onClose={() => setShowViewModal(false)}
          onHide={() => setShowViewModal(false)}
        />
      ) : null}

      {confirmation.flag ? (
        <ConfirmationBox
          onHide={() => setConfirmation({ ...confirmation, flag: false })}
          show={confirmation.flag}
          onClose={() => setConfirmation(false)}
          delFun={(e) => deleteClickHandler(e, confirmation.id)}
          title="Task"
        />
      ) : null}

      {multipleConfirmation.flag ? (
        <MultiConfirmation
          onHide={() =>
            setMultipleConfirmation({ ...multipleConfirmation, flag: false })
          }
          show={multipleConfirmation.flag}
          onClose={() => setMultipleConfirmation(false)}
          delFun={(e) => deleteSelectedRow(e, multipleConfirmation.id)}
          title="Task"
        />
      ) : null}
    </div>
  );
}

export default AttachmentsPage;
