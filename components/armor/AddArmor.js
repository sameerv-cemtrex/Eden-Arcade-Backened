import Input from "components/common/formComponent/Input";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";
import { armorInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "armorStatic";

const initialState = {
  form: armorInitialData,
  errors: {},
};

const AddArmor = (props) => {
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
        className="model-box"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ADD Armor
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <div className="model-content">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Name"
                    name="name"
                    errors={errors.name ? errors.name[0] : null}
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

                {/* Weight */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="weight"
                    name="weight"
                    type="number"
                    errors={errors.weight ? errors.weight[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* shield */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="shield"
                    name="shield"
                    type="number"
                    errors={errors.shield ? errors.shield[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Experience */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="exp"
                    name="exp"
                    type="number"
                    errors={errors.exp ? errors.exp[0] : null}
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
              </div>

              <div className="mb-0 mt-2">
                <h5 className="mb-0">Resources</h5>
              </div>

              {/* resources */}
              <div className="row pt-3">
                <div className="col-sm-6 mb-3">
                  <Input
                    label="water"
                    type="number"
                    name="water"
                    errors={errors.water ? errors.water[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Fire */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="fire"
                    type="number"
                    name="fire"
                    errors={errors.fire ? errors.fire[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Air */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="air"
                    type="number"
                    name="air"
                    errors={errors.air ? errors.air[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Heat */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="heat"
                    type="number"
                    name="heat"
                    errors={errors.heat ? errors.heat[0] : null}
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
                className="btn btn-secondary btn-fw text-uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
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

export default AddArmor;
