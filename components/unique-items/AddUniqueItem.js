import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import SelectDropdown from "components/common/formComponent/SelectDropdown";

import { addUniqueItem } from "services/unique-items.service";

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

const AddUniqueItem = (props) => {
  const addUniqueItemForm = useFormik({
    initialValues: {
      name: "",
      resource: "",
      quantity: 0,
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addUniqueItem(data).then((res) => {
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
            Add Unique Item
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    label="name"
                    onChange={addUniqueItemForm.handleChange}
                    name="name"
                    errors={addUniqueItemForm.errors.name}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="Resource"
                    onChange={addUniqueItemForm.handleChange}
                    name="resource"
                    errors={addUniqueItemForm.errors.resource}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="quantity"
                    onChange={addUniqueItemForm.handleChange}
                    type="number"
                    name="quantity"
                    value={addUniqueItemForm.values.quantity}
                    errors={addUniqueItemForm.errors.quantity}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addUniqueItemForm.handleSubmit}
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

export default AddUniqueItem;
