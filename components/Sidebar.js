import Link from "next/link";
import { useRouter } from "next/router";
import { BiTask } from "react-icons/bi";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import {
  GiAk47,
  GiAmmoBox,
  GiBackup,
  GiCampingTent,
  GiChestArmor,
  GiFloatingCrystal,
  GiGearHammer,
  GiReceiveMoney,
  GiSaberAndPistol,
  GiSchoolBag,
} from "react-icons/gi";
import { GrMap } from "react-icons/gr";
import _ from "lodash";

const Sidebar = () => {
  const router = useRouter();
  const gearSubMenu = ["/drones", "/gun-human-traits"];

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
          <div className="nav-item mt-5">
            <Link className={`nav-link ${checkRouteActive("/")}`} href="/">
              <GiSaberAndPistol
                color={checkRouteActive("/") ? "white" : "gray"}
                size={35}
              />
              <span className="menu-title"> Weapons</span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/ammo")}`}
              href="/ammo"
            >
              <GiAmmoBox
                color={checkRouteActive("/ammo") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Ammos </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/armor")}`}
              href="/armor"
            >
              <GiChestArmor
                color={checkRouteActive("/armor") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Armor </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/bag-pack")}`}
              href="/bag-pack"
            >
              <GiSchoolBag
                color={checkRouteActive("/bag-pack") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> BagPack </span>
            </Link>
          </div>

          {/* <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/npc")}`}
              href="/npc"
            >
              <GiBackup
                color={checkRouteActive("/npc") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> NPCs </span>
            </Link>
          </div> */}

          <div className="nav-item dropdown dropdown-center">
            <div
              className={`nav-link ${
                _.includes(["/task", "/task-givers"], router.pathname)
                  ? "active"
                  : null
              }`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BiTask
                color={checkRouteActive("/task") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Task </span>
            </div>
            <ul className="dropdown-menu  dropdown-menu-dark bg-dark text-white border-0 w-80">
              <li className="dropdown-item text-center ">
                <Link
                  href="/task"
                  className="dropdown-item text-white text-lg fw-bold"
                >
                  Tasks
                </Link>
              </li>
              <li className="dropdown-item text-center">
                <Link
                  href="/task-givers"
                  className="dropdown-item text-white text-lg text-wrap fw-bold"
                >
                  Task Givers
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/items")}`}
              href="/items"
            >
              <GiFloatingCrystal
                color={checkRouteActive("/items") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Items </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/locations")}`}
              href="/locations"
            >
              <FaMapMarkerAlt
                color={checkRouteActive("/locations") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Locations </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/dome-sales")}`}
              href="/dome-sales"
            >
              <GiReceiveMoney
                color={checkRouteActive("/dome-sales") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Dome Sales </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/nft-prefab")}`}
              href="/nft-prefab"
            >
              <GiCampingTent
                color={checkRouteActive("/nft-prefab") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> NFT Prefabs </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/user")}`}
              href="/user"
            >
              <FaUser
                color={checkRouteActive("/user") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Users </span>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/attachments")}`}
              href="/attachments"
            >
              <IoIosAttach
                color={checkRouteActive("/attachments") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Attachments </span>
            </Link>
          </div>

          <div className="nav-item">
            <Link
              className={`nav-link ${checkRouteActive("/guns")}`}
              href="/guns"
            >
              <GiAk47
                color={checkRouteActive("/guns") ? "white" : "gray"}
                size={30}
              />
              <span className="menu-title"> Guns </span>
            </Link>
          </div>

          <div className="nav-item dropdown dropdown-center">
            <div
              className={`nav-link ${
                _.includes(gearSubMenu, router.pathname) ? "active" : null
              }`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <GiGearHammer
                color={
                  _.includes(gearSubMenu, router.pathname) ? "white" : "gray"
                }
                size={30}
              />
              <span className="menu-title"> Settings </span>
            </div>
            <ul className="dropdown-menu  dropdown-menu-dark bg-dark text-white border-0 w-80">
              <li className="dropdown-item text-center ">
                <Link
                  href="/drones"
                  className="dropdown-item text-white text-lg fw-bold"
                >
                  Drones
                </Link>
              </li>
              <li className="dropdown-item text-center">
                <Link
                  href="/gun-human-traits"
                  className="dropdown-item text-white text-lg text-wrap fw-bold"
                >
                  Gun details - Effect on Humans
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
