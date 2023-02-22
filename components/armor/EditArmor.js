import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editCategoryStat, getCategoryStatById } from "services/stats.service";

const category = "armorStatic";

const EditArmor = (props) => {
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
            Edit Armor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {values ? (
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
                      value={values.type}
                      onChange={inputChangeHandler}
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
                      value={values.weight}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* shield */}
                <div className="col-sm-6 mb-3">
                  <div className="form-field position-relative">
                    <label
                      htmlFor="shield"
                      className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                    >
                      Shield
                    </label>
                    <input
                      type="number"
                      id="shield"
                      className="w-100"
                      name="shield"
                      required
                      value={values.shield}
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

              <div className="mb-0 mt-2">
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
                      name="air"
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
          ) : null}
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

export default EditArmor;
