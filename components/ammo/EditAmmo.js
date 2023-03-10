import Loader from "components/Loader.component";
import React, { useEffect, useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getCategoryStatById } from "services/stats.service";
import { editCategoryStat } from "services/stats.service";
import { ammoInitialData } from "utils/initialFormData";
import { validateAll } from "utils/validateForm";
import reducer, { actionType } from "utils/reducer";
import _ from "lodash";
import Input from "components/common/formComponent/Input";

const category = "ammosStatic";
const initialState = {
  form: ammoInitialData,
  errors: {},
};

const EditAmmo = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;
  const [isLoading, setLoading] = useState(false);

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

      // set form values from api
      Object.keys(form).map((item) => (form[item].value = res.data[item]));

      // set parameters below which are under resources parameter
      form["water"].value = _.toNumber(res.data.resources.water);
      form["air"].value = _.toNumber(res.data.resources.air);
      form["heat"].value = _.toNumber(res.data.resources.heat);
      form["fire"].value = _.toNumber(res.data.resources.fire);

      dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
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
            Edit Ammos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoading ? (
            <div className="model-content">
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

                {/* Type */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="type"
                    name="type"
                    value={form.type.value}
                    errors={errors.type ? errors.type[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Weight */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="weight"
                    name="weight"
                    value={form.weight.value}
                    errors={errors.weight ? errors.weight[0] : null}
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
                    name="water"
                    value={form.water.value}
                    errors={errors.water ? errors.water[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Fire */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="fire"
                    name="fire"
                    value={form.fire.value}
                    errors={errors.fire ? errors.fire[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Air */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="air"
                    name="air"
                    value={form.air.value}
                    errors={errors.air ? errors.air[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Heat */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="heat"
                    name="heat"
                    value={form.heat.value}
                    errors={errors.heat ? errors.heat[0] : null}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="action-button d-flex justify-content-start pt-6 gap-2">
            <button
              onClick={props.onHide}
              type="submit"
              className="btn btn-secondary btn-fw text-text-capitalize"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary btn-fw text-text-capitalize"
            >
              Edit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditAmmo;
