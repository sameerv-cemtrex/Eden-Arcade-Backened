import React, { useEffect, useState } from "react";
import Image from "next/image";
import search_img from "../../public/images/search.svg";
import { editUserData, getUserDataById } from "services/stats.service";
import Loader from "components/Loader.component";
import Input from "components/common/formComponent/Input";

/*
 * NOTE : Edit button action is remaining
 *
 *
 */

const UserList = (props) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const formView = (e) => {
    e.preventDefault();
    if (userId && userId.toString().length >= 6) {
      setLoading(true);
      getUserDataById(userId).then((res) => {
        setUserData(res.data);
        setLoading(false);
      });
    } else {
      alert("Please add valid User ID");
    }
  };

  const searchUser = (e) => {
    setUserId(Number(e.target.value));
  };

  const handleDetailEdit = (e) => {
    e.preventDefault();

    editUserData(userId, data).then((res) => alert("update success"));
  };

  const handleDetailChange = (e) => {};

  return (
    <div className="user-container border border-secondary p-5">
      <div className="d-flex justify-content-center pt-3">
        <div className=" position-relative search w-50 m-auto">
          <button type="submit" onClick={formView}>
            <Image src={search_img} alt="search" width="20" height="20" />
          </button>
          <input
            type="search"
            placeholder="Search User by ID"
            className="form-control bg-dark text-white"
            onChange={searchUser}
            onSubmit={formView}
          />
          <div id="error d-flex mt-3 justify-content-center">
            {/* errors */}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : userData ? (
        <div className="row h-100">
          <form className="h-100">
            <div className="col-12 card-content model-content bg-transparent p-4 m-auto mt-4">
              <div className="row">
                {/* Name */}
                <div className="col-3 mb-3">
                  <Input
                    value={userData.name}
                    className={isEditing ? null : "border-0"}
                    label="Name"
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-3 mb-3">
                  <Input
                    value={userData.code}
                    className={isEditing ? null : "border-0"}
                    label="Code"
                    disabled={!isEditing}
                  />
                </div>

                {/* isOnline */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.is_online}
                    className={isEditing ? null : "border-0"}
                    label="IsOnline"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3">
                  <h4 className="mb-0 mt-1">PlayerStat</h4>
                </div>

                {/* playerLevel */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.playerLevel}
                    className={isEditing ? null : "border-0"}
                    label="player Level"
                    disabled={!isEditing}
                  />
                </div>

                {/* strength */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.strength}
                    className={isEditing ? null : "border-0"}
                    label="Strength"
                    disabled={!isEditing}
                  />
                </div>

                {/* Endurance */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.endurance}
                    className={isEditing ? null : "border-0"}
                    label="Endurance"
                    disabled={!isEditing}
                  />
                </div>

                {/* vitality */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.vitality}
                    className={isEditing ? null : "border-0"}
                    label="Vitality"
                    disabled={!isEditing}
                  />
                </div>

                {/* intelligence */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.intelligence}
                    className={isEditing ? null : "border-0"}
                    label="Intelligence"
                    disabled={!isEditing}
                  />
                </div>

                {/* gunMastery */}
                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.gunMastery}
                    className={isEditing ? null : "border-0"}
                    label="Gun Mastery"
                    disabled={!isEditing}
                  />
                </div>

                {/* gunMarksmanship */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.gunMarksmanship}
                    className={isEditing ? null : "border-0"}
                    label="Gun Marks Man Ship"
                    disabled={!isEditing}
                  />
                </div>

                {/* gunHandling */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.gunHandling}
                    name="gunhandling"
                    label="Gun Handling"
                    className={isEditing ? null : "border-0"}
                    disabled={!isEditing}
                  />
                </div>

                {/* craftsmanship */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.craftsmanship}
                    label="Crafts Man Ship"
                    className={isEditing ? null : "border-0"}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.knifeMastery}
                    label="Knife Masterys"
                    className={isEditing ? null : "border-0"}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {userData.inventory.length > 0 ? (
                <div>
                  <div className="mb-3">
                    <h4 className="mb-0 mt-1">Inventory</h4>
                  </div>

                  {userData.inventory.map((ele, index) => (
                    <div className="row" key={index}>
                      <div className="col-3 mb-3">
                        <Input
                          value={ele.mainId}
                          label="main Id"
                          className={isEditing ? null : "border-0"}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="col-3 mb-3">
                        <Input
                          value={ele.itemId}
                          label="item id"
                          className={isEditing ? null : "border-0"}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="col-3 mb-3">
                        <Input
                          value={ele.quantity}
                          label="quantity"
                          className={isEditing ? null : "border-0"}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div>
                <div className="mb-3">
                  <h4 className="mb-0 mt-1">Resources</h4>
                </div>

                <div className="row">
                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.water}
                      label="water"
                      className={isEditing ? null : "border-0"}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.fire}
                      label="fire"
                      className={isEditing ? null : "border-0"}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.air}
                      label="air"
                      className={isEditing ? null : "border-0"}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.heat}
                      label="heat"
                      className={isEditing ? null : "border-0"}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-2 d-flex justify-content-end">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="bg-transparent border-0 text-uppercase text-white text-lg me-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="bg-transparent border-0 fw-bold text-uppercase text-white text-lg me-3"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="bg-transparent border-0 text-uppercase text-white text-lg me-3"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
