import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import { addItemAPI } from "services/items.service";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const validation = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  weight: z.number().nonnegative(),
  sizeX: z.number(),
  sizeY: z.number(),
  edenPurchasePrice: z.number(),
  edenSellingPrice: z.number(),
  craftingPrice: z.array(
    z.object({
      resource: z.string(),
      quantity: z.number().nonnegative(),
    })
  ),
});

const resourceOptions = [
  { label: "Metal", value: "metal" },
  { label: "Rare Metal", value: "rareMetal" },
  { label: "Water", value: "water" },
  { label: "Energy", value: "energy" },
  { label: "Time", value: "time" },
];

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
      craftingPrice: [{ resource: "", quantity: 1 }],
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addItemAPI(data).then((res) => {
        props.onClose();
      });
    },
  });
  const [arrlength, setArrLength] = useState(
    addItemForm.values.craftingPrice.length
  );

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
                {Object.keys(addItemForm.values).map((item) => {
                  if (item !== "craftingPrice")
                    return (
                      <div className="col-sm-6">
                        <Input
                          label={item}
                          onChange={addItemForm.handleChange}
                          name={item}
                          type={
                            !_.includes(
                              ["name", "description", "category"],
                              item
                            )
                              ? "number"
                              : "text"
                          }
                          errors={addItemForm.errors[item]}
                        />
                      </div>
                    );
                })}
              </div>
              <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
                <p className="fs-5 mb-1 text-gray-600">Crafting Price</p>
                {!props.isView && (
                  <IoAddCircleOutline
                    color="white"
                    size={28}
                    onClick={() => {
                      setArrLength(arrlength + 1);
                      addItemForm.setFieldValue("craftingPrice", [
                        ...addItemForm.values.craftingPrice,
                        { resource: "", quantity: 1 },
                      ]);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="row">
                {_.range(arrlength).map((i) => (
                  <React.Fragment key={`item${i}`}>
                    <div className="col-sm-6">
                      <SelectDropdown
                        options={resourceOptions}
                        placeholder="select resource"
                        label="resource"
                        value={resourceOptions?.find(
                          (t) =>
                            t.value ===
                              addItemForm.values.craftingPrice[i].resource &&
                            addItemForm.values.craftingPrice[i].resource
                        )}
                        onChange={(e) =>
                          addItemForm.setFieldValue(
                            `craftingPrice[${i}].resource`,
                            e.value
                          )
                        }
                      />
                    </div>
                    <div className="col-sm-5">
                      <Input
                        label="Quantity"
                        type="number"
                        name={`craftingPrice[${i}].quantity`}
                        value={addItemForm.values.craftingPrice[i]?.quantity}
                        onChange={addItemForm.handleChange}
                      />
                    </div>
                    {!props.isView && (
                      <div className="col-sm-1 align-self-center">
                        {arrlength > 1 && (
                          <IoRemoveCircleOutline
                            color="white"
                            size={28}
                            onClick={() => {
                              setArrLength(arrlength - 1);
                              addItemForm.values.craftingPrice.splice(i, 1);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
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
