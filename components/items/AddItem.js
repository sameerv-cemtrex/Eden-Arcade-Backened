import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";
import { taskInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import { addItemAPI } from "services/items.service";

const validation = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  weight: z.number().nonnegative(),
  sizeX: z.number(),
  sizeY: z.number(),
  edenPurchasePrice: z.number(),
  edenSellingPrice: z.number(),
  craftingPrice: z.number(),
});

const AddItem = (props) => {
  const addItemForm = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      weight: 0,
      sizeX: 0,
      sizeY: 0,
      edenPurchasePrice: 0,
      edenSellingPrice: 0,
      craftingPrice: 0,
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addItemAPI(data).then((res) => {
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
            Add Item
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                {Object.keys(addItemForm.values).map((item) => (
                  <div className="col-sm-6">
                    <Input
                      label={item}
                      onChange={addItemForm.handleChange}
                      name={item}
                      type={
                        !_.includes(["name", "description", "category"], item)
                          ? "number"
                          : "text"
                      }
                      errors={addItemForm.errors[item]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addItemForm.handleSubmit}
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

export default AddItem;
