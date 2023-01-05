import Modal from "react-bootstrap/Modal";
const BootstrapModal = (props) => {
  const { show, className, heading } = props;
  return (
    <Modal
       size="md"
      show={show}
      className={`${className}`}
      centered
    >
      <Modal.Header>
      <h2 className="mb-0 py-1">{heading}</h2>
      </Modal.Header>
   
      <Modal.Body>
        {props.children}
        </Modal.Body>
    </Modal>
  );
};
export default BootstrapModal;