import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useReducer, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addCategoryStat } from "services/stats.service";
import { taskInitialData } from "utils/initialFormData";
import reducer, { actionType } from "utils/reducer";
import { validateAll } from "utils/validateForm";

const category = "taskStatic";

const initialState = {
  form: taskInitialData,
  errors: {},
};

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

const fetchGoal = {
  id: 1,
};

const AddTask = (props) => {
  const addTaskForm = useFormik({
    initialValues: {
      giver: "doctor",
      type: "fetch",
      goals: [],
      rewards: [],
    },
    onSubmit: (data) => {},
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
            {/* <div className="model-content">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <Input
                    label="Name"
                    errors={errors.name ? errors.name[0] : null}
                    name="name"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <Input
                    label="Desc"
                    errors={errors.desc ? errors.desc[0] : null}
                    name="desc"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <Input
                    label="Type"
                    type="number"
                    errors={errors.type ? errors.type[0] : null}
                    name="type"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <Input
                    label="Giver"
                    type="number"
                    errors={errors.giver ? errors.giver[0] : null}
                    name="giver"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <Input
                    label="Goal"
                    type="number"
                    errors={errors.goal ? errors.goal[0] : null}
                    name="goal"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <Input
                    label="Reward"
                    type="number"
                    errors={errors.reward ? errors.reward[0] : null}
                    name="reward"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <Input
                    label="Exp"
                    type="number"
                    errors={errors.exp ? errors.exp[0] : null}
                    name="exp"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div> */}

            <div className="model-content">
              <div className="row">
                <div className="col-sm-6">
                  <SelectDropdown
                    options={GiverOptions}
                    onChange={(e) => addTaskForm.setValues("giver", e.value)}
                    label="Giver"
                    placeholder="Select Giver"
                  />
                </div>
                <div className="col-sm-6">
                  <SelectDropdown
                    options={TaskTypeOptions}
                    label="Task Type"
                    placeholder="Select task type"
                  />
                </div>
              </div>
              <p className="fs-5 mb-1 mt-3 text-gray-600">Goals</p>
              <div className="row">
                {Object.keys(fetchGoal).map((item) => (
                  <div className="col-sm-6">
                    <Input label={item} />
                  </div>
                ))}
              </div>

              <p className="fs-5 mb-1 mt-3 text-gray-600">Rewards</p>
              <div className="row">
                {Object.keys(fetchGoal).map((item) => (
                  <div className="col-sm-6">
                    <Input label={item} />
                  </div>
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
