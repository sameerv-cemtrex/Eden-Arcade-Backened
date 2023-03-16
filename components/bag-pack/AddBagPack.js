import Input from "components/common/formComponent/Input";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";
import { bagpackInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "bagPackStatic";

const initialState = {
  form: bagpackInitialData,
  errors: {},
};

const AddBagPack = (props) => {
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
            ADD BagPack
          </Modal.Title>
        </Modal.Header>

        <form>
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

                {/* Type */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="type"
                    name="type"
                    type="number"
                    errors={errors.type ? errors.type[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* capacity */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="capacity"
                    name="capacity"
                    type="number"
                    errors={errors.capacity ? errors.capacity[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Experience */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="experience"
                    name="exp"
                    type="number"
                    errors={errors.exp ? errors.exp[0] : null}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 mt-2">
                <h5 className="mb-0">Resources</h5>
              </div>

              {/* resources */}
              <div className="row pt-3">
                <div className="col-sm-6 mb-3">
                  <Input
                    label="water"
                    name="water"
                    type="number"
                    errors={errors.water ? errors.water[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Fire */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="fire"
                    name="fire"
                    type="number"
                    errors={errors.fire ? errors.fire[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Air */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="air"
                    name="air"
                    type="number"
                    errors={errors.air ? errors.air[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Heat */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="heat"
                    name="heat"
                    type="number"
                    errors={errors.heat ? errors.heat[0] : null}
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
        </form>
      </Modal>
    </div>
  );
};

export default AddBagPack;
