import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { addGun } from "services/guns.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const initialState = {
  name: "",
  description: "",
  magazineSize: 0,
  minMaxSettings: {
    accuracy: {
      min: 0,
      max: 0,
    },
    ADSSpeed: {
      min: 0,
      max: 0,
    },
    SemiAuto_FireRate: {
      min: 0,
      max: 0,
    },
    FullAuto_FireRate: {
      min: 0,
      max: 0,
    },
    FiringAudio: {
      min: 0,
      max: 0,
    },
    FiringVFX: {
      min: 0,
      max: 0,
    },
    EffectiveRange: {
      min: 0,
      max: 0,
    },
    SemiAuto_HorizontalRecoil: {
      min: 0,
      max: 0,
    },
    SemiAuto_VerticalRecoil: {
      min: 0,
      max: 0,
    },
    FullAuto_HorizontalRecoil: {
      min: 0,
      max: 0,
    },
    FullAuto_VerticalRecoil: {
      min: 0,
      max: 0,
    },
    SemiAuto_Reliability: {
      min: 0,
      max: 0,
    },
    FullAuto_Reliability: {
      min: 0,
      max: 0,
    },
    ReloadSpeed: {
      min: 0,
      max: 0,
    },
  },
  additionalSettings: {
    MovementSpeedPenalty: 0,
    PickupDelay: 0,
    SwapDelay: 0,
  },
  modifiers: {
    DamageModifier: {
      Headshot: 0,
    },
    AccuracyModifier: {
      Crouching: 0,
      Prone: 0,
      ADS: 0,
      SemiAuto: 0,
      Stationary: 0,
      Level: 0,
      Intelligence: 0,
      Marksmanship: 0,
    },
    ADSCostModifier: {
      Crouching: 0,
      Prone: 0,
      Level: 0,
      Endurance: 0,
      Handling: 0,
    },
    RecoilModifier: {
      Crouching: 0,
      Prone: 0,
      ADS: 0,
      Level: 0,
      Strength: 0,
      Handling: 0,
    },
    ReliabilityModifier: {
      Level: 0,
      Intelligence: 0,
      Mastery: 0,
    },
    ReloadSpeedModifier: {
      Level: 0,
      Handling: 0,
    },
    ADSSpeedModifier: {
      Level: 0,
      Endurance: 0,
      Handling: 0,
    },
  },
  specificGunValues: {
    Ratings: {
      accuracy: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      damage: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      ergonomics: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      fireRate: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      firingSound: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      firingVFX: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      range: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      recoil: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      reliability: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      reloadSpeed: [
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
        {
          min: 0,
          max: 0,
        },
      ],
      chance: {
        grip: 0,
        stock: 0,
        foregrip: 0,
        scope: 0,
        silencer: 0,
        flashlight: 0,
      },
    },
    OtherTraits: {
      length: 0,
      weight: 0,
      silencer: true,
    },
  },
};

const validation = z.object({
  name: z.string(),
  description: z.string(),
  magazineSize: z.number().nonnegative(),
  minMaxSettings: z.object({
    accuracy: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    ADSSpeed: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    SemiAuto_FireRate: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    FullAuto_FireRate: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    FiringAudio: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    FiringVFX: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    EffectiveRange: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    SemiAuto_HorizontalRecoil: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    SemiAuto_VerticalRecoil: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    FullAuto_HorizontalRecoil: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    FullAuto_VerticalRecoil: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    SemiAuto_Reliability: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    FullAuto_Reliability: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    ReloadSpeed: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
  }),
  additionalSettings: z.object({
    MovementSpeedPenalty: z.number().nonnegative(),
    PickupDelay: z.number().nonnegative(),
    SwapDelay: z.number().nonnegative(),
  }),
  modifiers: z.object({
    DamageModifier: z.object({
      Headshot: z.number().nonnegative(),
    }),
    AccuracyModifier: z.object({
      Crouching: z.number().nonnegative(),
      Prone: z.number().nonnegative(),
      ADS: z.number().nonnegative(),
      SemiAuto: z.number().nonnegative(),
      Stationary: z.number().nonnegative(),
      Level: z.number().nonnegative(),
      Intelligence: z.number().nonnegative(),
      Marksmanship: z.number().nonnegative(),
    }),
    ADSCostModifier: z.object({
      Crouching: z.number().nonnegative(),
      Prone: z.number().nonnegative(),
      Level: z.number().nonnegative(),
      Endurance: z.number().nonnegative(),
      Handling: z.number().nonnegative(),
    }),
    RecoilModifier: z.object({
      Crouching: z.number().nonnegative(),
      Prone: z.number().nonnegative(),
      ADS: z.number().nonnegative(),
      Level: z.number().nonnegative(),
      Strength: z.number().nonnegative(),
      Handling: z.number().nonnegative(),
    }),
    ReliabilityModifier: z.object({
      Level: z.number().nonnegative(),
      Intelligence: z.number().nonnegative(),
      Mastery: z.number().nonnegative(),
    }),
    ReloadSpeedModifier: z.object({
      Level: z.number().nonnegative(),
      Handling: z.number().nonnegative(),
    }),
    ADSSpeedModifier: z.object({
      Level: z.number().nonnegative(),
      Endurance: z.number().nonnegative(),
      Handling: z.number().nonnegative(),
    }),
  }),
  specificGunValues: z.object({
    Ratings: z.object({
      accuracy: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      damage: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      ergonomics: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      fireRate: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      firingSound: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      firingVFX: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      range: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      recoil: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      reliability: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      reloadSpeed: z.array(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
        })
      ),
      chance: z.object({
        grip: z.number().nonnegative(),
        stock: z.number().nonnegative(),
        foregrip: z.number().nonnegative(),
        scope: z.number().nonnegative(),
        silencer: z.number().nonnegative(),
        flashlight: z.number().nonnegative(),
      }),
    }),
    OtherTraits: z.object({
      length: z.number().nonnegative(),
      weight: z.number().nonnegative(),
      silencer: z.boolean(),
    }),
  }),
});

