import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editCategoryStat, getCategoryStatById } from "services/stats.service";

const category = "taskStatic";

const EditTask = (props) => {
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
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: { ...values[name], value: value },
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
            Edit Task
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
                      value={values.giver}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>

                {/* goal */}
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
                      value={values.goal}
                      onChange={inputChangeHandler}
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
                      value={values.reward}
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
            ) : (
              <Loader />
            )}
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

export default EditTask;
