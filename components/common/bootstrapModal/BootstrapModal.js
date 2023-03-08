import Modal from "react-bootstrap/Modal";
const BootstrapModal = (props) => {
  const { footer, header } = props;
  return <Modal {...props}>{props.children}</Modal>;
};
export default BootstrapModal;
