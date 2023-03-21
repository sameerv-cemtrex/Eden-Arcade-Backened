import { useFormik } from "formik";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { TbAlertOctagon } from "react-icons/tb";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

function ConfirmationBox(props) {
  const deleteForm = useFormik({
    initialValues: {
      deleteString: "",
    },
    validationSchema: toFormikValidationSchema(
      z
        .object({
          deleteString: z.string(),
        })
        .refine((data) => data.deleteString === "DELETE", {
          message: "Word don't match",
          path: ["deleteString"],
        })
    ),
    onSubmit: (data) => {
      delFun();
      props.onClose();
    },
  });
  const { title, delFun, onHide } = props;

  return (
    <div>
      <Modal
        {...props}
        // size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal position-absolute top-50 start-50 translate-middle"
        // Transition={Transition}
      >
        <Modal.Header
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
          closeButton={true}
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase"
          >
            confirm deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black  p-0 border-start border-end  border-secondary">
          <div className="bg-gray-900 d-flex align-items-center py-2 px-4">
            <TbAlertOctagon size={20} color="#737373" />{" "}
            <span className="ms-2">Warning: This action cannot be undone!</span>
          </div>
          <div className="px-4 pt-3 pb-4">
            <p className="mb-0">Do you really want to delete {title}? </p>
            <p className="">Type DELETE to Confirm</p>

            <input
              onChange={deleteForm.handleChange}
              name="deleteString"
              className="bg-dark border border-secondary w-100 p-2 outline-0 rounded text-white"
            />
            <p className="mb-0 text-danger">{deleteForm.errors.deleteString}</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-3">
          <button
            onClick={deleteForm.handleSubmit}
            type="submit"
            className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
          >
            delete
          </button>
          <button
            onClick={onHide}
            type="submit"
            className="bg-transparent border-0 text-white text-lg text-uppercase"
          >
            cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmationBox;
