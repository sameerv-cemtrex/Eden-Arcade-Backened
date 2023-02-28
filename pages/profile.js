import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import React, { useReducer, useState } from "react";
import { validateAll } from "utils/validateForm";

const actionType = {
  SET_FORM_VALUE: "SET_FORM_VALUE",
  SET_ERRORS: "SET_ERRORS",
};

const initialState = {
  form: {
    fname: {
      value: "",
      rules: ["required", "min:3"],
    },
    lname: {
      value: "",
      rules: ["required", "min:3"],
    },
    email: {
      value: "",
      rules: ["required", "email"],
    },
  },
  errors: {},
};

/**
 *
 * @param {Object} state
 * @param {String} action
 * @returns updated state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_FORM_VALUE:
      return {
        ...state,
        form: action.payload,
      };
    case actionType.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

function ProfilePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  //Handle change event of a email and password
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

  //Handling login submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      let formData = {
        fname: form.fname.value,
        lname: form.lname.value,
        email: form.email.value,
      };
    }
    dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="FirstName"
          name="fname"
          value={form.fname.value}
          onChange={handleChange}
          errors={errors.fname ? errors.fname[0] : null}
        />
        <Input
          label="Last Name"
          name="lname"
          value={form.lname.value}
          onChange={handleChange}
          errors={errors.lname ? errors.lname[0] : null}
        />
        <Input
          label="email"
          type="email"
          name="email"
          value={form.email.value}
          onChange={handleChange}
          errors={errors.email ? errors.email[0] : null}
        />

        <button type="submit" className="btn  btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