function AddGun(props) {
  const addGunForm = useFormik({
    initialValues: initialState,
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addGun(data).then((res) => {
        props.onClose();
      });
    },
  });

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header
        closeButton
        className="bg-black border-top border-start border-end rounded-0 border-secondary"
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-uppercase text-white"
        >
          Add Gun
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          <div className="model-content mx-3">
            <div className="row">
              <div className="col-md-4">
                <Input
                  label="name"
                  name="name"
                  errors={addGunForm.errors.name}
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Length"
                  type="number"
                  errors={
                    addGunForm.errors.specificGunValues?.OtherTraits.length
                  }
                  name="specificGunValues.OtherTraits.length"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Weight"
                  type="number"
                  errors={
                    addGunForm.errors?.specificGunValues?.OtherTraits.weight
                  }
                  name="specificGunValues.OtherTraits.weight"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-3 pt-4">
                <Form.Check reverse type="switch">
                  <Form.Check.Input
                    isValid
                    name="specificGunValues.OtherTraits.silencer"
                    onChange={addGunForm.handleChange}
                    className="mt-2 me-2"
                  />
                  <Form.Check.Label className="text-lg me-2 text-gray-800">
                    Silencer
                  </Form.Check.Label>
                </Form.Check>
              </div>
              <div className="col">
                <Input
                  label="Description"
                  name="description"
                  errors={addGunForm.errors.description}
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col">
                <Input
                  label="Magazine Size"
                  name="magazineSize"
                  type="number"
                  errors={addGunForm.errors.magazineSize}
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">Accuracy</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.accuracy.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.accuracy.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <p className="text-gray-500">ADS Speed</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      type="number"
                      label="MIN"
                      name="minMaxSettings.ADSSpeed.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      type="number"
                      label="MAX"
                      name="minMaxSettings.ADSSpeed.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* <div className="col-md-6">
                <p className="text-gray-500">Damage</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.damage.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.damage.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div> */}
              <div className="col-md-6">
                <p className="text-gray-500">SemiAuto Fire Rate</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      name="minMaxSettings.SemiAuto_FireRate.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      name="minMaxSettings.SemiAuto_FireRate.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">FullAuto Fire Rate</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.FullAuto_FireRate.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.FullAuto_FireRate.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-gray-500">Firing Audio</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.FiringAudio.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.FiringAudio.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">Firing VFX</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.FiringVFX.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.FiringVFX.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-gray-500">Effective Range</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.EffectiveRange.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.EffectiveRange.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">SemiAuto Horizontal Recoil</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.SemiAuto_HorizontalRecoil.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.SemiAuto_HorizontalRecoil.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-gray-500">SemiAuto Vertical Recoil</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.SemiAuto_VerticalRecoil.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.SemiAuto_VerticalRecoil.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">FullAuto Horizontal Recoil</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.FullAuto_HorizontalRecoil.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.FullAuto_HorizontalRecoil.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-gray-500">FullAuto Vertical Recoil</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.FullAuto_VerticalRecoil.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.FullAuto_VerticalRecoil.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">SemiAuto Reliability</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.SemiAuto_Reliability.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.SemiAuto_Reliability.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-gray-500">FullAuto Reliability</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.FullAuto_Reliability.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.FullAuto_Reliability.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-gray-500">Reload Speed</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="minMaxSettings.ReloadSpeed.min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="minMaxSettings.ReloadSpeed.max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Addition Settings</p>
              <div className="col-md-4">
                <Input
                  label="Movement Speed Penalty"
                  type="number"
                  name="additionalSettings.MovementSpeedPenalty"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Pickup Delay"
                  type="number"
                  name="additionalSettings.PickupDelay"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Swap Delay"
                  type="number"
                  name="additionalSettings.SwapDelay"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Damage Modifiers</p>
              <div className="col-md-4">
                <Input
                  label="HeadShot"
                  name="modifiers.DamageModifier.Headshot"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Accuracy Modifiers</p>
              <div className="col-md-4">
                <Input
                  label="Crouching"
                  name="modifiers.AccuracyModifier.Crouching"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Prone"
                  type="number"
                  name="modifiers.AccuracyModifier.Prone"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="ADS"
                  type="number"
                  name="modifiers.AccuracyModifier.ADS"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="SemiAuto"
                  type="number"
                  name="modifiers.AccuracyModifier.SemiAuto"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Stationary"
                  type="number"
                  name="modifiers.AccuracyModifier.Stationary"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Level"
                  type="number"
                  name="modifiers.AccuracyModifier.Level"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Intelligence"
                  type="number"
                  name="modifiers.AccuracyModifier.Intelligence"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Marksmanship"
                  type="number"
                  name="modifiers.AccuracyModifier.Marksmanship"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">ADS Cost Modifiers</p>
              <div className="col-md-4">
                <Input
                  label="Crouching"
                  name="modifiers.ADSCostModifier.Crouching"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Prone"
                  type="number"
                  name="modifiers.ADSCostModifier.Prone"
                  onChange={addGunForm.handleChange}
                />
              </div>

              <div className="col-md-4">
                <Input
                  label="Level"
                  type="number"
                  name="modifiers.ADSCostModifier.Level"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Endurance"
                  type="number"
                  name="modifiers.ADSCostModifier.Endurance"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Handling"
                  type="number"
                  name="modifiers.ADSCostModifier.Handling"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Recoil Modifiers</p>
              <div className="col-md-4">
                <Input
                  label="Crouching"
                  name="modifiers.RecoilModifier.Crouching"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Prone"
                  name="modifiers.RecoilModifier.Prone"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="ADS"
                  type="number"
                  name="modifiers.RecoilModifier.ADS"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Level"
                  type="number"
                  name="modifiers.RecoilModifier.Level"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Strength"
                  type="number"
                  name="modifiers.RecoilModifier.Strength"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Handling"
                  type="number"
                  name="modifiers.RecoilModifier.Handling"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Reliability Modifiers</p>
              <div className="col-md-4">
                <Input
                  label="Level"
                  name="modifiers.ReliabilityModifier.Level"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Intelligence"
                  type="number"
                  name="modifiers.ReliabilityModifier.Intelligence"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Mastery"
                  type="number"
                  name="modifiers.ReliabilityModifier.Mastery"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Reload Speed Modifiers</p>
              <div className="col-md-4">
                <Input
                  label="Level"
                  name="modifiers.ReloadSpeedModifier.Level"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Handling"
                  type="number"
                  name="modifiers.ReloadSpeedModifier.Handling"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Mastery"
                  type="number"
                  name="modifiers.ReliabilityModifier.Mastery"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Accuracy Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.accuracy[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Damage Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.damage[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.damage[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.damage[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.damage[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.damage[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.damage[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.damage[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.damage[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.damage[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.damage[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Ergonomics Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.ergonomics[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Fire Rate Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.fireRate[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Firing Sound Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingSound[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Firing VFX Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.firingVFX[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Range Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.range[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.range[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.range[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.range[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.range[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.range[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.range[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.range[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.range[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.range[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Recoil Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.recoil[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.recoil[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.recoil[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.recoil[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.recoil[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.recoil[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.recoil[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.recoil[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.recoil[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.recoil[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Reliability Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reliability[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reliability[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reliability[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reliability[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reliability[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reliability[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reliability[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reliability[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reliability[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reliability[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Reload Speed Rating</p>
              <div className="col-md-4">
                <p className="text-gray-600">Lv 1</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[0].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[0].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 2</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[1].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[1].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 3</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[2].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[2].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 4</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[3].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[3].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <p className="text-gray-600">Lv 5</p>
                <div className="row">
                  <div className="col-5">
                    <Input
                      label="MIN"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[4].min"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="MAX"
                      type="number"
                      name="specificGunValues.Ratings.reloadSpeed[4].max"
                      onChange={addGunForm.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="text-gray-500">Chance Rating</p>
              <div className="col-md-4">
                <Input
                  label="Grip"
                  name="specificGunValues.Ratings.chance.grip"
                  type="number"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Stock"
                  type="number"
                  name="specificGunValues.Ratings.chance.stock"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Foregrip"
                  type="number"
                  name="specificGunValues.Ratings.chance.foregrip"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Scope"
                  type="number"
                  name="specificGunValues.Ratings.chance.scope"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Silencer"
                  type="number"
                  name="specificGunValues.Ratings.chance.silencer"
                  onChange={addGunForm.handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Flashlight"
                  type="number"
                  name="specificGunValues.Ratings.chance.flashlight"
                  onChange={addGunForm.handleChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={addGunForm.handleSubmit}
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
  );
}

export default AddGun;
