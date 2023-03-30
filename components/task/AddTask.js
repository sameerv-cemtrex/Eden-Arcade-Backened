import React, { useReducer, useState, useEffect } from "react";
import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { useFormik } from "formik";
import _ from "lodash";
import Modal from "react-bootstrap/Modal";

import { IoAddCircleOutline } from "react-icons/io5";
import { FetchTaskGoals } from "./all-goals";
import { FetchTaskRewards } from "./all-rewards";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const GiverOptions = [
  { value: "engineer", label: "Engineer" },
  { value: "doctor", label: "Doctor" },
  { value: "first_mate", label: "First Mate" },
  { value: "master_at_arms", label: "Master At Arms" },
];
const TaskTypeOptions = [
  { value: "fetch", label: "Fetch" },
  { value: "waypoint", label: "Waypoint" },
  { value: "kill", label: "Kill" },
  { value: "survival", label: "Survival" },
];

const validation = z.object({
  giver: z.string(),
  type: z.string(),
  goals: z.array(
    z.object({ name: z.string(), quantity: z.number().nonnegative() })
  ),
  rewards: z.array(
    z.object({ name: z.string(), quantity: z.number().nonnegative() })
  ),
});

const AddTask = (props) => {
  const addTaskForm = useFormik({
    initialValues: {
      giver: "doctor",
      type: "fetch",
      goals: [
        {
          name: "",
          quantity: 0,
        },
      ],
      rewards: [],
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      console.log("submit", data);
    },
  });

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className="bg-black border-top border-start border-end rounded-0 border-secondary"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-uppercase text-white"
          >
            ADD Task
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                <div className="col-sm-6">
                  <SelectDropdown
                    options={GiverOptions}
                    onChange={(e) =>
                      addTaskForm.setFieldValue("giver", e.value)
                    }
                    label="Giver"
                    placeholder="Select Giver"
                  />
                </div>
                <div className="col-sm-6">
                  <SelectDropdown
                    options={TaskTypeOptions}
                    label="Task Type"
                    onChange={(e) => addTaskForm.setFieldValue("type", e.value)}
                    placeholder="Select task type"
                  />
                </div>
              </div>

              <FetchTaskGoals addForm={addTaskForm} />
              <FetchTaskRewards addForm={addTaskForm} />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addTaskForm.handleSubmit}
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

export default AddTask;
