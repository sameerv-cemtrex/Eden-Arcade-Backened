import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { editTask, getTasksById } from "services/tasks.service";
import { z } from "zod";
import {
  FetchTaskGoals,
  KillTaskGoals,
  SurvivalTaskGoals,
  WaypointExplorationGoals,
  WaypointFetchGoals,
} from "./all-goals";
import TaskRewards from "./all-rewards";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import _ from "lodash";

const GiverOptions = [
  { value: "engineer", label: "Engineer" },
  { value: "doctor", label: "Doctor" },
  { value: "first_mate", label: "First Mate" },
  { value: "master_at_arms", label: "Master At Arms" },
];
const TaskTypeOptions = [
  { value: "fetch", label: "Fetch" },
  { value: "waypoint-fetch", label: "Waypoint-Fetch" },
  { value: "waypoint-exploration", label: "Waypoint-Exploration" },
  { value: "kill", label: "Kill" },
  { value: "survival", label: "Survival" },
];

const initialFetchGoal = {
  item: "",
  quantity: 1,
};
const initialWaypointFetchGoal = {
  item: "",
  location: "",
  quantity: 1,
};
const initialWaypointExplorationGoal = {
  location: "",
};
const initialKillGoal = {
  target: "",
  count: 1,
  weapon: "",
  hitPoint: "",
};
const initialSurvivalGoal = {
  additionalCondition: {
    label: "",
    value: 0,
  },
  extractionCount: 1,
};

const validation = z.object({
  name: z.string(),
  description: z.string(),
  giver: z.string(),
  type: z.string(),
  sequence: z.string(),
  rewards: z.array(
    z.object({ quantity: z.number().nonnegative(), item: z.string() })
  ),

  goal: z.object({
    count: z.number().nonnegative().optional(),
    quantity: z.number().nonnegative().optional(),
    item: z.string().optional(),
    location: z.string().optional(),
    target: z.string().optional(),
    count: z.number().nonnegative().optional(),
    weapon: z.string().optional(),
    hitPoint: z.string().optional(),
  }),
});

const EditTask = (props) => {
  const [taskType, setTaskType] = useState(null);
  const [taskGoals, setTaskGoals] = useState(null);

  const editTaskForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editTask(props.id, data).then((res) => props.onClose());
    },
  });

  useEffect(() => {
    getTasksById(props.id).then((res) => {
      editTaskForm.setValues(res.data);
      setTaskType(res.data.type);
    });
  }, []);

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
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          <div className="model-content">
            {editTaskForm.values ? (
              <>
                <div className="row">
                  <div className="col-sm-6">
                    <Input
                      onChange={editTaskForm.handleChange}
                      label="name"
                      name="name"
                      value={editTaskForm.values.name}
                      errors={editTaskForm.errors.name}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      onChange={editTaskForm.handleChange}
                      label="sequence"
                      name="sequence"
                      type="number"
                      value={editTaskForm.values.sequence}
                      errors={editTaskForm.errors.sequence}
                    />
                  </div>
                  <div className="col-sm-12">
                    <Input
                      onChange={editTaskForm.handleChange}
                      label="description"
                      name="description"
                      value={editTaskForm.values.description}
                      errors={editTaskForm.errors.description}
                    />
                  </div>
                  <div className="col-sm-6">
                    <SelectDropdown
                      options={GiverOptions}
                      value={GiverOptions.find(
                        (i) =>
                          editTaskForm.values.giver === i.value &&
                          editTaskForm.values.giver
                      )}
                      onChange={(e) =>
                        editTaskForm.setFieldValue("giver", e.value)
                      }
                      label="Giver"
                      placeholder="Select Giver"
                    />
                  </div>
                  <div className="col-sm-6">
                    <SelectDropdown
                      options={TaskTypeOptions}
                      label="Task Type"
                      value={TaskTypeOptions.find(
                        (i) =>
                          editTaskForm.values.type === i.value &&
                          editTaskForm.values.type
                      )}
                      onChange={(e) => {
                        editTaskForm.setFieldValue("type", e.value);
                        setTaskType(e.value);
                        e.value === "fetch"
                          ? editTaskForm.setFieldValue("goal", initialFetchGoal)
                          : e.value === "waypoint-fetch"
                          ? editTaskForm.setFieldValue(
                              "goal",
                              initialWaypointFetchGoal
                            )
                          : e.value === "waypoint-exploration"
                          ? editTaskForm.setFieldValue(
                              "goal",
                              initialWaypointExplorationGoal
                            )
                          : e.value === "kill"
                          ? editTaskForm.setFieldValue("goal", initialKillGoal)
                          : e.value === "survival"
                          ? editTaskForm.setFieldValue(
                              "goal",
                              initialSurvivalGoal
                            )
                          : null;
                      }}
                      placeholder="Select task type"
                    />
                  </div>
                </div>
                {taskType === "fetch" ? (
                  <FetchTaskGoals addForm={editTaskForm} />
                ) : taskType === "waypoint-exploration" ? (
                  <WaypointExplorationGoals addForm={editTaskForm} />
                ) : taskType === "waypoint-fetch" ? (
                  <WaypointFetchGoals addForm={editTaskForm} />
                ) : taskType === "kill" ? (
                  <KillTaskGoals addForm={editTaskForm} />
                ) : taskType === "survival" ? (
                  <SurvivalTaskGoals addForm={editTaskForm} />
                ) : null}
                <TaskRewards addForm={editTaskForm} />
              </>
            ) : (
              <Loader />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={editTaskForm.handleSubmit}
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
      </Modal>
    </div>
  );
};

export default EditTask;
