import Input from "components/common/formComponent/Input";
import _ from "lodash";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";
import { taskInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "taskStatic";

const initialState = {
  form: taskInitialData,
  errors: {},
};

const AddTask = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  //:: formDataSaveHandler form
  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      const formData = {};
      Object.keys(form).map((item) => (formData[item] = form[item].value));

      addCategoryStat(category, formData).then((res) => {
        props.onClose();
        alert("Form Submitted Successfully");
      });
    }
    dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (value !== undefined) {
      form[name].value = value;

      //:: Delete error of individual field
      if (name in errors) {
        delete errors[name];
      }

      dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
      dispatch({ type: actionType.SET_ERRORS, payload: errors });
    }
  };

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
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="model-content">
              <div className="row">
                {/* Name */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Name"
                    errors={errors.name ? errors.name[0] : null}
                    name="name"
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Desc"
                    errors={errors.desc ? errors.desc[0] : null}
                    name="desc"
                    onChange={handleChange}
                  />
                </div>

                {/* Type */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Type"
                    type="number"
                    errors={errors.type ? errors.type[0] : null}
                    name="type"
                    onChange={handleChange}
                  />
                </div>

                {/* giver */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Giver"
                    type="number"
                    errors={errors.giver ? errors.giver[0] : null}
                    name="giver"
                    onChange={handleChange}
                  />
                </div>

                {/* Goal */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Goal"
                    type="number"
                    errors={errors.goal ? errors.goal[0] : null}
                    name="goal"
                    onChange={handleChange}
                  />
                </div>

                {/* Reward */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Reward"
                    type="number"
                    errors={errors.reward ? errors.reward[0] : null}
                    name="reward"
                    onChange={handleChange}
                  />
                </div>

                {/* Experience */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Exp"
                    type="number"
                    errors={errors.exp ? errors.exp[0] : null}
                    name="exp"
                    onChange={handleChange}
                  />
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
                type="submit"
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

export default AddTask;
