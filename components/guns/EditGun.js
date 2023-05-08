import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { editGun, getGunsById } from "services/guns.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validation = z.object({
  name: z.string(),
  description: z.string(),
  magazineSize: z.number(),
  minMaxSettings: z.object({
    accuracy: z.object({
      min: z.number(),
      max: z.number(),
    }),
    Damage: z.object({
      min: z.number(),
      max: z.number(),
    }),
    ADSSpeed: z.object({
      min: z.number(),
      max: z.number(),
    }),
    SemiAuto_FireRate: z.object({
      min: z.number(),
      max: z.number(),
    }),
    FullAuto_FireRate: z.object({
      min: z.number(),
      max: z.number(),
    }),
    FiringAudio: z.object({
      min: z.number(),
      max: z.number(),
    }),
    FiringVFX: z.object({
      min: z.number(),
      max: z.number(),
    }),
    EffectiveRange: z.object({
      min: z.number(),
      max: z.number(),
    }),
    SemiAuto_HorizontalRecoil: z.object({
      min: z.number(),
      max: z.number(),
    }),
    SemiAuto_VerticalRecoil: z.object({
      min: z.number(),
      max: z.number(),
    }),
    FullAuto_HorizontalRecoil: z.object({
      min: z.number(),
      max: z.number(),
    }),
    FullAuto_VerticalRecoil: z.object({
      min: z.number(),
      max: z.number(),
    }),
    SemiAuto_Reliability: z.object({
      min: z.number(),
      max: z.number(),
    }),
    FullAuto_Reliability: z.object({
      min: z.number(),
      max: z.number(),
    }),
    ReloadSpeed: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
  additionalSettings: z.object({
    MovementSpeedPenalty: z.number(),
    PickupDelay: z.number(),
    SwapDelay: z.number(),
  }),
  modifiers: z.object({
    DamageModifier: z.object({
      Headshot: z.number(),
    }),
    AccuracyModifier: z.object({
      Crouching: z.number(),
      Prone: z.number(),
      ADS: z.number(),
      SemiAuto: z.number(),
      Stationary: z.number(),
      Level: z.number(),
      Intelligence: z.number(),
      Marksmanship: z.number(),
    }),
    ADSCostModifier: z.object({
      Crouching: z.number(),
      Prone: z.number(),
      Level: z.number(),
      Endurance: z.number(),
      Handling: z.number(),
    }),
    RecoilModifier: z.object({
      Crouching: z.number(),
      Prone: z.number(),
      ADS: z.number(),
      Level: z.number(),
      Strength: z.number(),
      Handling: z.number(),
    }),
    ReliabilityModifier: z.object({
      Level: z.number(),
      Intelligence: z.number(),
      Mastery: z.number(),
    }),
    ReloadSpeedModifier: z.object({
      Level: z.number(),
      Handling: z.number(),
    }),
    ADSSpeedModifier: z.object({
      Level: z.number(),
      Endurance: z.number(),
      Handling: z.number(),
    }),
  }),
  specificGunValues: z.object({
    Ratings: z.object({
      accuracy: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      damage: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      ergonomics: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      fireRate: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      firingSound: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      firingVFX: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      range: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      recoil: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      reliability: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      reloadSpeed: z.array(
        z.object({
          min: z.number(),
          max: z.number(),
        })
      ),
      chance: z.object({
        grip: z.number(),
        stock: z.number(),
        foregrip: z.number(),
        scope: z.number(),
        silencer: z.number(),
        flashlight: z.number(),
      }),
    }),
    OtherTraits: z.object({
      length: z.number(),
      weight: z.number(),
      silencer: z.boolean(),
    }),
  }),
});

