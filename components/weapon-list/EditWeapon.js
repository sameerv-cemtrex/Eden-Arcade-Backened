import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { weaponInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";
import {
  editCategoryStat,
  getCategoryStatById,
} from "../../services/stats.service";

const category = "weaponsStatic";

const initialState = {
  form: weaponInitialData,
  errors: {},
};

const EditWeapon = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      const formData = {};
      Object.keys(form).map((item) => (formData[item] = form[item].value));
      editCategoryStat(category, props.id, formData).then((res) => {
        props.onClose();
        alert("Form Updated Successfully");
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

  //:: Call Get Api
  useEffect(() => {
    setLoading(true);
    getCategoryStatById(category, props.id).then((res) => {
      setLoading(false);
      Object.keys(form).map((item) => (form[item].value = res.data[item]));

      form["water"].value = _.toNumber(res.data.resources.water);
      form["air"].value = _.toNumber(res.data.resources.air);
      form["heat"].value = _.toNumber(res.data.resources.heat);
      form["fire"].value = _.toNumber(res.data.resources.fire);

      dispatch({ type: actionType.SET_FORM_VALUE, payload: form });
    });
  }, [props.id]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="model-box"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Weapons
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoading ? (
            <div className="model-content">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Input
                    label="name"
                    name="name"
                    value={form.name.value}
                    errors={errors.name ? errors.name[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="type"
                    name="type"
                    value={form.type.value}
                    errors={errors.type ? errors.type[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="gun Fire Mode"
                    name="gunFireMode"
                    value={form.gunFireMode.value}
                    errors={errors.gunFireMode ? errors.gunFireMode[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="screen Shake Intensity"
                    name="screenShakeIntensity"
                    value={form.screenShakeIntensity.value}
                    type="number"
                    errors={
                      errors.screenShakeIntensity
                        ? errors.screenShakeIntensity[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="screen Shake Duration"
                    name="screenShakeDuration"
                    value={form.screenShakeDuration.value}
                    type="number"
                    errors={
                      errors.screenShakeDuration
                        ? errors.screenShakeDuration[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    label="ammo Type"
                    name="ammoType"
                    value={form.ammoType.value}
                    type="number"
                    errors={errors.ammoType ? errors.ammoType[0] : null}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    label="fire Spread"
                    name="fireSpread"
                    value={form.fireSpread.value}
                    type="number"
                    errors={errors.fireSpread ? errors.fireSpread[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="damage"
                    name="damage"
                    value={form.damage.value}
                    type="number"
                    errors={errors.damage ? errors.damage[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="magazine Size"
                    name="magazineSize"
                    value={form.magazineSize.value}
                    type="number"
                    errors={errors.magazineSize ? errors.magazineSize[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="gun Shot Intensity"
                    name="gunShotIntensity"
                    value={form.gunShotIntensity.value}
                    type="number"
                    errors={
                      errors.gunShotIntensity
                        ? errors.gunShotIntensity[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="shooting Range"
                    name="shootingRange"
                    value={form.shootingRange.value}
                    type="number"
                    errors={
                      errors.shootingRange ? errors.shootingRange[0] : null
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="muzzle Flash Intensity"
                    name="muzzleFlashIntensity"
                    value={form.muzzleFlashIntensity.value}
                    type="number"
                    errors={
                      errors.muzzleFlashIntensity
                        ? errors.muzzleFlashIntensity[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="recoil"
                    name="recoil"
                    value={form.recoil.value}
                    errors={errors.recoil ? errors.recoil[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="Fire Rate"
                    name="fireRate"
                    value={form.fireRate.value}
                    errors={errors.fireRate ? errors.fireRate[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="Reload Time"
                    name="reloadTime"
                    value={form.reloadTime.value}
                    type="number"
                    errors={errors.reloadTime ? errors.reloadTime[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="BreloadTimeullet Shot Audio Clip"
                    name="bulletShotAudioClip"
                    value={form.bulletShotAudioClip.value}
                    errors={
                      errors.bulletShotAudioClip
                        ? errors.bulletShotAudioClip[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="Bullet Hole Prefab"
                    name="bulletHolePrefab"
                    value={form.bulletHolePrefab.value}
                    errors={
                      errors.bulletHolePrefab
                        ? errors.bulletHolePrefab[0]
                        : null
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="experience"
                    name="exp"
                    value={form.exp.value}
                    type="number"
                    errors={errors.exp ? errors.exp[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="weight"
                    name="weight"
                    value={form.weight.value}
                    type="number"
                    errors={errors.weight ? errors.weight[0] : null}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    label="description"
                    name="desc"
                    value={form.desc.value}
                    errors={errors.desc ? errors.desc[0] : null}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 mt-2">
                <h5 className="mb-0">Resources</h5>
              </div>

              {/* resources */}
              <div className="row pt-3">
                <div className="col-sm-6 mb-3">
                  <Input
                    label="water"
                    name="water"
                    value={form.water.value}
                    type="number"
                    errors={errors.water ? errors.water[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Fire */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="fire"
                    name="fire"
                    value={form.fire.value}
                    type="number"
                    errors={errors.fire ? errors.fire[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Air */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="air"
                    name="air"
                    value={form.air.value}
                    type="number"
                    errors={errors.air ? errors.air[0] : null}
                    onChange={handleChange}
                  />
                </div>

                {/* Heat */}
                <div className="col-sm-6 mb-3">
                  <Input
                    label="heat"
                    name="heat"
                    value={form.heat.value}
                    type="number"
                    errors={errors.heat ? errors.heat[0] : null}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="action-button d-flex justify-content-start pt-6 gap-2">
            <button
              onClick={props.onHide}
              type="submit"
              className="btn btn-secondary btn-fw text-uppercase"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary btn-fw text-uppercase"
            >
              Edit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditWeapon;
