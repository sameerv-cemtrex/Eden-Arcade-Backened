import Link from 'next/link';


const Sidebar = () => {
    return (
        <>
            <div className="navbar-nav sidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                     <span className='text-white text-decoration-none'>EDEN</span>
                </Link>
                <nav className='sidebar-nav'>
                  <ul className="nav">
                    <li  className="nav-item">
                      <Link className="nav-link" href="/">
                        <span className="menu-title"> Weapons</span>
                      </Link>
                    </li>

                    <li  className="nav-item">
                      <Link className="nav-link" href="/ammo">
                        <span className="menu-title">  Ammos </span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" href="/armor">
                        <span className="menu-title">  Armor </span>
                      </Link>
                    </li>

                    <li  className="nav-item">
                      <Link className="nav-link" href="/bag-pack">
                      
                        <span className="menu-title">  BagPack </span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" href="/npc">
                        <span className="menu-title">  NPCs </span>
                      </Link>
                    </li>

                    <li  className="nav-item">
                      <Link className="nav-link" href="/task">
                        
                        <span className="menu-title">  Task </span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" href="/user">
                        <span className="menu-title">  Users </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
            </div>
        </>
    )
}

export default Sidebar



