import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { BsCheck2Circle } from "react-icons/bs";
import { Toast, ToastContainer } from "react-bootstrap";
import { editHealth, getHealth } from "services/health.service";

const validation = z.object({
  baseSettings: z.object({
    PlayerLevel_Cap: z.number(),
    PlayerIntelligence_Cap: z.number(),
    PlayerStrength_Cap: z.number(),
    PlayerVitality_Cap: z.number(),
    PlayerEndurance_Cap: z.number(),
    BleedingDamage: z.number(),
    SuffocationDamage: z.number(),
    BaseSearchTime: z.number(),
    CarryWeight_Base: z.number(),
    BaseOverburdenModifier: z.number(),
    BaseKnifeDamage: z.number(),
  }),
  injuries: z.object({
    Arm_InjuredThreshold: z.number(),
    Leg_InjuredThreshold: z.number(),
    Head_InjuredThreshold: z.number(),
    Torso_InjuredThreshold: z.number(),
    BleedingDamage: z.number(),
    AccuracyModifier: z.object({
      Arm_InjuredPenalty: z.number(),
      Arm_DeadPenalty: z.number(),
      Head_InjuredPenalty: z.number(),
    }),
    ADSCostModifier: z.object({
      Arm_InjuredPenalty: z.number(),
      Arm_DeadPenalty: z.number(),
    }),
    MovementSpeedModifier: z.object({
      oneLegInjured: z.number(),
      twoLegsInjured: z.number(),
      oneLegInjured_OtherBlackedOut: z.number(),
      bothLegsBlackedOut: z.number(),
    }),
    MovementStaminaModifier: z.object({
      oneLegInjured: z.number(),
      twoLegsInjured: z.number(),
      oneLegInjured_OtherBlackedOut: z.number(),
      bothLegsBlackedOut: z.number(),
    }),
    StaminaModifier: z.object({
      torsoInjured: z.number(),
      torsoBlackedOut: z.number(),
    }),
  }),
  movementAndActions: z.object({
    BaseStaminaRechargeRate: z.number(),
    staminaThreshold: z.object({
      jumping: z.number(),
      sprinting: z.number(),
      ADS: z.number(),
    }),
    staminaCost: z.object({
      Jumping: z.number(),
      Sprinting: z.number(),
      ADS: z.number(),
      Walking: z.number(),
      CrouchWalking: z.number(),
      Crawling: z.number(),
      KnifeAttack: z.number(),
      GrenadeThrow: z.number(),
    }),
  }),
  statBenefits: z.object({
    Endurance_MaximumStaminaRechargeModifier: z.number(),
    Vitality_MaximumBleedingRateModifier: z.number(),
    Vitality_MaximumSuffocationRateModifier: z.number(),
    Strength_MaximumCarryWeightModifier: z.number(),
    Strength_MaximumSpeedPenaltyModifier: z.number(),
    Intelligence_MaximumSearchReductionModifier: z.number(),
    Strength_MaximumKnifeDamageModifier: z.number(),
  }),
  skillBenefits: z.object({
    KnifeMastery_MaximumKnifeDamageModifier: z.number(),
  }),
  survival: z.object({
    Oxygen_LowThreshold: z.number(),
    Energy_LowThreshold: z.number(),
    Hydration_LowThreshold: z.number(),
    OxygenLowModifier: z.number(),
    OxygenZeroModifier: z.number(),
    SuffocationDamage: z.number(),
    EnergyLowModifier: z.number(),
    EnergyZeroModifier: z.number(),
    Hydration_Low_AccuracyModifier: z.number(),
    Hydration_Empty_AccuracyModifier: z.number(),
  }),
});

