import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import React, { useEffect, useReducer, useState } from "react";
import { Modal } from "react-bootstrap";
import { getAttachmentsById } from "services/attachments.service";
import { attachmentInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "";

function ViewAttachment(props) {
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAttachmentsById(props.id).then((res) =>
      res.status ? setAttachment(res.data) : null
    );
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
            View Attachment
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            {attachment ? (
              <div className="model-content mx-3">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Part"
                      value={attachment.part}
                      className="border-0 bg-transparent"
                      name="part"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      className="border-0 bg-transparent"
                      label="Model"
                      value={attachment.model}
                      name="model"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Texture"
                      className="border-0 bg-transparent"
                      name="texture"
                      value={attachment.texture}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="accuracy rating"
                      className="border-0 bg-transparent"
                      type="number"
                      value={attachment.accuracyRating}
                      name="accuracyRating"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      className="border-0 bg-transparent"
                      label="damage rating"
                      value={attachment.damageRating}
                      type="number"
                      name="damageRating"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="ergonomics rating"
                      className="border-0 bg-transparent"
                      name="ergonomicsRating"
                      value={attachment.ergonomicsRating}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      className="border-0 bg-transparent"
                      label="fire Rate Rating"
                      value={attachment.fireRateRating}
                      name="fireRateRating"
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      className="border-0 bg-transparent"
                      label="Firing Sound"
                      name="firingSoundGunshot"
                      value={attachment.firingSoundGunshot}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Firing VFX"
                      className="border-0 bg-transparent"
                      name="firingVFXMuzzleFlash"
                      value={attachment.firingVFXMuzzleFlash}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      className="border-0 bg-transparent"
                      label="Length (cm)"
                      name="lengthInCm"
                      value={attachment.lengthInCm}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Range Rating"
                      className="border-0 bg-transparent"
                      name="rangeRating"
                      value={attachment.rangeRating}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Recoil Rating"
                      value={attachment.recoilRating}
                      className="border-0 bg-transparent"
                      name="recoilRating"
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Weight"
                      className="border-0 bg-transparent"
                      name="weight"
                      value={attachment.weight}
                      type="number"
                      disabled
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <div className="action-button d-flex justify-content-start pt-6 gap-2">
              <button
                onClick={props.onHide}
                className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
              >
                ok
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ViewAttachment;
