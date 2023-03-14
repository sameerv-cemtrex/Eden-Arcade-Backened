import Link from "next/link";
import { useRouter } from "next/router";
import { GiPistolGun } from "react-icons/gi";

const Sidebar = () => {
  const router = useRouter();

  const checkRouteActive = (path) =>
    router.pathname === path ? "active" : null;

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
          {/* <div className="nav"> */}
          <div className="nav-item">
            <Link className={`nav-link ${checkRouteActive("/")}`} href="/">
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> Weapons</span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/ammo")}`}
              href="/ammo"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> Ammos </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/armor")}`}
              href="/armor"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> Armor </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/bag-pack")}`}
              href="/bag-pack"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> BagPack </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/npc")}`}
              href="/npc"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> NPCs </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/task")}`}
              href="/task"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> Task </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/user")}`}
              href="/user"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> Users </span>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/attachments")}`}
              href="/attachments"
            >
              <GiPistolGun color={"gray"} size={30} />
              <span className="menu-title"> Attachments </span>
            </Link>
          </div>
          {/* </div> */}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
