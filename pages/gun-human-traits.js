import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { editHumanTrait, getAllHumanTraits } from "services/gun-human-traits";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { BsCheck2Circle } from "react-icons/bs";
import { Toast, ToastContainer } from "react-bootstrap";

const validation = z.object({
  injuries: z.object({
    Arm_InjuredThreshold: z.number(),
    Head_InjuredThreshold: z.number(),
    Torso_InjuredThreshold: z.number(),
    Arm_InjuredPenalty_AccuracyModifier: z.number(),
    Arm_DeadPenalty_AccuracyModifier: z.number(),
    Arm_InjuredPenalty_ADSCostModifier: z.number(),
    Arm_DeadPenalty_ADSCostModifier: z.number(),
    Head_InjuredPenalty_AccuracyModifier: z.number(),
  }),
  survival: z.object({
    Oxygen_LowThreshold: z.number(),
    Hunger_LowThreshold: z.number(),
    Hydration_LowThreshold: z.number(),
    Hydration_Low_AccuracyModifier: z.number(),
    Hydration_Empty_AccuracyModifier: z.number(),
  }),
});

function GunHumanTraitsPage() {
  const [isEditing, setEditing] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const humanTraitsEditForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      console.log(data);
      editHumanTrait(data._id, data).then((res) => {
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
    getAllHumanTraits().then((res) =>
      res.code === 200 ? humanTraitsEditForm.setValues(res.data[0]) : null
    );
  }, []);

  return (
    <div className="main-content">
      <div className="user-container border border-secondary p-5">
        {!humanTraitsEditForm.values ? (
          <Loader />
        ) : (
          <div className="row h-100">
            <h1>Gun Details - Effect on humans</h1>
            <form className="h-100">
              <div className="col-12 card-content model-content bg-transparent p-3 m-auto">
                <p className="text-gray-500 text-uppercase">Injuries</p>
                <div className="row">
                  {Object.keys(humanTraitsEditForm.values.injuries).map(
                    (item) => (
                      <div className="col-3 mb-3">
                        <Input
                          value={humanTraitsEditForm.values.injuries[item]}
                          className={`p-2 ${isEditing ? null : "border-0"}`}
                          label={titleCase(item)}
                          name={`injuries.${item}`}
                          type="number"
                          onChange={humanTraitsEditForm.handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    )
                  )}
                </div>
                <p className="text-gray-500 text-uppercase mt-3">Survival</p>
                <div className="row">
                  {Object.keys(humanTraitsEditForm.values.survival).map(
                    (item) => (
                      <div className="col-3 mb-3">
                        <Input
                          value={humanTraitsEditForm.values.survival[item]}
                          className={`p-2 ${isEditing ? null : "border-0"}`}
                          label={titleCase(item)}
                          name={`survival.${item}`}
                          type="number"
                          onChange={humanTraitsEditForm.handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    )
                  )}
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
                      onClick={humanTraitsEditForm.handleSubmit}
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

export default GunHumanTraitsPage;
