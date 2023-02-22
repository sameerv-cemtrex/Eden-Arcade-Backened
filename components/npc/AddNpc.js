import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";

const category = "npcStatic";

const AddNpc = (props) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    desc: "",
    type: "",
    weight: "",
    shield: "",
    exp: "",
  });

  //:: formDataSaveHandler form
  function formDataSaveHandler(e) {
    e.preventDefault();

    if (
      !data.name ||
      !data.desc ||
      !data.level ||
      !data.enemy ||
      !data.health ||
      !data.damage ||
      !data.fireRate ||
      !data.range ||
      !data.movementSpeed ||
      !data.exp
    ) {
      alert("Please fill out all fields");
      return;
    }

    addCategoryStat(category, data).then((res) => {
      if (res.status === 200) {
        props.onClose();
        alert("Form Submitted Successfully");
      }
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

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
          <Modal.Title id="contained-modal-title-vcenter">ADD NPC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="model-content">
            <div className="row">
              {/* Name */}
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="name"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
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

              {/* Description */}
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="desc"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
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

              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="level"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                  >
                    Level
                  </label>
                  <input
                    type="number"
                    id="level"
                    className="w-100"
                    name="level"
                    required
                    value={data.level}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="enemy"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                  >
                    Enemy
                  </label>
                  <input
                    type="number"
                    id="enemy"
                    className="w-100"
                    name="enemy"
                    required
                    value={data.enemy}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="health"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                  >
                    Health
                  </label>
                  <input
                    type="number"
                    id="health"
                    className="w-100"
                    name="health"
                    required
                    value={data.health}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="damage"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
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
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="fireRate"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
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
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="range"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                  >
                    Range
                  </label>
                  <input
                    type="number"
                    id="range"
                    className="w-100"
                    name="range"
                    required
                    value={data.range}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="movementSpeed"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                  >
                    Movement Speed
                  </label>
                  <input
                    type="number"
                    id="movementSpeed"
                    className="w-100"
                    name="movementSpeed"
                    required
                    value={data.movementSpeed}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="exp"
                    className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
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
            </div>
          </div>
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
              onClick={formDataSaveHandler}
              type="submit"
              className="btn btn-primary btn-fw text-uppercase"
            >
              add
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddNpc;
