import Input from "components/common/formComponent/Input";
import React from "react";

function ProfilePage() {
  return (
    <div className="main-content d-flex">
      <div className="col-md-3 d-flex flex-column">
        <img
          src="https://source.unsplash.com/300x300?portrait"
          alt="profile"
          className="rounded"
        />

        <button className="bg-transparent border-0 text-lg text-uppercase text-white mt-3 w-50 align-self-center">
          Edit
        </button>
      </div>

      <div className="col mx-3 p-3 h-75 rounded-4 border shadow-sm border-1">
        <div className="col-5 m-2">
          <Input
            label="Name"
            value="Admin"
            disabled
            className="p-2 fs-5 w-100"
          />
        </div>
        <div className="col-5 m-2">
          <Input
            label="email"
            value="admin@cxr.com"
            disabled
            className="p-2 fs-5 w-100"
          />
        </div>

        <p className="mt-5 fs-4">Change Password</p>
        <div className="d-flex">
          <div className="col-5 m-2">
            <Input
              label="password"
              value="admin@cxr.com"
              type="password"
              disabled
              className="p-2 fs-5 w-100 "
            />
          </div>
          <div className="col-5 m-2">
            <Input
              label="confirm password"
              value="admin@cxr.com"
              type="password"
              disabled
              className="p-2 fs-5 w-100 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
