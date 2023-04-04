import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { editLocation, getLocationById } from "services/locations.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validation = z.object({
  name: z.string(),
  locationDetectionRadius: z.number().nonnegative(),
  locationId: z.string(),
});

function EditLocation(props) {
  const editLocationForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editLocation(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getLocationById(props.id).then((res) =>
      editLocationForm.setValues(res.data)
    );
  }, []);

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
          Edit Location
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editLocationForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                {Object.keys(editLocationForm.values).map((item) => {
                  const excludes = [
                    "__v",
                    "_id",
                    "id",
                    "createdAt",
                    "updatedAt",
                  ];
                  if (!_.includes(excludes, item)) {
                    return (
                      <div className="col-md-6">
                        <Input
                          label={item
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            })}
                          name={item}
                          value={editLocationForm.values[item]}
                          type={
                            item === "locationDetectionRadius"
                              ? "number"
                              : "text"
                          }
                          errors={editLocationForm.errors[item]}
                          onChange={editLocationForm.handleChange}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={editLocationForm.handleSubmit}
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
      </form>
    </Modal>
  );
}

export default EditLocation;
