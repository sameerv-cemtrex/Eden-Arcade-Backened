import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import React, { useEffect, useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editCategoryStat, getCategoryStatById } from "services/stats.service";
import { taskInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "taskStatic";

const initialState = { form: taskInitialData, errors: {} };

const EditTask = (props) => {
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
      >
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
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

                {/* Type */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="type"
                    name="type"
                    value={form.type.value}
                    type="number"
                    errors={errors.type ? errors.type[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* giver */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="giver"
                    name="giver"
                    value={form.giver.value}
                    type="number"
                    errors={errors.giver ? errors.giver[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* goal */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="goal"
                    name="goal"
                    value={form.goal.value}
                    errors={errors.goal ? errors.goal[0] : null}
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                {/* Reward */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="reward"
                    name="reward"
                    value={form.reward.value}
                    errors={errors.reward ? errors.reward[0] : null}
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
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
          >
            Edit
          </button>
          <button
            onClick={props.onHide}
            className="bg-transparent border-0 text-white text-lg text-uppercase"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTask;
