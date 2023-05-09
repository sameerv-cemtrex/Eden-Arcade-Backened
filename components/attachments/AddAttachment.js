import Input from "components/common/formComponent/Input";
import React from "react";
import { Modal } from "react-bootstrap";
import { addAttachment } from "services/attachments.service";
import { useFormik } from "formik";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validation = z.object({
  name: z.string(),
  type: z.string(),
  model: z.number(),
  texture: z.string(),
  accuracyRating: z.number(),
  damageRating: z.number(),
  ergonomicsRating: z.number(),
  fireRateRating: z.number(),
  firingSoundGunshot: z.number(),
  firingVFXMuzzleFlash: z.number(),
  lengthInCm: z.number(),
  rangeRating: z.number(),
  recoilRating: z.number(),
  weight: z.number(),
});

function AddAttachment(props) {
  const attachmentForm = useFormik({
    initialValues: {
      name: "",
      type: "",
      model: 0,
      texture: "",
      accuracyRating: 0,
      damageRating: 0,
      ergonomicsRating: 0,
      fireRateRating: 0,
      firingSoundGunshot: 0,
      firingVFXMuzzleFlash: 0,
      lengthInCm: 0,
      rangeRating: 0,
      recoilRating: 0,
      weight: 0,
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      console.log(data);
      addAttachment(data).then((res) => {
        props.onClose();
      });
    },
  });

  return (
    <div>
      <Modal {...props} size="lg" centered>
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            Add Attachment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          <div className="model-content mx-3">
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="name"
                  name="name"
                  errors={attachmentForm.errors.name}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="type"
                  name="type"
                  errors={attachmentForm.errors.type}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Model"
                  name="model"
                  type="number"
                  errors={attachmentForm.errors.model}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Texture"
                  name="texture"
                  errors={attachmentForm.errors.texture}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="accuracy rating"
                  name="accuracyRating"
                  type="number"
                  errors={attachmentForm.errors.accuracyRating}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="damage rating"
                  name="damageRating"
                  type="number"
                  errors={attachmentForm.errors.damageRating}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="ergonomics rating"
                  name="ergonomicsRating"
                  type="number"
                  errors={attachmentForm.errors.ergonomicsRating}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="fire rate rating"
                  name="fireRateRating"
                  type="number"
                  errors={attachmentForm.errors.fireRateRating}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Firing Sound"
                  name="firingSoundGunshot"
                  type="number"
                  errors={attachmentForm.errors.fireSoundGunshot}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Firing VFX"
                  name="firingVFXMuzzleFlash"
                  type="number"
                  errors={attachmentForm.errors.firingVFXMuzzleFlash}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Length (cm)"
                  name="lengthInCm"
                  type="number"
                  onChange={attachmentForm.handleChange}
                  errors={attachmentForm.errors.lengthInCm}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Range Rating"
                  name="rangeRating"
                  type="number"
                  errors={attachmentForm.errors.rangeRating}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Recoil Rating"
                  name="recoilRating"
                  type="number"
                  errors={attachmentForm.errors.recoilRating}
                  onChange={attachmentForm.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Weight"
                  name="weight"
                  type="number"
                  errors={attachmentForm.errors.weight}
                  onChange={attachmentForm.handleChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={attachmentForm.handleSubmit}
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
      </Modal>
    </div>
  );
}

export default AddAttachment;
