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
      <Modal {...props} size="xl" centered className="model-box">
        <Modal.Header>
          <Modal.Title>Add Attachment</Modal.Title>
        </Modal.Header>
        {attachment ? (
          <form>
            <Modal.Body>
              <div className="model-content mx-3">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Part"
                      value={attachment.part}
                      name="part"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Model"
                      value={attachment.model}
                      name="model"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Texture"
                      name="texture"
                      value={attachment.texture}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="accuracy rating"
                      type="number"
                      value={attachment.accuracyRating}
                      name="accuracyRating"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
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
                      name="ergonomicsRating"
                      value={attachment.ergonomicsRating}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="fire Rate Rating"
                      value={attachment.fireRateRating}
                      name="fireRateRating"
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
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
                      name="firingVFXMuzzleFlash"
                      value={attachment.firingVFXMuzzleFlash}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
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
                      name="recoilRating"
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Weight"
                      name="weight"
                      value={attachment.weight}
                      type="number"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="action-button d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary btn-fw text-uppercase"
                  onClick={props.onClose}
                >
                  Close
                </button>
              </div>
            </Modal.Footer>
          </form>
        ) : (
          <Loader />
        )}
      </Modal>
    </div>
  );
}

export default ViewAttachment;
