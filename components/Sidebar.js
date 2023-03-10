import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <div className="navbar-nav sidebar">
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <span className="text-white text-decoration-none">EDEN</span>
        </Link>
        <nav className="sidebar-nav">
          <ul className="nav">
            <li
              className={
                router.pathname == "/" ? "active nav-item " : " nav-item"
              }
            >
              <Link className="nav-link" href="/">
                <span className="menu-title"> Weapons</span>
              </Link>
            </li>

            <li
              className={
                router.pathname == "/ammo" ? "active nav-item " : " nav-item"
              }
            >
              <Link className="nav-link" href="/ammo">
                <span className="menu-title"> Ammos </span>
              </Link>
            </li>

            <li
              className={
                router.pathname == "/armor" ? "active nav-item " : " nav-item"
              }
            >
              <Link className="nav-link" href="/armor">
                <span className="menu-title"> Armor </span>
              </Link>
            </li>

            <li
              className={
                router.pathname == "/bag-pack"
                  ? "active nav-item "
                  : " nav-item"
              }
            >
              <Link className="nav-link" href="/bag-pack">
                <span className="menu-title"> BagPack </span>
              </Link>
            </li>

            <li
              className={
                router.pathname == "/npc" ? "active nav-item " : " nav-item"
              }
            >
              <Link className="nav-link" href="/npc">
                <span className="menu-title"> NPCs </span>
              </Link>
            </li>

            <li
              className={
                router.pathname == "/task" ? "active nav-item " : " nav-item"
              }
            >
              <Link className="nav-link" href="/task">
                <span className="menu-title"> Task </span>
              </Link>
            </li>

            <li
              className={
                router.pathname == "/user" ? "active nav-item " : " nav-item"
              }
            >
              <Link className="nav-link" href="/user">
                <span className="menu-title"> Users </span>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/attachments"
                  ? "active nav-item "
                  : " nav-item"
              }
            >
              <Link className="nav-link" href="/attachments">
                <span className="menu-title"> Attachments </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
