import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  getAllCategoryStats,
  getCategoryStatById,
} from "../../services/stats.service";

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
                        <p className="m-0">{data.id}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Name</label>
                        <p className="m-0">{data.name}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Type</label>
                        <p className="m-0"> {data.type}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Gun Fire Mode</label>
                        <p className="m-0">{data.gunFireMode}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          screen Shake Duration
                        </label>
                        <p className="m-0"> {data.screenShakeDuration} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Ammo Type</label>
                        <p className="m-0"> {data.ammoType}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Fire Spread</label>
                        <p className="m-0">{data.fireSpread}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Damage</label>
                        <p className="m-0">{data.damage}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Magazine Size</label>
                        <p className="m-0">{data.magazineSize}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Gun Shot Intensity
                        </label>
                        <p className="m-0"> {data.gunShotIntensity}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Shooting Range</label>
                        <p className="m-0">{data.shootingRange}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Muzzle Flash Intensity
                        </label>
                        <p className="m-0"> {data.muzzleFlashIntensity} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Recoil</label>
                        <p className="m-0"> {data.recoil}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Fire Rate</label>
                        <p className="m-0">{data.fireRate}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Screen Shake Duration
                        </label>
                        <p className="m-0">{data.screenShakeDuration}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          bullet Shot Audio Clip
                        </label>
                        <p className="m-0">{data.bulletShotAudioClip}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">
                          Bullet Hole Prefab
                        </label>
                        <p className="m-0"> {data.bulletHolePrefab}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Exp</label>
                        <p className="m-0"> {data.exp} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Weight</label>
                        <p className="m-0"> {data.weight}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Desc</label>
                        <p className="m-0">{data.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 mt-3 w-100 full-col">
                    <h5 className="mb-0">Resources</h5>
                  </div>

                  <div className="d-grid">
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Water</label>
                        <p className="m-0">{data.resources?.water}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Heat</label>
                        <p className="m-0">{data.resources?.heat}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Air</label>
                        <p className="m-0">{data.resources?.air}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Fire</label>
                        <p className="m-0">{data.resources?.fire}</p>
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
