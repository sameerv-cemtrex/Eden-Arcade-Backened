import Input from "components/common/formComponent/Input";
import React, { useEffect, useReducer } from "react";
import { Modal } from "react-bootstrap";
import { attachmentInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "";
const initialState = {
  form: attachmentInitialData,
  errors: {},
};

function EditAttachment(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  useEffect(() => {}, []);

  return (
    <div>
      <Modal {...props} size="lg" centered className="model-box">
        <Modal.Header>
          <Modal.Title>Add Attachment</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="model-content mx-3">
              <div className="row">
                <div className="col-md-6">
                  <Input label="Part" name="part" disabled />
                </div>
                <div className="col-md-6">
                  <Input label="Model" name="model" disabled />
                </div>
                <div className="col-md-6">
                  <Input label="Texture" name="texture" disabled />
                </div>
                <div className="col-md-6">
                  <Input
                    label="accuracy rating"
                    type="number"
                    name="accuracyRating"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="damage rating"
                    type="number"
                    name="damageRating"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="ergonomics rating"
                    name="ergonomicsRating"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="fire Rate Rating"
                    name="fireRateRating"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Firing Sound"
                    name="firingSoundGunshot"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Firing VFX"
                    name="firingVFXMuzzleFlash"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Length (cm)"
                    name="lengthInCm"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Range Rating"
                    name="rangeRating"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Recoil Rating"
                    name="recoilRating"
                    type="number"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <Input label="Weight" name="weight" type="number" disabled />
                </div>
                <div className="col-md-6">
                  <Input label="gun" name="gun" disabled />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="action-button d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-primary btn-fw text-uppercase"
                onClick={props.onHide}
              >
                Close
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default EditAttachment;
