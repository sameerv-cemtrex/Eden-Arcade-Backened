import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "../../services/stats.service";

const category = "weaponsStatic";

const AddWeapon = (props) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    type: "",
    gunFireMode: "",
    screenShakeIntensity: "",
    screenShakeDuration: "",
    ammoType: "",
    fireSpread: "",
    damage: "",
    magazineSize: "",
    shootingRange: "",
    muzzleFlashIntensity: "",
    recoil: "",
    fireRate: "",
    reloadTime: "",
    bulletShotAudioClip: "",
    bulletHolePrefab: "",
    desc: "",
    exp: "",
    weight: "",
    water: "",
    fire: "",
    heat: "",
    air: "",
  });

  //:: formDataSaveHandler form
  function formDataSaveHandler(e) {
    e.preventDefault();

    if (
      !data.name ||
      !data.type ||
      !data.gunFireMode ||
      !data.screenShakeIntensity ||
      !data.screenShakeDuration ||
      !data.ammoType ||
      !data.fireSpread ||
      !data.damage ||
      !data.magazineSize ||
      !data.gunShotIntensity ||
      !data.shootingRange ||
      !data.muzzleFlashIntensity ||
      !data.recoil ||
      !data.fireRate ||
      !data.reloadTime ||
      !data.bulletShotAudioClip ||
      !data.bulletHolePrefab ||
      !data.exp ||
      !data.weight ||
      !data.desc ||
      !data.water ||
      !data.heat ||
      !data.fire ||
      !data.air
    ) {
      alert("Please fill out all fields");
      return;
    }

    addCategoryStat(category, data).then((res) => {
      props.onClose();
      alert("Form Submitted Successfully");
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="model-box"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ADD Weapon
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
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
                      value={data.name}
                      onChange={(e) => handle(e)}
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
                      value={data.type}
                      onChange={(e) => handle(e)}
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
                      value={data.gunFireMode}
                      onChange={(e) => handle(e)}
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
                      value={data.screenShakeIntensity}
                      onChange={(e) => handle(e)}
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
                      value={data.screenShakeDuration}
                      onChange={(e) => handle(e)}
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
                      value={data.ammoType}
                      onChange={(e) => handle(e)}
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
                      value={data.fireSpread}
                      onChange={(e) => handle(e)}
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
                      value={data.damage}
                      onChange={(e) => handle(e)}
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
                      value={data.magazineSize}
                      onChange={(e) => handle(e)}
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
                      value={data.gunShotIntensity}
                      onChange={(e) => handle(e)}
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
                      value={data.shootingRange}
                      onChange={(e) => handle(e)}
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
                      value={data.muzzleFlashIntensity}
                      onChange={(e) => handle(e)}
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
                      value={data.recoil}
                      onChange={(e) => handle(e)}
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
                      value={data.fireRate}
                      onChange={(e) => handle(e)}
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
                      value={data.reloadTime}
                      onChange={(e) => handle(e)}
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
                      value={data.bulletShotAudioClip}
                      onChange={(e) => handle(e)}
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
                      value={data.bulletHolePrefab}
                      onChange={(e) => handle(e)}
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
                      value={data.exp}
                      onChange={(e) => handle(e)}
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
                      value={data.weight}
                      onChange={(e) => handle(e)}
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
                      value={data.desc}
                      onChange={(e) => handle(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-2">
                <h5 className="mb-0">Resources</h5>
              </div>

              {/* resources */}
              <div className="row ">
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
                      value={data.water}
                      onChange={(e) => handle(e)}
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
                      value={data.fire}
                      onChange={(e) => handle(e)}
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
                      name="air"
                      required
                      value={data.air}
                      onChange={(e) => handle(e)}
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
                      value={data.heat}
                      onChange={(e) => handle(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="action-button d-flex justify-content-start pt-6 gap-2">
              <button
                onClick={props.onHide}
                className="btn btn-secondary btn-fw text-uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={formDataSaveHandler}
                className="btn btn-primary btn-fw text-uppercase"
              >
                add
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddWeapon;
