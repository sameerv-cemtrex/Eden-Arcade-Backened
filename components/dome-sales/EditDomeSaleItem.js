import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import { getAllItems } from "services/items.service";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import {
  editDomeSaleItem,
  getDomeSalesById,
} from "services/dome-sales.service";
import Loader from "components/Loader.component";
import dayjs from "dayjs";

const validation = z.object({
  dome: z.number().nonnegative(),
  discountedPrice: z.number().nonnegative(),
});

const EditDomeSaleItem = (props) => {
  const [itemOptions, setItemOptions] = useState(null);
  const editSaleItemForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editDomeSaleItem(props.id, {
        ...data,
        item: typeof data.item !== "object" ? data.item : data.item._id,
        startTime: dayjs(data.startTime).valueOf(),
        endTime: dayjs(data.endTime).valueOf(),
      }).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getAllItems().then((res) => setItemOptions(res.data));
    getDomeSalesById(props.id).then((res) => {
      editSaleItemForm.setValues(res.data);
    });
  }, []);

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
            Edit Dome Sale Item
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              {editSaleItemForm.values ? (
                <div className="row">
                  {Object.keys(editSaleItemForm.values).map((item, i) => {
                    if (!_.includes(["item", "__v", "_id", "id"], item)) {
                      return (
                        <div className="col-sm-6" key={`${item}${i}`}>
                          <Input
                            label={item}
                            onChange={editSaleItemForm.handleChange}
                            name={item}
                            type={
                              _.includes(["startTime", "endTime"], item)
                                ? "datetime-local"
                                : "number"
                            }
                            className={
                              _.includes(["startTime", "endTime"], item)
                                ? "date-picker"
                                : null
                            }
                            value={
                              _.includes(["startTime", "endTime"], item)
                                ? dayjs(editSaleItemForm.values[item]).format(
                                    "YYYY-MM-DDTHH:mm"
                                  )
                                : item === "item"
                                ? editSaleItemForm.values[item]._id
                                : editSaleItemForm.values[item]
                            }
                            min={
                              _.includes(["startTime", "endTime"], item)
                                ? dayjs(new Date()).format("YYYY-MM-DDTHH:mm")
                                : null
                            }
                            errors={editSaleItemForm.errors[item]}
                          />
                        </div>
                      );
                    } else if (item === "item") {
                      return (
                        <div className="col-sm-6">
                          <SelectDropdown
                            options={itemOptions}
                            isLoading={!itemOptions}
                            getOptionLabel={(o) => o.name}
                            getOptionValue={(o) => o._id}
                            placeholder="select item"
                            label="Item"
                            value={itemOptions?.find(
                              (t) =>
                                t._id === editSaleItemForm.values.item._id &&
                                editSaleItemForm.values.item._id
                            )}
                            onChange={(e) =>
                              editSaleItemForm.setFieldValue(`item`, e._id)
                            }
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                <Loader />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={editSaleItemForm.handleSubmit}
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
    </div>
  );
};

export default EditDomeSaleItem;
