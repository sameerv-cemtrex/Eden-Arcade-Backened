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

const validation = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  weight: z.number().nonnegative(),
  sizeX: z.number(),
  sizeY: z.number(),
  edenPurchasePrice: z.number(),
  edenSellingPrice: z.number(),
  craftingPrice: z
    .array(
      z.object({
        resource: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
      })
    )
    .optional(),
  isCraftable: z.boolean(),
  craftingRewards: z
    .array(
      z.object({
        resource: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
      })
    )
    .optional(),
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

function EditItem(props) {
  const [craftable, setCraftable] = useState(false);
  const editItemForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editItems(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });
  const [arrlength, setArrLength] = useState(1);
  const [rewardsLength, setRewardsLength] = useState(1);

  useEffect(() => {
    getItemsById(props.id).then((res) => {
      editItemForm.setValues(res.data);
      setCraftable(res.data.isCraftable);
      setArrLength(res.data.craftingPrice.length);
      setRewardsLength(res.data.craftingRewards.length);
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
          Edit Item
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editItemForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                {Object.keys(editItemForm.values).map((item) => {
                  const excludes = [
                    "__v",
                    "_id",
                    "id",
                    "createdAt",
                    "updatedAt",
                    "itemId",
                    "craftingPrice",
                    "isCraftable",
                    "craftingRewards",
                  ];
                  const changeTypeKeys = ["name", "category", "description"];
                  if (!_.includes(excludes, item)) {
                    return (
                      <div className="col-md-6" key={`item${item}`}>
                        <Input
                          label={item
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            })}
                          name={item}
                          value={editItemForm.values[item]}
                          type={
                            !_.includes(changeTypeKeys, item)
                              ? "number"
                              : "text"
                          }
                          errors={editItemForm.errors[item]}
                          onChange={editItemForm.handleChange}
                        />
                      </div>
                    );
                  }
                })}
              </div>

              <div className="col-md-4 pt-4">
                <Form.Check reverse type="switch">
                  <Form.Check.Input
                    isValid
                    name="isCraftable"
                    checked={editItemForm.values.isCraftable}
                    onChange={(e) => {
                      editItemForm.setFieldValue(
                        "isCraftable",
                        e.target.checked
                      );
                      if (e.target.checked) {
                        setCraftable(true);
                      } else {
                        setCraftable(false);
                        editItemForm.setFieldValue("craftingPrice", []);
                        editItemForm.setFieldValue("craftingRewards", []);
                        setArrLength(0);
                        setRewardsLength(0);
                      }
                    }}
                    className="mt-2 me-2"
                  />
                  <Form.Check.Label className="text-lg me-2 text-gray-800">
                    Is Craftable
                  </Form.Check.Label>
                </Form.Check>
              </div>

              {craftable ? (
                <>
                  <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
                    <p className="fs-5 mb-1 text-gray-600">Crafting Price</p>
                    <IoAddCircleOutline
                      color="white"
                      size={28}
                      onClick={() => {
                        setArrLength(arrlength + 1);
                        editItemForm.setFieldValue("craftingPrice", [
                          ...editItemForm.values.craftingPrice,
                          { resource: "", quantity: 1 },
                        ]);
                      }}
                      style={{ cursor: "pointer" }}
                    />
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
                                  editItemForm.values.craftingPrice[i]
                                    .resource &&
                                editItemForm.values.craftingPrice[i].resource
                            )}
                            onChange={(e) =>
                              editItemForm.setFieldValue(
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
                            value={
                              editItemForm.values.craftingPrice[i].quantity
                            }
                            onChange={editItemForm.handleChange}
                          />
                        </div>

                        <div className="col-sm-1 align-self-center">
                          {arrlength > 1 && (
                            <IoRemoveCircleOutline
                              color="white"
                              size={28}
                              onClick={() => {
                                setArrLength(arrlength - 1);
                                editItemForm.values.craftingPrice.splice(i, 1);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
                    <p className="fs-5 mb-1 text-gray-600">Crafting Rewards</p>
                    <IoAddCircleOutline
                      color="white"
                      size={28}
                      onClick={() => {
                        setRewardsLength(rewardsLength + 1);
                        editItemForm.setFieldValue("craftingRewards", [
                          ...editItemForm.values.craftingRewards,
                          { resource: "", quantity: 1 },
                        ]);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="row">
                    {_.range(rewardsLength).map((i) => (
                      <React.Fragment key={`item${i}`}>
                        <div className="col-sm-6">
                          <SelectDropdown
                            options={rewardOptions}
                            placeholder="select resource"
                            label="resource"
                            value={rewardOptions?.find(
                              (t) =>
                                t.value ===
                                  editItemForm.values.craftingRewards[i]
                                    .resource &&
                                editItemForm.values.craftingRewards[i].resource
                            )}
                            onChange={(e) =>
                              editItemForm.setFieldValue(
                                `craftingRewards[${i}].resource`,
                                e.value
                              )
                            }
                          />
                        </div>
                        <div className="col-sm-5">
                          <Input
                            label="Quantity"
                            type="number"
                            name={`craftingRewards[${i}].quantity`}
                            value={
                              editItemForm.values.craftingRewards[i].quantity
                            }
                            onChange={editItemForm.handleChange}
                          />
                        </div>
                        <div className="col-sm-1 align-self-center">
                          <IoRemoveCircleOutline
                            color="white"
                            size={28}
                            onClick={() => {
                              setRewardsLength(rewardsLength - 1);
                              editItemForm.values.craftingRewards.splice(i, 1);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={editItemForm.handleSubmit}
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

export default EditItem;
