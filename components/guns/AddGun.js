import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import React, { useReducer } from "react";
import { Modal } from "react-bootstrap";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const initialState = {
  form: {},
  errors: {},
};

function AddGun(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, error } = state;

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
    <Modal {...props} size="lg" centered>
      <Modal.Header
        closeButton
        className="bg-black border-top border-start border-end rounded-0 border-secondary"
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-uppercase text-white"
        >
          Add Gun
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          <div className="model-content mx-3">
            <div className="row">
              <div className="col-md-6">
                <Input label="name" disabled />
              </div>
              <div className="col-md-6">
                <SelectDropdown
                  label="Gun"
                  options={[
                    { label: "AK-47", value: "ak47" },
                    { label: "SPAS-12", value: "spas12" },
                    { label: "Glock-78", value: "glock" },
                  ]}
                  isMulti
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
  );
}

export default AddGun;
