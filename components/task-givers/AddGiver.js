import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from "zod";
import { addTaskGivers } from "services/task-givers.service";

const validation = z.object({
  name: z.string(),
  photo: z.string(),
  about: z.string(),
  taskGiverId: z.string(),
  priority: z.number().nonnegative(),
  totalTasks: z.number().nonnegative(),
});

const AddGiver = (props) => {
  const addGiverForm = useFormik({
    initialValues: {
      name: "",
      photo: "",
      about: "",
      taskGiverId: "",
      priority: 5,
      totalTasks: 20,
    },
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      addTaskGivers(data).then((res) => {
        props.onClose();
      });
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
            Add Task Giver
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              <div className="row">
                {Object.keys(addGiverForm.values).map((item) => (
                  <div className="col-sm-6">
                    <Input
                      label={item}
                      onChange={addGiverForm.handleChange}
                      name={item}
                      type={
                        !_.includes(["totalTasks", "priority"], item)
                          ? "text"
                          : "number"
                      }
                      errors={addGiverForm.errors[item]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
            <button
              type="submit"
              onClick={addGiverForm.handleSubmit}
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

export default AddGiver;
