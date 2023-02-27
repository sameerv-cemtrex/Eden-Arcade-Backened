import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  editCategoryStat,
  getCategoryStatById,
} from "../../services/stats.service";

const category = "weaponsStatic";

const EditWeapon = (props) => {
  const [values, setValues] = useState(null);

  //:: Call EDIT Get Api
  const formDataEditHandler = (e) => {
    e.preventDefault();

    editCategoryStat(category, props.id, values).then((res) => {
      if (res.status === 200) {
        alert("form updated successfully");
        props.onClose();
      }
    });
  };

  const inputChangeHandler = (e) => {
    const key = e.target.name;
    setValues({
      ...values,
      [key]: e.target.value,
    });
  };

  //:: Call Get Api
  useEffect(() => {
    getCategoryStatById(category, props.id).then((res) => setValues(res.data));
  }, [props.id]);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="model-box"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Weapons
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {values ? (
            <div className="model-content">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-100"
                      name="name"
                      required
                      value={values.name}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="type"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Type
                    </label>
                    <input
                      type="text"
                      id="type"
                      className="w-100"
                      name="type"
                      required
                      value={values.type}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="gunFireMode"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Gun Fire Mode
                    </label>
                    <input
                      type="text"
                      id="gunFireMode"
                      className="w-100"
                      name="gunFireMode"
                      required
                      value={values.gunFireMode}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="screenShakeIntensity"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Screen Shake Intensity
                    </label>
                    <input
                      type="number"
                      id="screenShakeIntensity"
                      className="w-100"
                      name="screenShakeIntensity"
                      required
                      value={values.screenShakeIntensity}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="screenShakeDuration"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Screen Shake Duration
                    </label>
                    <input
                      type="number"
                      id="screenShakeDuration"
                      className="w-100"
                      name="screenShakeDuration"
                      required
                      value={values.screenShakeDuration}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="ammoType"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Ammo Type
                    </label>
                    <input
                      type="number"
                      id="ammoType"
                      className="w-100"
                      name="ammoType"
                      required
                      value={values.ammoType}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="fireSpread"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Fire Spread
                    </label>
                    <input
                      type="number"
                      id="fireSpread"
                      className="w-100"
                      name="fireSpread"
                      required
                      value={values.fireSpread}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="damage"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Damage
                    </label>
                    <input
                      type="number"
                      id="damage"
                      className="w-100"
                      name="damage"
                      required
                      value={values.damage}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="magazineSize"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Magazine Size
                    </label>
                    <input
                      type="number"
                      id="magazineSize"
                      className="w-100"
                      name="magazineSize"
                      required
                      value={values.magazineSize}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="gunShotIntensity"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Gun Shot Intensity
                    </label>
                    <input
                      type="number"
                      id="gunShotIntensity"
                      className="w-100"
                      name="gunShotIntensity"
                      required
                      value={values.gunShotIntensity}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="shootingRange"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      shooting Range
                    </label>
                    <input
                      type="number"
                      id="shootingRange"
                      className="w-100"
                      name="shootingRange"
                      required
                      value={values.shootingRange}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="muzzleFlashIntensity"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Muzzle Flash Intensity
                    </label>
                    <input
                      type="number"
                      id="muzzleFlashIntensity"
                      className="w-100"
                      name="muzzleFlashIntensity"
                      required
                      value={values.muzzleFlashIntensity}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="recoil"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Recoil
                    </label>
                    <input
                      type="number"
                      id="recoil"
                      className="w-100"
                      name="recoil"
                      required
                      value={values.recoil}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="fireRate"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Fire Rate
                    </label>
                    <input
                      type="number"
                      id="fireRate"
                      className="w-100"
                      name="fireRate"
                      required
                      value={values.fireRate}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="reloadTime"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Reload Time
                    </label>
                    <input
                      type="number"
                      id="reloadTime"
                      className="w-100"
                      name="reloadTime"
                      required
                      value={values.reloadTime}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="bulletShotAudioClip"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Bullet Shot Audio Clip
                    </label>
                    <input
                      type="text"
                      id="bulletShotAudioClip"
                      className="w-100"
                      name="bulletShotAudioClip"
                      required
                      value={values.bulletShotAudioClip}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="bulletHolePrefab"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Bullet Hole Prefab
                    </label>
                    <input
                      type="text"
                      id="bulletHolePrefab"
                      className="w-100"
                      name="bulletHolePrefab"
                      required
                      value={values.bulletHolePrefab}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="exp"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Experience
                    </label>
                    <input
                      type="number"
                      id="exp"
                      className="w-100"
                      name="exp"
                      required
                      value={values.exp}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="weight"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Weight
                    </label>
                    <input
                      type="number"
                      id="weight"
                      className="w-100"
                      name="weight"
                      required
                      value={values.weight}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="desc"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="desc"
                      className="w-100"
                      name="desc"
                      required
                      value={values.desc}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-2">
                <h5 className="mb-0">Resources</h5>
              </div>

              {/* resources */}
              <div className="row pt-3">
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative mb-2">
                    <label
                      htmlFor="water"
                      className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                    >
                      Water
                    </label>
                    <input
                      type="number"
                      id="water"
                      className="w-100"
                      name="water"
                      required
                      value={values.resources.water}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* Fire */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative mb-2">
                    <label
                      htmlFor="fire"
                      className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                    >
                      Fire
                    </label>
                    <input
                      type="number"
                      id="fire"
                      className="w-100"
                      name="fire"
                      required
                      value={values.resources.fire}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* Air */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative mb-2">
                    <label
                      htmlFor="air"
                      className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                    >
                      Air
                    </label>
                    <input
                      type="number"
                      id="air"
                      className="w-100"
                      name="resources.air"
                      required
                      value={values.resources.air}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* Heat */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative mb-2">
                    <label
                      htmlFor="heat"
                      className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                    >
                      Heat
                    </label>
                    <input
                      type="number"
                      id="heat"
                      className="w-100"
                      name="heat"
                      required
                      value={values.resources.heat}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="action-button d-flex justify-content-start pt-6 gap-2">
            <button
              onClick={props.onHide}
              type="submit"
              className="btn btn-secondary btn-fw text-uppercase"
            >
              Cancel
            </button>
            <button
              onClick={formDataEditHandler}
              type="submit"
              className="btn btn-primary btn-fw text-uppercase"
            >
              Edit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditWeapon;
