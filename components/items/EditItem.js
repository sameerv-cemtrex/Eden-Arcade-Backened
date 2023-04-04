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

function EditItem(props) {
  const editItemForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editItems(props.id, data).then((res) => {
        props.onClose();
      });
      // console.log(data);
    },
  });
  const [arrlength, setArrLength] = useState(
    editItemForm.values?.craftingPrice.length || 1
  );

  useEffect(() => {
    getItemsById(props.id).then((res) => editItemForm.setValues(res.data));
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
                  ];
                  const changeTypeKeys = ["name", "category", "description"];
                  if (!_.includes(excludes, item)) {
                    return (
                      <div className="col-md-6">
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
              <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
                <p className="fs-5 mb-1 text-gray-600">Crafting Price</p>
                {!props.isView && (
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
                              editItemForm.values.craftingPrice[i].resource &&
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
                        value={editItemForm.values.craftingPrice[i]?.quantity}
                        onChange={editItemForm.handleChange}
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
                              editItemForm.values.craftingPrice.splice(i, 1);
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