function HealthPage() {
  const [isEditing, setEditing] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const healthForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editHealth(data._id, data).then((res) => {
        if (res.status) {
          setSuccessModal(true);
          setEditing(false);
          setTimeout(() => setSuccessModal(false), 3000);
        }
      });
    },
  });

  //   convert data keys to title case
  const titleCase = (s) =>
    s
      .replace(/^_*(.)|_+(.)/g, (s, c, d) =>
        c ? c.toUpperCase() : " " + d.toUpperCase()
      )
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      });

  useEffect(() => {
    getHealth().then((res) =>
      res.code === 200 ? healthForm.setValues(res.data[0]) : null
    );
  }, []);

  return (
    <div className="main-content">
      <div className="user-container border border-secondary p-5">
        {!healthForm.values ? (
          <Loader />
        ) : (
          <div className="row h-100">
            <h1 className="text-uppercase">Health parameters</h1>
            <form className="h-100">
              <div className="col-12 card-content model-content bg-transparent p-3 m-auto">
                <p className="text-gray-500 text-uppercase">Base Settings</p>
                <div className="row">
                  {Object.keys(healthForm.values.baseSettings).map((item) => (
                    <div className="col-3 mb-3" key={item}>
                      <Input
                        value={healthForm.values.baseSettings[item]}
                        className={`p-2 ${isEditing ? null : "border-0"}`}
                        label={titleCase(item)}
                        name={`baseSettings.${item}`}
                        type="number"
                        onChange={healthForm.handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 text-uppercase mt-3">Injuries</p>
                <div className="row">
                  {Object.keys(healthForm.values.injuries).map((item) => {
                    if (
                      _.includes(
                        [
                          "AccuracyModifier",
                          "ADSCostModifier",
                          "MovementSpeedModifier",
                          "MovementStaminaModifier",
                          "StaminaModifier",
                        ],
                        item
                      )
                    ) {
                      return (
                        <div className="ms-3" key={item}>
                          <p className="text-gray-600 text-uppercase">
                            {titleCase(item)}
                          </p>
                          <div className="row">
                            {Object.keys(healthForm.values.injuries[item]).map(
                              (i) => (
                                <div className="col-3 mb-3" key={i}>
                                  <Input
                                    value={healthForm.values.injuries[item][i]}
                                    className={`p-2 ${
                                      isEditing ? null : "border-0"
                                    }`}
                                    label={titleCase(i)}
                                    name={`injuries.${item}.${i}`}
                                    type="number"
                                    onChange={healthForm.handleChange}
                                    disabled={!isEditing}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="col-3 mb-3" key={item}>
                          <Input
                            value={healthForm.values.injuries[item]}
                            className={`p-2 ${isEditing ? null : "border-0"}`}
                            label={titleCase(item)}
                            name={`injuries.${item}`}
                            type="number"
                            onChange={healthForm.handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      );
                    }
                  })}
                </div>

                <p className="text-gray-500 text-uppercase mt-3">
                  movement And Actions
                </p>
                <div className="row">
                  {Object.keys(healthForm.values.movementAndActions).map(
                    (item) => {
                      if (
                        _.includes(["staminaCost", "staminaThreshold"], item)
                      ) {
                        return (
                          <div className="ms-3" key={item}>
                            <p className="text-gray-600 text-uppercase">
                              {titleCase(item)}
                            </p>
                            <div className="row">
                              {Object.keys(
                                healthForm.values.movementAndActions[item]
                              ).map((i) => (
                                <div className="col-3 mb-3" key={i}>
                                  <Input
                                    value={
                                      healthForm.values.movementAndActions[
                                        item
                                      ][i]
                                    }
                                    className={`p-2 ${
                                      isEditing ? null : "border-0"
                                    }`}
                                    label={titleCase(i)}
                                    name={`movementAndActions.${item}.${i}`}
                                    type="number"
                                    onChange={healthForm.handleChange}
                                    disabled={!isEditing}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="col-3 mb-3" key={item}>
                            <Input
                              value={healthForm.values.movementAndActions[item]}
                              className={`p-2 ${isEditing ? null : "border-0"}`}
                              label={titleCase(item)}
                              name={`movementAndActions.${item}`}
                              type="number"
                              onChange={healthForm.handleChange}
                              disabled={!isEditing}
                            />
                          </div>
                        );
                      }
                    }
                  )}
                </div>

                <p className="text-gray-500 text-uppercase">Stat Benefits</p>
                <div className="row">
                  {Object.keys(healthForm.values.statBenefits).map((item) => (
                    <div className="col-3 mb-3" key={item}>
                      <Input
                        value={healthForm.values.statBenefits[item]}
                        className={`p-2 ${isEditing ? null : "border-0"}`}
                        label={titleCase(item)}
                        name={`statBenefits.${item}`}
                        type="number"
                        onChange={healthForm.handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 text-uppercase">Skill Benefits</p>
                <div className="row">
                  {Object.keys(healthForm.values.skillBenefits).map((item) => (
                    <div className="col-3 mb-3" key={item}>
                      <Input
                        value={healthForm.values.skillBenefits[item]}
                        className={`p-2 ${isEditing ? null : "border-0"}`}
                        label={titleCase(item)}
                        name={`skillBenefits.${item}`}
                        type="number"
                        onChange={healthForm.handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 text-uppercase">survival</p>
                <div className="row">
                  {Object.keys(healthForm.values.survival).map((item) => (
                    <div className="col-3 mb-3" key={item}>
                      <Input
                        value={healthForm.values.survival[item]}
                        className={`p-2 ${isEditing ? null : "border-0"}`}
                        label={titleCase(item)}
                        name={`survival.${item}`}
                        type="number"
                        onChange={healthForm.handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 mb-2 d-flex justify-content-end">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="bg-transparent border-0 text-uppercase text-white text-lg me-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={healthForm.handleSubmit}
                      className="bg-transparent border-0 fw-bold text-uppercase text-white text-lg me-3"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="bg-transparent border-0 text-uppercase text-white text-lg me-3"
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {successModal ? (
        <ToastContainer position="bottom-end" className="p-3 m-5">
          <Toast bg={"success"}>
            <Toast.Body className="text-white">
              <BsCheck2Circle color="blue" size={24} />
              <span className="ms-3">Traits updated Successfully.</span>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </div>
  );
}

export default HealthPage;
