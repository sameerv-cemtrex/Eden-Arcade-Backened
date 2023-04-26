import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SelectDropdown from "components/common/formComponent/SelectDropdown";

import { editUniqueItem, getUniqueItemsById } from "pages/unique-items.service";

const validation = z.object({
  name: z.string(),
  resource: z.string(),
  quantity: z.number().nonnegative(),
});
const resourceOptions = [
  { label: "Metal", value: "metal" },
  { label: "Rare Metal", value: "rareMetal" },
  { label: "Water", value: "water" },
  { label: "Energy", value: "energy" },
  { label: "Time", value: "time" },
];

function EditUniqueItem(props) {
  const editUniqueItemForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editUniqueItem(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getUniqueItemsById(props.id).then((res) => {
      editUniqueItemForm.setValues(res.data);
    });
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
          Edit Unique Item
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editUniqueItemForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    label="name"
                    onChange={editUniqueItemForm.handleChange}
                    name="name"
                    value={editUniqueItemForm.values.name}
                    errors={editUniqueItemForm.errors.name}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="resource"
                    onChange={editUniqueItemForm.handleChange}
                    name="resource"
                    value={editUniqueItemForm.values.resource}
                    errors={editUniqueItemForm.errors.resource}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="quantity"
                    onChange={editUniqueItemForm.handleChange}
                    type="number"
                    name="quantity"
                    value={editUniqueItemForm.values.quantity}
                    errors={editUniqueItemForm.errors.quantity}
                  />
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
            onClick={editUniqueItemForm.handleSubmit}
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

export default EditUniqueItem;
