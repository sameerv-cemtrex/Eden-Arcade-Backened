import Input from "components/common/formComponent/Input";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";
import { npcInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "npcStatic";

const initialState = {
  form: npcInitialData,
  errors: {},
};

const AddNpc = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

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
                <Input
                  label="name"
                  name="name"
                  errors={errors.name ? errors.name[0] : null}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="col-sm-6 mb-3">
                <Input
                  label="description"
                  name="desc"
                  errors={errors.desc ? errors.desc[0] : null}
                  onChange={handleChange}
                />
              </div>

              <div className="col-sm-6 mb-3">
                <Input
                  label="level"
                  name="level"
                  errors={errors.level ? errors.level[0] : null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Input
                  label="enemy"
                  name="enemy"
                  type="number"
                  errors={errors.enemy ? errors.enemy[0] : null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Input
                  label="health"
                  name="health"
                  type="number"
                  errors={errors.health ? errors.health[0] : null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Input
                  label="damage"
                  name="damage"
                  type="number"
                  errors={errors.damage ? errors.damage[0] : null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Input
                  label="Fire Rate"
                  name="fireRate"
                  type="number"
                  errors={errors.fireRate ? errors.fireRate[0] : null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Input
                  label="range"
                  name="range"
                  type="number"
                  errors={errors.range ? errors.range[0] : null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Input
                  label="movementSpeed"
                  name="movementSpeed"
                  errors={errors.movementSpeed ? errors.movementSpeed[0] : null}
                  type="number"
                  onChange={handleChange}
                />
              </div>

              {/* Experience */}
              <div className="col-sm-6 mb-3">
                <Input
                  label="experience"
                  name="exp"
                  errors={errors.exp ? errors.exp[0] : null}
                  type="number"
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
              onClick={handleSubmit}
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
