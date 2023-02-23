import React, { useEffect, useState } from "react";
import Image from "next/image";
import search_img from "../../public/images/search.svg";
import { getUserDataById } from "services/stats.service";
import Loader from "components/Loader.component";

/*
 * NOTE : Edit button action is remaining
 *
 *
 */

const UserList = (props) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState("");
  const [isLoading, setLoading] = useState(false);

  const formView = (e) => {
    e.preventDefault();
    if (userId && userId.toString().length >= 6) {
      setLoading(true);
      getUserDataById(userId).then((res) => {
        setUserData(res.message);
        setLoading(false);
      });
    } else {
      alert("Please add valid User ID");
    }
  };

  const searchUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <h2 className=" font-weight-bold mb-2"> User Detail </h2>
        </div>
        <div className="col-lg-6 d-flex justify-content-end mb-2 gap-2"></div>
      </div>
      <div className="d-fle justify-content-center pt-3">
        <div className=" position-relative search w-50 m-auto">
          <div className="input-group-prepend">
            <button type="submit" className="" onClick={formView}>
              <Image src={search_img} alt="search" width="20" height="20" />
            </button>
          </div>
          <input
            type="search"
            placeholder="Search User ID..."
            className="form-control"
            onChange={searchUser}
            onSubmit={formView}
          />
          <div id="error d-flex mt-3 justify-content-center"></div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : userData ? (
        <div className="row user-list">
          <div className="col-12 card bg-white p-4 m-auto mt-4">
            <div className="row">
              {/* Name */}
              <div className="col-sm-4 mb-3">
                <div className="form-field position-relative bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Name
                  </label>

                  <p className="user-detail m-0 text-capitalize">
                    {userData.name}
                  </p>
                </div>
              </div>

              {/* Code */}
              <div className="col-sm-4 mb-3">
                <div className="form-field position-relative bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="code"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Code
                  </label>

                  <p className="user-detail m-0"> {userData.code}</p>
                </div>
              </div>

              {/* isOnline */}
              <div className="col-sm-4 mb-3">
                <div className="form-field position-relative bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="isOnline"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    IsOnline
                  </label>
                  <p className="user-detail m-0">{userData.is_online}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 mb-3">
                <h5 className="mb-0 mt-1">PlayerStat</h5>
              </div>

              {/* playerLevel */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="playerLevel"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    player Level
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.playerLevel}
                  </p>
                </div>
              </div>

              {/* strength */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="strength"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Strength
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.strength}
                  </p>
                </div>
              </div>

              {/* Endurance */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="endurance"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Endurance
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.endurance}
                  </p>
                </div>
              </div>

              {/* vitality */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="vitality"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Vitality
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.vitality}
                  </p>
                </div>
              </div>

              {/* intelligence */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="intelligence"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Intelligence
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.intelligence}
                  </p>
                </div>
              </div>

              {/* gunMastery */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="gunMastery"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Gun Mastery
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.gunMastery}
                  </p>
                </div>
              </div>

              {/* gunMarksmanship */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="gunMarksmanship"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Gun Marks Man Ship
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.gunMarksmanship}
                  </p>
                </div>
              </div>

              {/* gunHandling */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="gunHandling"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Gun Handling
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.gunHandling}
                  </p>
                </div>
              </div>

              {/* craftsmanship */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="craftsmanship"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Crafts Man Ship
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.craftsmanship}
                  </p>
                </div>
              </div>

              {/* knifeMastery */}
              <div className="col-sm-3 mb-3">
                <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                  <label
                    htmlFor="knifeMastery"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Knife Mastery
                  </label>
                  <p className="user-detail m-0">
                    {userData.playerStat.knifeMastery}
                  </p>
                </div>
              </div>
            </div>

            {userData.inventory.length > 0 ? (
              <div>
                <div className="mb-3">
                  <h5 className="mb-0 mt-1">Inventory</h5>
                </div>

                {userData.inventory.map((ele, index) => (
                  <div className="row" key={index}>
                    <div className="col-sm-3 mb-3">
                      <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                        <label
                          htmlFor="mainId"
                          className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                        >
                          main Id
                        </label>
                        <p className="user-detail m-0">{ele.mainId}</p>
                      </div>
                    </div>

                    {/* id */}
                    <div className="col-sm-3 mb-3">
                      <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                        <label
                          htmlFor="id"
                          className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                        >
                          id
                        </label>
                        <p className="user-detail m-0">{ele.id}</p>
                      </div>
                    </div>

                    {/* quantity */}
                    <div className="col-sm-3 mb-3">
                      <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                        <label
                          htmlFor="quantity"
                          className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                        >
                          quantity
                        </label>
                        <p className="user-detail m-0">{ele.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div>
              <div className="mb-3">
                <h5 className="mb-0 mt-1">Resources</h5>
              </div>

              {/* Water */}
              <div className="row">
                <div className="col-sm-3 mb-3">
                  <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                    <label
                      htmlFor="water"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Water
                    </label>

                    <p className="user-detail m-0">
                      {userData.resources.water}
                    </p>
                  </div>
                </div>

                {/* Fire */}
                <div className="col-sm-3 mb-3">
                  <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                    <label
                      htmlFor="fire"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Fire
                    </label>
                    <p className="user-detail m-0">{userData.resources.fire}</p>
                  </div>
                </div>

                {/* Air */}
                <div className="col-sm-3 mb-3">
                  <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                    <label
                      htmlFor="air"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Air
                    </label>

                    <p className="user-detail m-0">
                      {userData === "" || null ? "" : userData.resources.air}
                    </p>
                  </div>
                </div>

                {/* Heat */}
                <div className="col-sm-3 mb-3">
                  <div className="form-field position-relative mb-2 bg-light w-100 p-2 border rounded">
                    <label
                      htmlFor="heat"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Heat
                    </label>

                    <p className="user-detail m-0">
                      {userData === "" || null ? "" : userData.resources.heat}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 mb-2 d-flex justify-content-end">
              <button
                onClick={() => {}}
                className="btn btn-primary btn-fw btn-user"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
