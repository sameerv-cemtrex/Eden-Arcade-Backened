import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";

const category = "taskStatic";

const AddTask = (props) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    desc: "",
    type: "",
    giver: "",
    goal: "",
    reward: "",
    exp: "",
  });

  //:: formDataSaveHandler form
  function formDataSaveHandler(e) {
    e.preventDefault();

    if (
      !data.name ||
      !data.desc ||
      !data.type ||
      !data.giver ||
      !data.goal ||
      !data.reward ||
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
          <Modal.Title id="contained-modal-title-vcenter">ADD Task</Modal.Title>
        </Modal.Header>
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
                    name="first_name"
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

              {/* giver */}
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="giver"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Giver
                  </label>
                  <input
                    type="number"
                    id="giver"
                    className="w-100"
                    name="giver"
                    required
                    value={data.giver}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>

              {/* Goal */}
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="goal"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Goal
                  </label>
                  <input
                    type="number"
                    id="goal"
                    className="w-100"
                    name="goal"
                    required
                    value={data.goal}
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>

              {/* Reward */}
              <div className="col-sm-6 mb-3">
                <div className="form-field position-relative">
                  <label
                    htmlFor="reward"
                    className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                  >
                    Reward
                  </label>
                  <input
                    type="number"
                    id="reward"
                    className="w-100"
                    name="reward"
                    required
                    value={data.reward}
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
    </div>
  );
};

export default AddTask;
