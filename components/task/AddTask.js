import React, { useState, useEffect } from "react";
import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { useFormik } from "formik";
import _ from "lodash";
import Modal from "react-bootstrap/Modal";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import {
  FetchTaskGoals,
  KillTaskGoals,
  SurvivalTaskGoals,
  WaypointExplorationGoals,
  WaypointFetchGoals,
} from "./all-goals";
import TaskRewards from "./all-rewards";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { addTasks } from "services/tasks.service";
import { getAllTaskGivers } from "services/task-givers.service";

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
  sequence: z.number().nonnegative(),
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
const AddTask = (props) => {
  const [taskType, setTaskType] = useState(null);
  const [taskGoals, setTaskGoals] = useState(null);
  const [extraRewardsLength, setExtraRewardsLength] = useState(1);

  const addTaskForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      giver: "",
      type: "",
      sequence: 1,
      rewards: [],
      extraRewards: [],
      goal: {},
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addTasks(data).then((res) => props.onClose());
    },
  });

  useEffect(() => {
    getAllTaskGivers().then((res) => setTaskGoals(res.data));
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
            ADD Task
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                <div className="col-sm-6">
                  <Input
                    onChange={addTaskForm.handleChange}
                    label="name"
                    name="name"
                    errors={addTaskForm.errors.name}
                  />
                </div>
                <div className="col-sm-6">
                  <Input
                    onChange={addTaskForm.handleChange}
                    label="sequence"
                    name="sequence"
                    type="number"
                    errors={addTaskForm.errors.sequence}
                  />
                </div>
                <div className="col-sm-12">
                  <Input
                    onChange={addTaskForm.handleChange}
                    label="description"
                    name="description"
                    errors={addTaskForm.errors.description}
                  />
                </div>
                <div className="col-sm-6">
                  <SelectDropdown
                    options={taskGoals}
                    isLoading={!taskGoals}
                    getOptionLabel={(o) => o.profession}
                    getOptionValue={(o) => o.profession}
                    onChange={(e) =>
                      addTaskForm.setFieldValue("giver", e.profession)
                    }
                    label="Giver"
                    placeholder="Select Giver"
                    errors={addTaskForm.errors?.giver}
                  />
                </div>
                <div className="col-sm-6">
                  <SelectDropdown
                    options={TaskTypeOptions}
                    label="Task Type"
                    onChange={(e) => {
                      addTaskForm.setFieldValue("type", e.value);
                      setTaskType(e.value);
                      e.value === "fetch"
                        ? addTaskForm.setFieldValue("goal", initialFetchGoal)
                        : e.value === "waypoint-fetch"
                        ? addTaskForm.setFieldValue(
                            "goal",
                            initialWaypointFetchGoal
                          )
                        : e.value === "waypoint-exploration"
                        ? addTaskForm.setFieldValue(
                            "goal",
                            initialWaypointExplorationGoal
                          )
                        : e.value === "kill"
                        ? addTaskForm.setFieldValue("goal", initialKillGoal)
                        : e.value === "survival"
                        ? addTaskForm.setFieldValue("goal", initialSurvivalGoal)
                        : null;
                    }}
                    errors={addTaskForm.errors?.type}
                    placeholder="Select task type"
                  />
                </div>
              </div>
              {taskType === "fetch" ? (
                <FetchTaskGoals addForm={addTaskForm} />
              ) : taskType === "waypoint-exploration" ? (
                <WaypointExplorationGoals addForm={addTaskForm} />
              ) : taskType === "waypoint-fetch" ? (
                <WaypointFetchGoals addForm={addTaskForm} />
              ) : taskType === "kill" ? (
                <KillTaskGoals addForm={addTaskForm} />
              ) : taskType === "survival" ? (
                <SurvivalTaskGoals addForm={addTaskForm} />
              ) : null}
              <TaskRewards addForm={addTaskForm} />

              <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
                <p className="fs-5 mb-1 text-gray-600">Extra Rewards</p>

                <IoAddCircleOutline
                  color="white"
                  size={28}
                  onClick={() => {
                    setExtraRewardsLength(extraRewardsLength + 1);
                    // addItemForm.setFieldValue("craftingRewards", [
                    //   ...addItemForm.values.craftingRewards,
                    //   { resource: "", quantity: 1 },
                    // ]);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="row">
                {_.range(extraRewardsLength).map((i) => (
                  <React.Fragment key={`item${i}`}>
                    <div className="col-sm-6">
                      <SelectDropdown
                        // options={rewardOptions}
                        placeholder="select resource"
                        label="resource"
                        // value={rewardOptions?.find(
                        //   (t) =>
                        //     t.value ===
                        //       addItemForm.values.craftingRewards[i].resource &&
                        //     addItemForm.values.craftingRewards[i].resource
                        // )}
                        // onChange={(e) =>
                        //   addItemForm.setFieldValue(
                        //     `craftingRewards[${i}].resource`,
                        //     e.value
                        //   )
                        // }
                      />
                    </div>
                    <div className="col-sm-5">
                      <Input
                        label="Quantity"
                        type="number"
                        name={`craftingRewards[${i}].quantity`}
                        // value={addItemForm.values.craftingRewards[i]?.quantity}
                        // onChange={addItemForm.handleChange}
                      />
                    </div>

                    <div className="col-sm-1 align-self-center">
                      <IoRemoveCircleOutline
                        color="white"
                        size={28}
                        onClick={() => {
                          setExtraRewardsLength(extraRewardsLength - 1);
                          // addItemForm.values.craftingRewards.splice(i, 1);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
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
