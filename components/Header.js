import Link from "next/link";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import BootstrapModal from "./common/bootstrapModal/BootstrapModal";

const Header = (props) => {
  const [logoutConfirmation, setConfirmation] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-navbar topbar px-4 static-top justify-content-end">
        <div className="header-user ">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle user-dropd mr-0"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <CgProfile size={32} />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="">
                <Link className="dropdown-item" href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <span
                  className="dropdown-item"
                  onClick={() => setConfirmation(true)}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
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
