import Input from "components/common/formComponent/Input";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { weaponInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";
import { addCategoryStat } from "../../services/stats.service";

const category = "weaponsStatic";

const initialState = {
  form: weaponInitialData,
  errors: {},
};

const AddWeapon = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors } = state;

  //:: formDataSaveHandler form
  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateAll(form);
    dispatch({ type: actionType.SET_ERRORS, payload: formErrors });

    if (Object.keys(formErrors).length === 0) {
      let formData = {
        name: form.name.value,
        type: form.type.value,
        gunFireMode: form.gunFireMode.value,
        screenShakeIntensity: form.screenShakeIntensity.value,
        screenShakeDuration: form.screenShakeDuration.value,
        ammoType: form.ammoType.value,
        fireSpread: form.fireSpread.value,
        damage: form.damage.value,
        magazineSize: form.magazineSize.value,
        gunShotIntensity: form.gunShotIntensity.value,
        shootingRange: form.shootingRange.value,
        muzzleFlashIntensity: form.muzzleFlashIntensity.value,
        recoil: form.recoil.value,
        fireRate: form.fireRate.value,
        reloadTime: form.reloadTime.value,
        bulletShotAudioClip: form.bulletShotAudioClip.value,
        bulletHolePrefab: form.bulletHolePrefab.value,
        desc: form.desc.value,
        exp: form.exp.value,
        weight: form.weight.value,
        water: form.water.value,
        fire: form.fire.value,
        heat: form.heat.value,
        air: form.air.value,
      };

      addCategoryStat(category, formData).then((res) => {
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

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
      >
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            ADD Weapon
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.name ? errors.name[0] : null}
                    label="Name"
                    required
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.type ? errors.type[0] : null}
                    label="Type"
                    name="type"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.gunFireMode ? errors.gunFireMode[0] : null}
                    label="Gun Fire Mode"
                    name="gunFireMode"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.screenShakeIntensity
                        ? errors.screenShakeIntensity[0]
                        : null
                    }
                    label="Screen Shake Intensity"
                    type="number"
                    name="screenShakeIntensity"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.screenShakeDuration
                        ? errors.screenShakeDuration[0]
                        : null
                    }
                    label="Screen Shake Duration"
                    name="screenShakeDuration"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.ammoType ? errors.ammoType[0] : null}
                    label="Ammo Type"
                    name="ammoType"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.fireSpread ? errors.fireSpread[0] : null}
                    label="Fire Spread"
                    name="fireSpread"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.damage ? errors.damage[0] : null}
                    label="Damage"
                    name="damage"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.magazineSize ? errors.magazineSize[0] : null}
                    label="Magazine Size"
                    name="magazineSize"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.gunShotIntensity
                        ? errors.gunShotIntensity[0]
                        : null
                    }
                    label="Gun Shot Intensity"
                    name="gunShotIntensity"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.shootingRange ? errors.shootingRange[0] : null
                    }
                    label="Shooting Range"
                    name="shootingRange"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.muzzleFlashIntensity
                        ? errors.muzzleFlashIntensity[0]
                        : null
                    }
                    label="Muzzle Flash Intensity"
                    type="number"
                    name="muzzleFlashIntensity"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.recoil ? errors.recoil[0] : null}
                    label="Recoil"
                    name="recoil"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.fireRate ? errors.fireRate[0] : null}
                    label="Fire Rate"
                    name="fireRate"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.reloadTime ? errors.reloadTime[0] : null}
                    label="ReloadTime"
                    name="reloadTime"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.bulletShotAudioClip
                        ? errors.bulletShotAudioClip[0]
                        : null
                    }
                    label="Bullet Shot Audio Clip"
                    name="bulletShotAudioClip"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={
                      errors.bulletHolePrefab
                        ? errors.bulletHolePrefab[0]
                        : null
                    }
                    label="Bullet Hole Prefab"
                    name="bulletHolePrefab"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.exp ? errors.exp[0] : null}
                    label="Exp"
                    name="exp"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.weight ? errors.weight[0] : null}
                    label="weight"
                    name="weight"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <Input
                    errors={errors.desc ? errors.desc[0] : null}
                    label="desc"
                    name="desc"
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

export default AddWeapon;
