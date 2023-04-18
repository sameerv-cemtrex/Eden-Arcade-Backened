import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import { getAllItems } from "services/items.service";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import dayjs from "dayjs";
import { addDomeSaleItems } from "services/dome-sales.service";

const validation = z.object({
  dome: z.number().nonnegative(),
  startTime: z.number(),
  endTime: z.number(),
  item: z.string(),
  discountedPrice: z.number().nonnegative(),
});

const AddDomeSaleItem = (props) => {
  const [itemOptions, setItemOptions] = useState(null);
  const addSaleItemForm = useFormik({
    initialValues: {
      dome: 0,
      startTime: "",
      endTime: "",
      item: "",
      discountedPrice: 0,
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addDomeSaleItems(data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getAllItems().then((res) => setItemOptions(res.data));
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
            Add Dome Sale Item
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                {Object.keys(addSaleItemForm.values).map((item, i) => {
                  if (!_.includes(["item"], item)) {
                    return (
                      <div className="col-sm-6" key={`${item}${i}`}>
                        <Input
                          label={item
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            })}
                          onChange={
                            !_.includes(["startTime", "endTime"], item)
                              ? addSaleItemForm.handleChange
                              : (e) => {
                                  addSaleItemForm.setFieldValue(
                                    item,
                                    dayjs(e.target.value).valueOf()
                                  );
                                }
                          }
                          className={
                            _.includes(["startTime", "endTime"], item)
                              ? "date-picker"
                              : null
                          }
                          name={item}
                          type={
                            _.includes(["startTime", "endTime"], item)
                              ? "datetime-local"
                              : "number"
                          }
                          errors={addSaleItemForm.errors[item]}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="col-sm-6">
                        <SelectDropdown
                          options={itemOptions}
                          isLoading={!itemOptions}
                          getOptionLabel={(o) => o.name}
                          getOptionValue={(o) => o._id}
                          placeholder="select item"
                          label="Item"
                          onChange={(e) =>
                            addSaleItemForm.setFieldValue(`item`, e._id)
                          }
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addSaleItemForm.handleSubmit}
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

export default AddDomeSaleItem;
