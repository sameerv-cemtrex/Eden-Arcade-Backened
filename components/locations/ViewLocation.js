import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { getLocationById } from "services/locations.service";

function ViewLocation(props) {
  const viewLocationForm = useFormik({});

  useEffect(() => {
    getLocationById(props.id).then((res) =>
      viewLocationForm.setValues(res.data)
    );
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
            View Location
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            {viewLocationForm.values ? (
              <div className="model-content py-2">
                <div className="row">
                  {Object.keys(viewLocationForm.values).map((item) => {
                    const excludes = [
                      "__v",
                      "_id",
                      "id",
                      "createdAt",
                      "updatedAt",
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
                            value={viewLocationForm.values[item]}
                            errors={viewLocationForm.errors[item]}
                            disabled
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

export default ViewLocation;
