import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { TbAlertOctagon } from "react-icons/tb";

const MultiConfirmation = (props) => {
  const [_id, set_Id] = useState();
  const { title, delFun, onHide } = props;
  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="model-box text-center"
        // Transition={Transition}
      >
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
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

            <input className="bg-dark border border-secondary w-100 p-2 outline-0 rounded" />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-3">
          <button
            onClick={delFun}
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
};

export default MultiConfirmation;
