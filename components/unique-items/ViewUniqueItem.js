import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import { getUniqueItemsById } from "services/unique-items.service";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function ViewUniqueItem(props) {
  const viewUniqueItemForm = useFormik({});

  useEffect(() => {
    getUniqueItemsById(props.id).then((res) => {
      viewUniqueItemForm.setValues(res.data);
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
            View Unique Item
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            {viewUniqueItemForm.values ? (
              <div className="model-content py-2">
                <div className="row">
                  <div className="col-sm-6">
                    <Input
                      label="name"
                      onChange={viewUniqueItemForm.handleChange}
                      name="name"
                      className="border-0 bg-transparent"
                      value={viewUniqueItemForm.values.name}
                      errors={viewUniqueItemForm.errors.name}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      label="resource"
                      onChange={viewUniqueItemForm.handleChange}
                      name="resource"
                      className="border-0 bg-transparent"
                      value={viewUniqueItemForm.values.resource}
                      errors={viewUniqueItemForm.errors.name}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      label="quantity"
                      onChange={viewUniqueItemForm.handleChange}
                      type="number"
                      name="quantity"
                      className="border-0 bg-transparent"
                      value={viewUniqueItemForm.values.quantity}
                      errors={viewUniqueItemForm.errors.quantity}
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

export default ViewUniqueItem;
