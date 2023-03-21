import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { getDronesById } from "services/drones.service";

function ViewDrones(props) {
  const viewDroneForm = useFormik({});

  useEffect(() => {
    getDronesById(props.id).then((res) => viewDroneForm.setValues(res.data));
  }, []);

  return (
    <div>
      <Modal {...props} size="lg" centered>
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            View Gun
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            {viewDroneForm.values ? (
              <div className="model-content py-2">
                <div className="row">
                  {Object.keys(viewDroneForm.values).map((item) => {
                    const excludes = [
                      "__v",
                      "_id",
                      "id",
                      "respawning",
                      "createdAt",
                      "updatedAt",
                      "itemId",
                    ];

                    if (!_.includes(excludes, item)) {
                      return (
                        <div className="col-md-6 ">
                          <Input
                            label={item
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                                return str.toUpperCase();
                              })}
                            name={item}
                            className="border-0 bg-transparent"
                            value={viewDroneForm.values[item]}
                            errors={viewDroneForm.errors[item]}
                            disabled
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
                        checked={viewDroneForm.values.respawning}
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
            <div className="action-button d-flex justify-content-start pt-6 gap-2">
              <button
                onClick={props.onHide}
                className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
              >
                ok
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ViewDrones;