function EditGun(props) {
  const editGunForm = useFormik({
    // initialValues,
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editGun(props.id, data).then((res) => props.onClose());
    },
  });

  useEffect(() => {
    getGunsById(props.id).then((res) => editGunForm.setValues(res.data));
  }, []);

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
          Edit Gun
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editGunForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                <div className="col-md-4">
                  <Input
                    label="name"
                    name="name"
                    value={editGunForm.values.name}
                    errors={editGunForm.errors.name}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Length"
                    type="number"
                    value={
                      editGunForm.values.specificGunValues?.OtherTraits.length
                    }
                    errors={
                      editGunForm.errors.specificGunValues?.OtherTraits.length
                    }
                    name="specificGunValues.OtherTraits.length"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Weight"
                    type="number"
                    value={
                      editGunForm.values.specificGunValues.OtherTraits.weight
                    }
                    errors={
                      editGunForm.errors?.specificGunValues?.OtherTraits.weight
                    }
                    name="specificGunValues.OtherTraits.weight"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-3 pt-4">
                  <Form.Check reverse type="switch">
                    <Form.Check.Input
                      isValid
                      name="specificGunValues.OtherTraits.silencer"
                      checked={
                        editGunForm.values.specificGunValues.OtherTraits
                          .silencer
                      }
                      onChange={editGunForm.handleChange}
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
                    value={editGunForm.values.description}
                    errors={editGunForm.errors.description}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col">
                  <Input
                    label="Magazine Size"
                    name="magazineSize"
                    type="number"
                    value={editGunForm.values.magazineSize}
                    errors={editGunForm.errors.magazineSize}
                    onChange={editGunForm.handleChange}
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
                        value={editGunForm.values.minMaxSettings.accuracy.min}
                        name="minMaxSettings.accuracy.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={editGunForm.values.minMaxSettings.accuracy.max}
                        name="minMaxSettings.accuracy.max"
                        onChange={editGunForm.handleChange}
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
                        value={editGunForm.values.minMaxSettings.ADSSpeed.min}
                        name="minMaxSettings.ADSSpeed.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        type="number"
                        label="MAX"
                        value={editGunForm.values.minMaxSettings.ADSSpeed.max}
                        name="minMaxSettings.ADSSpeed.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-gray-500">Damage</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={editGunForm.values.minMaxSettings.Damage?.min}
                        name="minMaxSettings.Damage.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={editGunForm.values.minMaxSettings.Damage?.max}
                        name="minMaxSettings.Damage.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">SemiAuto Fire Rate</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.SemiAuto_FireRate
                            .min
                        }
                        name="minMaxSettings.SemiAuto_FireRate.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.SemiAuto_FireRate
                            .max
                        }
                        name="minMaxSettings.SemiAuto_FireRate.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">FullAuto Fire Rate</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.FullAuto_FireRate
                            .min
                        }
                        name="minMaxSettings.FullAuto_FireRate.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.FullAuto_FireRate
                            .max
                        }
                        name="minMaxSettings.FullAuto_FireRate.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-gray-500">Firing Audio</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        name="minMaxSettings.FiringAudio.min"
                        value={
                          editGunForm.values.minMaxSettings.FiringAudio.min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.FiringAudio.max
                        }
                        name="minMaxSettings.FiringAudio.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">Firing VFX</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={editGunForm.values.minMaxSettings.FiringVFX.min}
                        name="minMaxSettings.FiringVFX.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={editGunForm.values.minMaxSettings.FiringVFX.max}
                        name="minMaxSettings.FiringVFX.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-gray-500">Effective Range</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.EffectiveRange.min
                        }
                        name="minMaxSettings.EffectiveRange.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.EffectiveRange.max
                        }
                        name="minMaxSettings.EffectiveRange.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">SemiAuto Horizontal Recoil</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings
                            .SemiAuto_HorizontalRecoil.min
                        }
                        name="minMaxSettings.SemiAuto_HorizontalRecoil.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings
                            .SemiAuto_HorizontalRecoil.max
                        }
                        name="minMaxSettings.SemiAuto_HorizontalRecoil.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-gray-500">SemiAuto Vertical Recoil</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings
                            .SemiAuto_VerticalRecoil.min
                        }
                        name="minMaxSettings.SemiAuto_VerticalRecoil.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="minMaxSettings.SemiAuto_VerticalRecoil.max"
                        value={
                          editGunForm.values.minMaxSettings
                            .SemiAuto_VerticalRecoil.max
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">FullAuto Horizontal Recoil</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings
                            .FullAuto_HorizontalRecoil.min
                        }
                        name="minMaxSettings.FullAuto_HorizontalRecoil.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings
                            .FullAuto_HorizontalRecoil.max
                        }
                        name="minMaxSettings.FullAuto_HorizontalRecoil.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-gray-500">FullAuto Vertical Recoil</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        name="minMaxSettings.FullAuto_VerticalRecoil.min"
                        value={
                          editGunForm.values.minMaxSettings
                            .FullAuto_VerticalRecoil.min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="minMaxSettings.FullAuto_VerticalRecoil.max"
                        value={
                          editGunForm.values.minMaxSettings
                            .FullAuto_VerticalRecoil.max
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">SemiAuto Reliability</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.SemiAuto_Reliability
                            .min
                        }
                        name="minMaxSettings.SemiAuto_Reliability.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.SemiAuto_Reliability
                            .max
                        }
                        name="minMaxSettings.SemiAuto_Reliability.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-gray-500">FullAuto Reliability</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.FullAuto_Reliability
                            .min
                        }
                        name="minMaxSettings.FullAuto_Reliability.min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        value={
                          editGunForm.values.minMaxSettings.FullAuto_Reliability
                            .max
                        }
                        name="minMaxSettings.FullAuto_Reliability.max"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-gray-500">Reload Speed</p>
                  <div className="row">
                    <div className="col-5">
                      <Input
                        label="MIN"
                        type="number"
                        name="minMaxSettings.ReloadSpeed.min"
                        value={
                          editGunForm.values.minMaxSettings.ReloadSpeed.min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="minMaxSettings.ReloadSpeed.max"
                        value={
                          editGunForm.values.minMaxSettings.ReloadSpeed.max
                        }
                        onChange={editGunForm.handleChange}
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
                    value={
                      editGunForm.values.additionalSettings.MovementSpeedPenalty
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Pickup Delay"
                    type="number"
                    name="additionalSettings.PickupDelay"
                    value={editGunForm.values.additionalSettings.PickupDelay}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Swap Delay"
                    type="number"
                    name="additionalSettings.SwapDelay"
                    value={editGunForm.values.additionalSettings.SwapDelay}
                    onChange={editGunForm.handleChange}
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
                    value={editGunForm.values.modifiers.DamageModifier.Headshot}
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <p className="text-gray-500">Accuracy Modifiers</p>
                <div className="col-md-4">
                  <Input
                    label="Crouching"
                    name="modifiers.AccuracyModifier.Crouching"
                    value={
                      editGunForm.values.modifiers.AccuracyModifier.Crouching
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Prone"
                    type="number"
                    name="modifiers.AccuracyModifier.Prone"
                    value={editGunForm.values.modifiers.AccuracyModifier.Prone}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="ADS"
                    type="number"
                    name="modifiers.AccuracyModifier.ADS"
                    value={editGunForm.values.modifiers.AccuracyModifier.ADS}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="SemiAuto"
                    type="number"
                    name="modifiers.AccuracyModifier.SemiAuto"
                    value={
                      editGunForm.values.modifiers.AccuracyModifier.SemiAuto
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Stationary"
                    type="number"
                    name="modifiers.AccuracyModifier.Stationary"
                    value={
                      editGunForm.values.modifiers.AccuracyModifier.Stationary
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Level"
                    type="number"
                    name="modifiers.AccuracyModifier.Level"
                    value={editGunForm.values.modifiers.AccuracyModifier.Level}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Intelligence"
                    type="number"
                    name="modifiers.AccuracyModifier.Intelligence"
                    value={
                      editGunForm.values.modifiers.AccuracyModifier.Intelligence
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Marksmanship"
                    type="number"
                    name="modifiers.AccuracyModifier.Marksmanship"
                    value={
                      editGunForm.values.modifiers.AccuracyModifier.Marksmanship
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <p className="text-gray-500">ADS Cost Modifiers</p>
                <div className="col-md-4">
                  <Input
                    label="Crouching"
                    name="modifiers.ADSCostModifier.Crouching"
                    value={
                      editGunForm.values.modifiers.ADSCostModifier.Crouching
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Prone"
                    type="number"
                    name="modifiers.ADSCostModifier.Prone"
                    value={editGunForm.values.modifiers.ADSCostModifier.Prone}
                    onChange={editGunForm.handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <Input
                    label="Level"
                    type="number"
                    name="modifiers.ADSCostModifier.Level"
                    value={editGunForm.values.modifiers.ADSCostModifier.Level}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Endurance"
                    type="number"
                    name="modifiers.ADSCostModifier.Endurance"
                    value={
                      editGunForm.values.modifiers.ADSCostModifier.Endurance
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Handling"
                    type="number"
                    name="modifiers.ADSCostModifier.Handling"
                    value={
                      editGunForm.values.modifiers.ADSCostModifier.Handling
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <p className="text-gray-500">Recoil Modifiers</p>
                <div className="col-md-4">
                  <Input
                    label="Crouching"
                    name="modifiers.RecoilModifier.Crouching"
                    value={
                      editGunForm.values.modifiers.RecoilModifier.Crouching
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Prone"
                    name="modifiers.RecoilModifier.Prone"
                    value={editGunForm.values.modifiers.RecoilModifier.Prone}
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="ADS"
                    type="number"
                    name="modifiers.RecoilModifier.ADS"
                    value={editGunForm.values.modifiers.RecoilModifier.ADS}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Level"
                    type="number"
                    name="modifiers.RecoilModifier.Level"
                    value={editGunForm.values.modifiers.RecoilModifier.Level}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Strength"
                    type="number"
                    name="modifiers.RecoilModifier.Strength"
                    value={editGunForm.values.modifiers.RecoilModifier.Strength}
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Handling"
                    type="number"
                    name="modifiers.RecoilModifier.Handling"
                    value={editGunForm.values.modifiers.RecoilModifier.Handling}
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <p className="text-gray-500">Reliability Modifiers</p>
                <div className="col-md-4">
                  <Input
                    label="Level"
                    name="modifiers.ReliabilityModifier.Level"
                    value={
                      editGunForm.values.modifiers.ReliabilityModifier.Level
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Intelligence"
                    type="number"
                    name="modifiers.ReliabilityModifier.Intelligence"
                    value={
                      editGunForm.values.modifiers.ReliabilityModifier
                        .Intelligence
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Mastery"
                    type="number"
                    name="modifiers.ReliabilityModifier.Mastery"
                    value={
                      editGunForm.values.modifiers.ReliabilityModifier.Mastery
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <p className="text-gray-500">Reload Speed Modifiers</p>
                <div className="col-md-4">
                  <Input
                    label="Level"
                    name="modifiers.ReloadSpeedModifier.Level"
                    value={
                      editGunForm.values.modifiers.ReloadSpeedModifier.Level
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Handling"
                    type="number"
                    name="modifiers.ReloadSpeedModifier.Handling"
                    value={
                      editGunForm.values.modifiers.ReloadSpeedModifier.Handling
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <p className="text-gray-500">ADS Speed Modifiers</p>
                <div className="col-md-4">
                  <Input
                    label="Level"
                    name="modifiers.ADSSpeedModifier.Level"
                    value={editGunForm.values.modifiers.ADSSpeedModifier.Level}
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Level"
                    name="modifiers.ADSSpeedModifier.Endurance"
                    value={
                      editGunForm.values.modifiers.ADSSpeedModifier.Endurance
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Handling"
                    type="number"
                    name="modifiers.ADSSpeedModifier.Handling"
                    value={
                      editGunForm.values.modifiers.ADSSpeedModifier.Handling
                    }
                    onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.accuracy[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.accuracy[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[2].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.accuracy[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.accuracy[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.accuracy[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .accuracy[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[0]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.damage[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[0]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[1]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.damage[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[1]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[2]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.damage[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[2]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[3]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.damage[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[3]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[4]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.damage[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.damage[4]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.ergonomics[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.ergonomics[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[2].min
                        }
                        name="specificGunValues.Ratings.ergonomics[2].min"
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.ergonomics[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.ergonomics[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.ergonomics[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .ergonomics[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.fireRate[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.fireRate[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[2].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.fireRate[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.fireRate[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.fireRate[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .fireRate[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingSound[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingSound[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[2].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingSound[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingSound[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingSound[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingSound[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingVFX[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingVFX[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[2].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingVFX[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingVFX[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.firingVFX[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .firingVFX[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[0]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.range[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[0]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[1]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.range[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[1]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[2]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.range[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[2]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[3]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.range[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[3]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[4]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.range[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.range[4]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[0]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.recoil[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[0]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[1]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.recoil[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[1]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[2]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.recoil[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[2]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[3]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.recoil[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[3]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[4]
                            .min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.recoil[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings.recoil[4]
                            .max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reliability[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reliability[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[2].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reliability[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reliability[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reliability[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reliability[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[0].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reloadSpeed[0].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[0].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[1].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reloadSpeed[1].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[1].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[2].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reloadSpeed[2].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[2].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[3].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reloadSpeed[3].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[3].max
                        }
                        onChange={editGunForm.handleChange}
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
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[4].min
                        }
                        onChange={editGunForm.handleChange}
                      />
                    </div>
                    <div className="col-5">
                      <Input
                        label="MAX"
                        type="number"
                        name="specificGunValues.Ratings.reloadSpeed[4].max"
                        value={
                          editGunForm.values.specificGunValues.Ratings
                            .reloadSpeed[4].max
                        }
                        onChange={editGunForm.handleChange}
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
                    value={
                      editGunForm.values.specificGunValues.Ratings.chance.grip
                    }
                    type="number"
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Stock"
                    type="number"
                    name="specificGunValues.Ratings.chance.stock"
                    value={
                      editGunForm.values.specificGunValues.Ratings.chance.stock
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Foregrip"
                    type="number"
                    name="specificGunValues.Ratings.chance.foregrip"
                    value={
                      editGunForm.values.specificGunValues.Ratings.chance
                        .foregrip
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Scope"
                    type="number"
                    name="specificGunValues.Ratings.chance.scope"
                    value={
                      editGunForm.values.specificGunValues.Ratings.chance.scope
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Silencer"
                    type="number"
                    name="specificGunValues.Ratings.chance.silencer"
                    value={
                      editGunForm.values.specificGunValues.Ratings.chance
                        .silencer
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Flashlight"
                    type="number"
                    name="specificGunValues.Ratings.chance.flashlight"
                    value={
                      editGunForm.values.specificGunValues.Ratings.chance
                        .flashlight
                    }
                    onChange={editGunForm.handleChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={editGunForm.handleSubmit}
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
  );
}

export default EditGun;
