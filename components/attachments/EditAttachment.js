import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import React, { useEffect, useReducer, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  editAttachment,
  getAttachmentsById,
} from "services/attachments.service";
import { attachmentInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const initialState = {
  form: attachmentInitialData,
  errors: {},
};

function EditAttachment(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      const formData = {};
      Object.keys(form).map((item) => (formData[item] = form[item].value));

      editAttachment(props.id, formData).then((res) => {
        props.onClose();
        alert("Form Submitted Successfully");
      });
    }
    dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (value !== undefined) {
      form[name].value = value;

      //:: Delete error of individual field
      if (name in errors) {
        delete errors[name];
      }

      dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
      dispatch({ type: actionType.SET_ERRORS, payload: errors });
    }
  };

  useEffect(() => {
    setLoading(true);
    getAttachmentsById(props.id).then((res) => {
      setLoading(false);
      Object.keys(form).map((item) => (form[item].value = res.data[item]));

      dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
    });
  }, []);

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
            Edit Attachment
          </Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <Loader />
        ) : (
          <form>
            <Modal.Body className="bg-black border-start border-end  border-secondary">
              <div className="model-content mx-3">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Part"
                      value={form.part.value}
                      name="part"
                      errors={errors.part ? errors.part[0] : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Model"
                      name="model"
                      value={form.model.value}
                      errors={errors.model ? errors.model[0] : null}
                      type="number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Texture"
                      name="texture"
                      value={form.texture.value}
                      errors={errors.texture ? errors.texture[0] : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="accuracy rating"
                      type="number"
                      value={form.accuracyRating.value}
                      name="accuracyRating"
                      errors={
                        errors.accuracyRating ? errors.accuracyRating[0] : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="damage rating"
                      type="number"
                      name="damageRating"
                      value={form.damageRating.value}
                      errors={
                        errors.damageRating ? errors.damageRating[0] : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="ergonomics rating"
                      name="ergonomicsRating"
                      value={form.ergonomicsRating.value}
                      type="number"
                      errors={
                        errors.ergonomicsRating
                          ? errors.ergonomicsRating[0]
                          : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="fire Rate Rating"
                      value={form.fireRateRating.value}
                      name="fireRateRating"
                      type="number"
                      errors={
                        errors.fireRateRating ? errors.fireRateRating[0] : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Firing Sound"
                      name="firingSoundGunshot"
                      type="number"
                      value={form.firingSoundGunshot.value}
                      errors={
                        errors.firingSoundGunshot
                          ? errors.firingSoundGunshot[0]
                          : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Firing VFX"
                      name="firingVFXMuzzleFlash"
                      value={form.firingVFXMuzzleFlash.value}
                      type="number"
                      errors={
                        errors.firingVFXMuzzleFlash
                          ? errors.firingVFXMuzzleFlash[0]
                          : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Length (cm)"
                      name="lengthInCm"
                      value={form.lengthInCm.value}
                      type="number"
                      errors={errors.lengthInCm ? errors.lengthInCm[0] : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Range Rating"
                      name="rangeRating"
                      type="number"
                      value={form.rangeRating.value}
                      errors={errors.rangeRating ? errors.rangeRating[0] : null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Recoil Rating"
                      name="recoilRating"
                      value={form.recoilRating.value}
                      type="number"
                      errors={
                        errors.recoilRating ? errors.recoilRating[0] : null
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Weight"
                      name="weight"
                      value={form.weight.value}
                      type="number"
                      errors={errors.weight ? errors.weight[0] : null}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
              <button
                type="submit"
                onClick={handleSubmit}
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
        )}
      </Modal>
    </div>
  );
}

export default EditAttachment;
