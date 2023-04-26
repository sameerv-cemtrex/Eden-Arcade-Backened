import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { editItems, getItemsById } from "services/items.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { Form } from "react-bootstrap";
import {
  editConsumableItem,
  getConsumablesById,
} from "services/consumables.service";

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

function EditConsumable(props) {
  const [craftable, setCraftable] = useState(false);
  const editConsumableForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      // console.log("res", data);
      editConsumableItem(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getConsumablesById(props.id).then((res) => {
      editConsumableForm.setValues(res.data);
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
          Edit Consumable
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editConsumableForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    label="name"
                    onChange={editConsumableForm.handleChange}
                    name="name"
                    value={editConsumableForm.values.name}
                    errors={editConsumableForm.errors.name}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="Resource"
                    onChange={editConsumableForm.handleChange}
                    name="resource"
                    value={editConsumableForm.values.resource}
                    errors={editConsumableForm.errors.resource}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    label="quantity"
                    onChange={editConsumableForm.handleChange}
                    type="number"
                    name="quantity"
                    value={editConsumableForm.values.quantity}
                    errors={editConsumableForm.errors.quantity}
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
            onClick={editConsumableForm.handleSubmit}
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

export default EditConsumable;
