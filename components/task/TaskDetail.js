import Loader from "components/Loader.component";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getTasksById } from "services/tasks.service";
import {
  FetchTaskGoals,
  KillTaskGoals,
  SurvivalTaskGoals,
  WaypointExplorationGoals,
  WaypointFetchGoals,
} from "./all-goals";
import { TaskRewards } from "./all-rewards";
import Input from "components/common/formComponent/Input";

const category = "taskStatic";

const TaskDetail = (props) => {
  const [taskType, setTaskType] = useState(null);
  const viewTaskForm = useFormik({});
  //:: Call Get Api
  useEffect(() => {
    getTasksById(props.id).then((res) => {
      viewTaskForm.setValues(res.data);
      setTaskType(res.data.type);
    });
  }, [props.id]);

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
            Task Detail
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              {viewTaskForm.values ? (
                <>
                  <div className="row">
                    <div className="col-sm-6">
                      <Input
                        disabled
                        className="border-0 bg-transparent"
                        onChange={viewTaskForm.handleChange}
                        label="name"
                        name="name"
                        value={viewTaskForm.values.name}
                        errors={viewTaskForm.errors.name}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Input
                        disabled
                        className="border-0 bg-transparent"
                        onChange={viewTaskForm.handleChange}
                        label="sequence"
                        name="sequence"
                        value={viewTaskForm.values.sequence}
                        errors={viewTaskForm.errors.sequence}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Input
                        disabled
                        className="border-0 bg-transparent"
                        onChange={viewTaskForm.handleChange}
                        label="description"
                        name="description"
                        value={viewTaskForm.values.description}
                        errors={viewTaskForm.errors.description}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Input
                        className="border-0 bg-transparent text-capitalize"
                        value={viewTaskForm.values.giver}
                        disabled
                        label="Giver"
                      />
                    </div>
                    <div className="col-sm-6">
                      <Input
                        className="border-0 bg-transparent text-capitalize"
                        label="Task Type"
                        value={viewTaskForm.values.type}
                        disabled
                      />
                    </div>
                  </div>
                  {taskType === "fetch" ? (
                    <FetchTaskGoals addForm={viewTaskForm} isView={true} />
                  ) : taskType === "waypoint-exploration" ? (
                    <WaypointExplorationGoals
                      addForm={viewTaskForm}
                      isView={true}
                    />
                  ) : taskType === "waypoint-fetch" ? (
                    <WaypointFetchGoals addForm={viewTaskForm} isView={true} />
                  ) : taskType === "kill" ? (
                    <KillTaskGoals addForm={viewTaskForm} isView={true} />
                  ) : taskType === "survival" ? (
                    <SurvivalTaskGoals addForm={viewTaskForm} isView={true} />
                  ) : null}
                  <TaskRewards addForm={viewTaskForm} isView={true} />
                </>
              ) : (
                <Loader />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <div className="action-button d-flex justify-content-start pt-6 gap-2">
              <button
                onClick={props.onHide}
                className="bg-transparent border-0 text-white fw-bold text-lg text-uppercase"
              >
                ok
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default TaskDetail;
