import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import BootstrapModal from "./common/bootstrapModal/BootstrapModal";

const Header = (props) => {
  const [logoutConfirmation, setConfirmation] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand p-4 static-top justify-content-between align-items-center">
        <div className="">
          <p className="mb-0 fs-5 font-weight-bold">Welcome back!</p>
          <p className="mb-0">Last login: Mar 06, 2023, 09:13:24</p>
        </div>
        <div className="dropdown d-flex align-items-center pr-4">
          <div className="d-flex flex-column text-end ">
            <span className="text-lg">Albert Norby</span>
            <span>Admin</span>
          </div>
          <a
            className="dropdown-toggle btn-hover text-gray-800 text-lg px-3 mx-3 rounded-pill dropdown-toggle-split "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <Link className="dropdown-item" href="/profile">
                Profile
              </Link>
            </li>
            <li
              className="dropdown-item cursor"
              role="button"
              onClick={() => setConfirmation(true)}
            >
              Logout
            </li>
          </ul>
          <CgProfile size={40} />
        </div>
        {/* </div> */}
      </nav>

      {logoutConfirmation ? (
        <Modal
          show={logoutConfirmation}
          onHide={() => setConfirmation(false)}
          centered
        >
          <Modal.Header
            closeButton
            className="bg-black border justify-content-center border-secondary border-bottom-0"
          >
            <Modal.Title className="text-center fs-3 text-white ">
              Oops!!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-black border border-secondary border-top-0 border-bottom-0 p-4">
            <h4 className="text-center text-lg mb-3">
              Do you really want to logout?
            </h4>
          </Modal.Body>
          <Modal.Footer className="bg-black justify-content-around border border-secondary border-top-0">
            <button
              type="button"
              className="bg-transparent border-0 text-white fw-bold text-uppercase text-lg"
            >
              Logout
            </button>
            <button
              type="button"
              className="bg-transparent border-0 text-white text-uppercase text-lg"
              onClick={() => setConfirmation(false)}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};
export default Header;
