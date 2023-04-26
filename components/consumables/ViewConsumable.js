import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getConsumablesById } from "services/consumables.service";

function ViewConsumable(props) {
  const viewConsumableForm = useFormik({});

  useEffect(() => {
    getConsumablesById(props.id).then((res) => {
      viewConsumableForm.setValues(res.data);
    });
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
            View Consumable
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            {viewConsumableForm.values ? (
              <div className="model-content py-2">
                <div className="row">
                  <div className="col-sm-6">
                    <Input
                      label="name"
                      onChange={viewConsumableForm.handleChange}
                      name="name"
                      className="border-0 bg-transparent"
                      value={viewConsumableForm.values.name}
                      errors={viewConsumableForm.errors.name}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      label="resource"
                      onChange={viewConsumableForm.handleChange}
                      name="resource"
                      className="border-0 bg-transparent"
                      value={viewConsumableForm.values.resource}
                      errors={viewConsumableForm.errors.name}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      label="quantity"
                      onChange={viewConsumableForm.handleChange}
                      type="number"
                      name="quantity"
                      className="border-0 bg-transparent"
                      value={viewConsumableForm.values.quantity}
                      errors={viewConsumableForm.errors.quantity}
                    />
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

export default ViewConsumable;
