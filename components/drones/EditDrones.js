import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { editDrone, getDronesById } from "services/drones.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validation = z.object({
  droneType: z.string(),
  gunType: z.string(),
  damage: z.number().nonnegative(),
  accuracy: z.number().nonnegative(),
  fireRate: z.number().nonnegative(),
  hitPoints: z.number().nonnegative(),
  movementSpeed: z.number().nonnegative(),
  turningSpeed: z.number().nonnegative(),
  shootingEffectiveRange: z.number().nonnegative(),
  shootingMaximumRange: z.number().nonnegative(),
  touchDamage: z.number().nonnegative(),
  magazineSize: z.number().nonnegative(),
  reloadTime: z.number().nonnegative(),
  patrolRangeMinimum: z.number().nonnegative(),
  patrolRangeMaximum: z.number().nonnegative(),
  patrolMovementSpeed: z.number().nonnegative(),
  auditoryRange: z.number().nonnegative(),
  visionRange: z.number().nonnegative(),
  nearestDroneEngagedDetectionRange: z.number().nonnegative(),
  respawning: z.boolean(),
  aimPoints: z.array(z.string()).nonempty(),
  noiseRange: z.number().nonnegative(),
  patrolClearance: z.number().nonnegative(),
  maximumClearance: z.number().nonnegative(),
});

function EditDrone(props) {
  const editDroneForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editDrone(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getDronesById(props.id).then((res) => editDroneForm.setValues(res.data));
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
          Edit Drone
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editDroneForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                {Object.keys(editDroneForm.values).map((item) => {
                  const excludes = [
                    "__v",
                    "_id",
                    "id",
                    "respawning",
                    "createdAt",
                    "updatedAt",
                    "itemId",
                  ];
                  const changeTypeKeys = ["droneType", "gunType", "aimPoints"];
                  if (!_.includes(excludes, item)) {
                    return (
                      <div className="col-md-4">
                        <Input
                          label={item
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            })}
                          name={item}
                          value={editDroneForm.values[item]}
                          type={
                            !_.includes(changeTypeKeys, item)
                              ? "number"
                              : "text"
                          }
                          errors={editDroneForm.errors[item]}
                          onChange={
                            item !== "aimPoints"
                              ? editDroneForm.handleChange
                              : (e) => {
                                  const points = e.target.value;
                                  const pointsArr = points
                                    .split(",")
                                    .map((t) => t.trim());
                                  editDroneForm.setFieldValue(
                                    "aimPoints",
                                    pointsArr
                                  );
                                }
                          }
                        />
                      </div>
                    );
                  }
                })}
                <div className="col-md-4">
                  <Form.Check reverse className="mt-4" type="switch">
                    <Form.Check.Input
                      isValid
                      name="respawning"
                      checked={editDroneForm.values.respawning}
                      onChange={editDroneForm.handleChange}
                      className="mt-2 me-2"
                    />
                    <Form.Check.Label className="text-lg me-2 text-gray-800">
                      Respawning
                    </Form.Check.Label>
                  </Form.Check>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={editDroneForm.handleSubmit}
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

export default EditDrone;
