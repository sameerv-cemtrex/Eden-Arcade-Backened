import Modal from "react-bootstrap/Modal";
const BootstrapModal = (props) => {
  const { show, className, heading } = props;
  return (
    <Modal {...props} show={show} className={`${className}`}>
      <Modal.Header closeButton>
        <h2 className="text-center w-100 mt-3">{heading}</h2>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};
export default BootstrapModal;
