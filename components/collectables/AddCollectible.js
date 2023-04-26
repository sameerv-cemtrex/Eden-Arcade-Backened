import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import SelectDropdown from "components/common/formComponent/SelectDropdown";

import { addCollectableItem } from "services/collectables.service";

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

const rewardOptions = [
  {
    label: "Player progression",
    value: "playerProgression",
  },
  { label: "Craftsmanship", value: "craftsmanship" },
  { label: "Intelligence ", value: "intelligence" },
];

const AddCollectible = (props) => {
  const addCollectibleForm = useFormik({
    initialValues: {
      name: "",
      resource: "",
      quantity: 0,
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addCollectableItem(data).then((res) => {
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
            Add Collectible
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    label="name"
                    onChange={addCollectibleForm.handleChange}
                    name="name"
                    errors={addCollectibleForm.errors.name}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="Resource"
                    onChange={addCollectibleForm.handleChange}
                    name="resource"
                    errors={addCollectibleForm.errors.resource}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="quantity"
                    onChange={addCollectibleForm.handleChange}
                    type="number"
                    name="quantity"
                    value={addCollectibleForm.values.quantity}
                    errors={addCollectibleForm.errors.quantity}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addCollectibleForm.handleSubmit}
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

export default AddCollectible;
