import Link from "next/link";
import { useState } from "react";
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
        <BootstrapModal heading="Oops!" show={logoutConfirmation} size="sm">
          <div className="mb-3">
            <h4 className="text-center text-lg mb-3">
              Do you really want to logout?
            </h4>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setConfirmation(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Logout
              </button>
            </div>
          </div>
        </BootstrapModal>
      ) : null}
    </>
  );
};
export default Header;
