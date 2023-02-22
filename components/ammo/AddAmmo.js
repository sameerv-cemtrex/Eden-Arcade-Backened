import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";

const category = "ammosStatic";

const AddAmmo = (props) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    desc: "",
    type: "",
    weight: "",
    damage: "",
    exp: "",
    water: "",
    fire: "",
    heat: "",
    air: "",
  });

  function formDataSaveHandler(e) {
    e.preventDefault();

    if (
      !data.name ||
      !data.desc ||
      !data.type ||
      !data.weight ||
      !data.damage ||
      !data.exp ||
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
            ADD Ammos
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <div className="model-content">
              <div className="row">
                {/* Name */}
                <div className="col-sm-6 mb-3">
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

                {/* Description */}
                <div className="col-sm-6 mb-3">
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

                {/* Type */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="type"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Type
                    </label>
                    <input
                      type="number"
                      id="type"
                      className="w-100"
                      name="type"
                      required
                      value={data.type}
                      onChange={(e) => handle(e)}
                    />
                  </div>
                </div>

                {/* Weight */}
                <div className="col-sm-6 mb-3">
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

                {/* damage */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="shield"
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

                {/* Experience */}
                <div className="col-sm-6 mb-3">
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
              </div>
              <div className="mb-1 mt-2">
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

export default AddAmmo;
