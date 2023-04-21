import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { addNFTPrefab } from "services/nft-prefab.service";

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

const AddNftPrefab = (props) => {
  const addPrefabForm = useFormik({
    initialValues: {
      domeId: 0,
      panel1: "variation1",
      panel2: "variation1",
      panel3: "variation1",
      panel4: "variation1",
      panel5: "variation1",
      panel6: "variation1",
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addNFTPrefab(data).then((res) => {
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
            Add NFT Prefab
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    label="Dome Id"
                    name="domeId"
                    type="number"
                    onChange={addPrefabForm.handleChange}
                    errors={addPrefabForm.errors.domeId}
                  />
                </div>

                {_.range(6).map((i) => {
                  return (
                    <div className="col-sm-6" key={`item${i}`}>
                      <SelectDropdown
                        options={variationOptions}
                        isLoading={!variationOptions}
                        placeholder="select Panel"
                        label={`Panel ${i + 1}`}
                        onChange={(e) =>
                          addPrefabForm.setFieldValue(`panel${i + 1}`, e.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addPrefabForm.handleSubmit}
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

export default AddNftPrefab;
