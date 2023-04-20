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
import { editNFTPrefab, getNFTPrefabsById } from "services/nft-prefab.service";

const validation = z.object({
  domeId: z.number().nonnegative(),
  panel1: z.string(),
  panel2: z.string(),
  panel3: z.string(),
  panel4: z.string(),
  panel5: z.string(),
  panel6: z.string(),
});

const variationOptions = [
  { label: "Variation 1", value: "variation1" },
  { label: "Variation 2", value: "variation2" },
  { label: "Variation 3", value: "variation3" },
  { label: "Variation 4", value: "variation4" },
  { label: "Variation 5", value: "variation5" },
];

const EditNftPrefab = (props) => {
  const [itemOptions, setItemOptions] = useState(null);
  const editPrefabForm = useFormik({
    // validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      console.log("response", data);
      // editNFTPrefab(props.id).then((res) => {
      //   props.onClose();
      // });
    },
  });

  useEffect(() => {
    // getAllItems().then((res) => setItemOptions(res.data));
    getNFTPrefabsById(props.id).then((res) => {
      editPrefabForm.setValues(res.data);
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
              {editPrefabForm.values ? (
                <div className="row">
                  <div className="col-sm-6">
                    <Input
                      label="Dome Id"
                      name="domeId"
                      value={editPrefabForm.values.domeId}
                      onChange={editPrefabForm.handleChange}
                      errors={editPrefabForm.errors.domeId}
                    />
                  </div>

                  {Object.keys(editPrefabForm.values).map((item, i) => {
                    if (
                      !_.includes(["name", "domeId", "__v", "_id", "id"], item)
                    ) {
                      return (
                        <div className="col-sm-6">
                          <SelectDropdown
                            options={variationOptions}
                            placeholder="select item"
                            label={`Panel ${i}`}
                            value={itemOptions?.find(
                              (t) =>
                                t.value === editPrefabForm.values[item] &&
                                editPrefabForm.values[item]
                            )}
                            onChange={(e) =>
                              editPrefabForm.setFieldValue(`item`, e.value)
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
              onClick={editPrefabForm.handleSubmit}
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

export default EditNftPrefab;
