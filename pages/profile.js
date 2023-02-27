import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import React, { useState } from "react";
import { validateAll } from "utils/validateForm";

function ProfilePage() {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState();
  const someForm = useFormik({
    initialValues: {
      fname: { value: "", rules: ["min:3", "required"] },
      lname: { value: "", rules: ["min: 3", "required"] },
      email: { value: "", rules: ["email", "required"] },
    },
    validate: validateAll,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <div>
      <form onSubmit={someForm.handleSubmit}>
        <Input
          label="FirstName"
          name="fname"
          onChange={someForm.handleChange}
          errors={someForm.errors.fname}
        />
        <Input
          label="Last Name"
          name="lname"
          onChange={someForm.handleChange}
          errors={someForm.errors.lname}
        />
        <Input
          label="email"
          type="email"
          name="email"
          onChange={someForm.handleChange}
          errors={someForm.errors.email}
        />

        <button type="submit" className="btn  btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
