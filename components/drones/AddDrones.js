import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { addDroneAPI } from "services/drones.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const initialState = {
  name: "",
  droneType: "",
  gunType: "",
  damage: 0,
  accuracy: 0,
  fireRate: 0,
  hitPoints: 0,
  movementSpeed: 0,
  turningSpeed: 0,
  shootingEffectiveRange: 0,
  shootingMaximumRange: 0,
  touchDamage: 0,
  magazineSize: 0,
  reloadTime: 0,
  patrolRangeMinimum: 0,
  patrolRangeMaximum: 0,
  patrolMovementSpeed: 0,
  auditoryRange: 0,
  visionRange: 0,
  nearestDroneEngagedDetectionRange: 0,
  respawning: false,
  aimPoints: [],
  noiseRange: 0,
  patrolClearance: 0,
  maximumClearance: 0,
};

const validation = z.object({
  name: z.string(),
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

function AddDrone(props) {
  const addDroneForm = useFormik({
    initialValues: initialState,
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addDroneAPI(data).then((res) => {
        props.onClose();
      });
    },
  });

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
          Add Drone
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          <div className="model-content mx-3">
            <div className="row">
              {Object.keys(initialState).map((item) => {
                const excludes = ["droneType", "gunType", "aimPoints", "name"];
                if (item !== "respawning") {
                  return (
                    <div className="col-md-4">
                      <Input
                        label={item
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, function (str) {
                            return str.toUpperCase();
                          })}
                        name={item}
                        type={!_.includes(excludes, item) ? "number" : "text"}
                        errors={addDroneForm.errors[item]}
                        onChange={
                          item !== "aimPoints"
                            ? addDroneForm.handleChange
                            : (e) => {
                                const points = e.target.value;
                                const pointsArr = points
                                  .split(",")
                                  .map((t) => t.trim());
                                addDroneForm.setFieldValue(
                                  "aimPoints",
                                  pointsArr
                                );
                              }
                        }
                      />
                    </div>
                  );
                }
              })}{" "}
              <div className="col-md-4">
                <Form.Check reverse className="mt-4" type="switch">
                  <Form.Check.Input
                    isValid
                    name="respawning"
                    onChange={addDroneForm.handleChange}
                    className="mt-2 me-2"
                  />
                  <Form.Check.Label className="text-lg me-2 text-gray-800">
                    Respawning
                  </Form.Check.Label>
                </Form.Check>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={addDroneForm.handleSubmit}
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

export default AddDrone;
