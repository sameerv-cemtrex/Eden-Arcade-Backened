import React from "react";
import { Modal } from "react-bootstrap";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const initialState = {
  form: {},
  errors: {},
};

function EditGun() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      const formData = {};
      Object.keys(form).map((item) => (formData[item] = form[item].value));

      // addCategoryStat(category, formData).then((res) => {
      //   props.onClose();
      //   alert("Form Submitted Successfully");
      // });
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
    <Modal {...props} size="lg" centered className="model-box">
      <Modal.Header>
        <Modal.Title>Edit Gun</Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body>
          <div className="model-content mx-3">
            <div className="row">
              <div className="col-md-6">
                <Input label="name" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="action-button d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light btn-fw text-uppercase"
              onClick={props.onHide}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-fw text-uppercase "
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditGun;
