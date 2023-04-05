import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getCategoryStatById } from "../../services/stats.service";

const category = "weaponsStatic";
const WeaponDetail = (props) => {
  const [data, setData] = useState(null);

  //:: Call Get Api
  useEffect(() => {
    getCategoryStatById(category, props.id).then((res) => setData(res.data));
  }, [props.show]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            Weapon Detail
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content p-0">
              {data ? (
                <>
                  <div className="d-grid">
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Id</label>
                        <p className="m-0 text-white">{data.id}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Name</label>
                        <p className="m-0 text-white">{data.name}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Type</label>
                        <p className="m-0 text-white"> {data.type}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Gun Fire Mode</label>
                        <p className="m-0 text-white">{data.gunFireMode}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          screen Shake Duration
                        </label>
                        <p className="m-0 text-white">
                          {" "}
                          {data.screenShakeDuration}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Ammo Type</label>
                        <p className="m-0 text-white"> {data.ammoType}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Fire Spread</label>
                        <p className="m-0 text-white">{data.fireSpread}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Damage</label>
                        <p className="m-0 text-white">{data.damage}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Magazine Size</label>
                        <p className="m-0 text-white">{data.magazineSize}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Gun Shot Intensity
                        </label>
                        <p className="m-0 text-white">
                          {" "}
                          {data.gunShotIntensity}
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Shooting Range</label>
                        <p className="m-0 text-white">{data.shootingRange}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Muzzle Flash Intensity
                        </label>
                        <p className="m-0 text-white">
                          {" "}
                          {data.muzzleFlashIntensity}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Recoil</label>
                        <p className="m-0 text-white"> {data.recoil}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Fire Rate</label>
                        <p className="m-0 text-white">{data.fireRate}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Screen Shake Duration
                        </label>
                        <p className="m-0 text-white">
                          {data.screenShakeDuration}
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          bullet Shot Audio Clip
                        </label>
                        <p className="m-0 text-white">
                          {data.bulletShotAudioClip}
                        </p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Bullet Hole Prefab
                        </label>
                        <p className="m-0 text-white">
                          {" "}
                          {data.bulletHolePrefab}
                        </p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Exp</label>
                        <p className="m-0 text-white"> {data.exp} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Weight</label>
                        <p className="m-0 text-white"> {data.weight}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Desc</label>
                        <p className="m-0 text-white">{data.desc}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Loader />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <div className="action-button d-flex justify-content-start pt-6 gap-2">
              <button
                onClick={props.onHide}
                className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
              >
                ok
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default WeaponDetail;
