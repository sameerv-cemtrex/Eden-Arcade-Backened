import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import { addLocation } from "services/locations.service";

const validation = z.object({
  name: z.string(),
  locationDetectionRadius: z.number().nonnegative(),
  locationId: z.string(),
});

const AddLocation = (props) => {
  const addLocationForm = useFormik({
    initialValues: {
      name: "",
      locationDetectionRadius: 0,
      locationId: "",
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addLocation(data).then((res) => {
        props.onClose();
      });
    },
  });

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
            Add Location
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                {Object.keys(addLocationForm.values).map((item) => (
                  <div className="col-sm-6">
                    <Input
                      label={item}
                      onChange={addLocationForm.handleChange}
                      name={item}
                      type={
                        item === "locationDetectionRadius" ? "number" : "text"
                      }
                      errors={addLocationForm.errors[item]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addLocationForm.handleSubmit}
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

export default AddLocation;
