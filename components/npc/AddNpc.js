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
      >
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            ADD NPC
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
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
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
          >
            add
          </button>
          <button
            onClick={props.onHide}
            className="bg-transparent border-0 text-white text-lg text-uppercase"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddNpc;
