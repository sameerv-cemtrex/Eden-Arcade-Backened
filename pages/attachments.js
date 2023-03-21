import AddAttachment from "components/attachments/AddAttachment";
import EditAttachment from "components/attachments/EditAttachment";
import ViewAttachment from "components/attachments/ViewAttachment";
import ConfirmationBox from "components/common/bootstrapModal/ConfirmationBox";
import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  deleteAttachment,
  deleteMultipleAttachments,
  getAllAttachments,
} from "services/attachments.service";
import { customStyles } from "styles/components/table-custom-style";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import _ from "lodash";
import ExpandedComponent from "components/common/ExpandedComponent";

function AttachmentsPage() {
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
    // {
    //   id: 6,
    //   name: "Damage Rating",
    //   selector: (row) => row.damageRating,
    // },
    // {
    //   id: 7,
    //   name: "Ergonomics Rating",
    //   selector: (row) => row.ergonomicsRating,
    // },
    // {
    //   id: 8,
    //   name: "Fire Rate Rating",
    //   selector: (row) => row.fireRateRating,
    // },
    // {
    //   id: 9,
    //   name: "Firing Sound (Gunshot)",
    //   selector: (row) => row.firingSoundGunshot,
    // },
    // {
    //   id: 10,
    //   name: "Firing VFX (Muzzle Flash)",
    //   selector: (row) => row.firingVFXMuzzleFlash,
    // },
    // {
    //   id: 11,
    //   name: "Length (cm)",
    //   selector: (row) => row.lengthInCm,
    // },
    // {
    //   id: 12,
    //   name: "Range Rating",
    //   selector: (row) => row.rangeRating,
    // },
    // {
    //   id: 13,
    //   name: "Recoil Rating",
    //   selector: (row) => row.recoilRating,
    // },
    // {
    //   id: 14,
    //   name: "Weight",
    //   selector: (row) => row.weight,
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
      id: 15,
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

  const deleteClickHandler = (_id) => {
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
                expandableRowsComponent={({ data }) =>
                  ExpandedComponent({ data }, [
                    "part",
                    "model",
                    "texture",
                    "__v",
                    "_id",
                    "id",
                    "updatedAt",
                    "createdAt",
                  ])
                }
                expandableRowsHideExpander
                highlightOnHover
                striped
                title={
                  <div className="col-lg-6 mb-2 text-white text-uppercase">
                    <h2 className="font-weight-bold mb-2">Attachments</h2>
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
                        Add Attachments
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
          delFun={() => deleteClickHandler(confirmation.id)}
          title="Task"
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
          title="Task"
        />
      ) : null}
    </div>
  );
}

export default AttachmentsPage;
