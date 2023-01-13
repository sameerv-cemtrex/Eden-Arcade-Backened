
import Link from "next/link";

const Header = (props) => {
    const handleClick = () => {
        document.body.classList.toggle('sidebar-toggled');
    };

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-navbar topbar px-4 static-top justify-content-between">
                <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3" onClick={handleClick}>
                    {/* <img src={menuicon} alt="menuicon" width={20} /> */}
                </button>
                <div className='header-user'>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle user-dropd mr-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Options
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li className="">
                                <Link className="dropdown-item" href="/profile/Profile">Profile</Link></li>
                            <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logout_login">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="modal" tabIndex="-1" id="logout_login" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ohh No!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to logout?.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Header;
