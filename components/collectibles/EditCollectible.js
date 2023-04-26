import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SelectDropdown from "components/common/formComponent/SelectDropdown";

import {
  editCollectableItem,
  getCollectablesById,
} from "services/collectables.service";

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

function EditCollectible(props) {
  const editCollectibleForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editCollectableItem(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getCollectablesById(props.id).then((res) => {
      editCollectibleForm.setValues(res.data);
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
          Edit Collectible
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editCollectibleForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    label="name"
                    onChange={editCollectibleForm.handleChange}
                    name="name"
                    value={editCollectibleForm.values.name}
                    errors={editCollectibleForm.errors.name}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="resource"
                    onChange={editCollectibleForm.handleChange}
                    name="resource"
                    value={editCollectibleForm.values.resource}
                    errors={editCollectibleForm.errors.resource}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="quantity"
                    onChange={editCollectibleForm.handleChange}
                    type="number"
                    name="quantity"
                    value={editCollectibleForm.values.quantity}
                    errors={editCollectibleForm.errors.quantity}
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
            onClick={editCollectibleForm.handleSubmit}
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

export default EditCollectible;
