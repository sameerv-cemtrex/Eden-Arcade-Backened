import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editCategoryStat, getCategoryStatById } from "services/stats.service";
import { npcInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "npcStatic";

const initialState = {
  form: npcInitialData,
  errors: {},
};

const EditNpc = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      const formData = {};
      Object.keys(form).map((item) => (formData[item] = form[item].value));

      editCategoryStat(category, props.id, formData).then((res) => {
        props.onClose();
        alert("Form Updated Successfully");
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

  useEffect(() => {
    setLoading(true);
    getCategoryStatById(category, props.id).then((res) => {
      setLoading(false);
      Object.keys(form).map((item) => (form[item].value = res.data[item]));
    });
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
            {!isLoading ? (
              <div className="row">
                {/* Name */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="name"
                    name="name"
                    value={form.name.value}
                    errors={errors.name ? errors.name[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="description"
                    name="desc"
                    value={form.desc.value}
                    errors={errors.desc ? errors.desc[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Level */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="level"
                    name="level"
                    value={form.level.value}
                    errors={errors.level ? errors.level[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* Enemy */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="enemy"
                    name="enemy"
                    value={form.enemy.value}
                    errors={errors.enemy ? errors.enemy[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* health */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="health"
                    name="health"
                    value={form.health.value}
                    errors={errors.health ? errors.health[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* damage */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="damage"
                    name="damage"
                    value={form.damage.value}
                    errors={errors.damage ? errors.damage[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* fireRate */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Fire Rate"
                    name="fireRate"
                    value={form.fireRate.value}
                    type="number"
                    errors={errors.fireRate ? errors.fireRate[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* range */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="range"
                    name="range"
                    value={form.range.value}
                    errors={errors.range ? errors.range[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* movementSpeed */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Movement Speed"
                    name="movementSpeed"
                    value={form.movementSpeed.value}
                    errors={
                      errors.movementSpeed ? errors.movementSpeed[0] : null
                    }
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* Experience */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="experience"
                    name="exp"
                    value={form.exp.value}
                    errors={errors.exp ? errors.exp[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
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
              onClick={handleSubmit}
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
