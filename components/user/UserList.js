import React, { useEffect, useState } from "react";
import Image from "next/image";
import search_img from "../../public/images/search.svg";
import { editUserData, getUserDataById } from "services/stats.service";
import Loader from "components/Loader.component";
import EditUser from "./EditUser";
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
          <form>
            <div className="col-12 card bg-white p-4 m-auto mt-4">
              <div className="row">
                {/* Name */}
                <div className="col-3 mb-3">
                  <Input
                    value={userData.name}
                    label="Name"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-3 mb-3">
                  <Input
                    value={userData.code}
                    label="Code"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* isOnline */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.is_online}
                    label="IsOnline"
                    className={isEditing && "border border-dark"}
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
                    label="player Level"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* strength */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.strength}
                    label="Strength"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* Endurance */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.endurance}
                    label="Endurance"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* vitality */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.vitality}
                    label="Vitality"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* intelligence */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.intelligence}
                    label="Intelligence"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* gunMastery */}
                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.gunMastery}
                    label="Gun Mastery"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* gunMarksmanship */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.gunMarksmanship}
                    label="Gun Marks Man Ship"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* gunHandling */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.gunHandling}
                    name="gunhandling"
                    label="Gun Handling"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                {/* craftsmanship */}

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.craftsmanship}
                    label="Crafts Man Ship"
                    className={isEditing && "border border-dark"}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-3 mb-3">
                  <Input
                    value={userData.playerStat.knifeMastery}
                    label="Knife Masterys"
                    className={isEditing && "border border-dark"}
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
                          className={isEditing && "border border-dark"}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="col-3 mb-3">
                        <Input
                          value={ele.itemId}
                          label="item id"
                          className={isEditing && "border border-dark"}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="col-3 mb-3">
                        <Input
                          value={ele.quantity}
                          label="quantity"
                          className={isEditing && "border border-dark"}
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
                      className={isEditing && "border border-dark"}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.fire}
                      label="fire"
                      className={isEditing && "border border-dark"}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.air}
                      label="air"
                      className={isEditing && "border border-dark"}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-3 mb-3">
                    <Input
                      value={userData.resources.heat}
                      label="heat"
                      className={isEditing && "border border-dark"}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 mb-2 d-flex justify-content-end">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn btn-light btn-fw btn-user"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="btn btn-primary btn-fw btn-user"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="btn btn-primary btn-fw btn-user"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
