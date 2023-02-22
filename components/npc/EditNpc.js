import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editCategoryStat, getCategoryStatById } from "services/stats.service";

const category = "npcStatic";

const EditNpc = (props) => {
  const [values, setValues] = useState(null);

  //:: Call EDIT Get Api
  const formDataEditHandler = (e) => {
    e.preventDefault();
    editCategoryStat(category, props.id, values).then((res) => {
      if (res.status === 200) {
        props.onClose();
        alert("Form Updated Successfully");
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

  useEffect(() => {
    getCategoryStatById(category, props.id).then((res) =>
      setValues(res.message)
    );
  }, [props.id]);

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
            Edit NPCs
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="model-content">
            {values ? (
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
                      value={values.name}
                      onChange={inputChangeHandler}
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
                      value={values.desc}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* Level */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="level"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Level
                    </label>
                    <input
                      type="number"
                      id="level"
                      className="w-100"
                      name="level"
                      required
                      value={values.level}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* Enemy */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="enemy"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Enemy
                    </label>
                    <input
                      type="number"
                      id="enemy"
                      className="w-100"
                      name="enemy"
                      required
                      value={values.enemy}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* health */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="health"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Health
                    </label>
                    <input
                      type="number"
                      id="health"
                      className="w-100"
                      name="health"
                      required
                      value={values.health}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* damage */}
                <div className="col-sm-6 mb-3">
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

                {/* fireRate */}
                <div className="col-sm-6 mb-3">
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

                {/* range */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="range"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Range
                    </label>
                    <input
                      type="number"
                      id="type"
                      className="w-100"
                      name="range"
                      required
                      value={values.range}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* movementSpeed */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="movementSpeed"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Movement Speed
                    </label>
                    <input
                      type="number"
                      id="movementSpeed"
                      className="w-100"
                      name="movementSpeed"
                      required
                      value={values.movementSpeed}
                      onChange={inputChangeHandler}
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
                      value={values.exp}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
              </div>
            ) : null}
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
              onClick={formDataEditHandler}
              type="submit"
              className="btn btn-primary btn-fw text-uppercase"
            >
              Edit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditNpc;
