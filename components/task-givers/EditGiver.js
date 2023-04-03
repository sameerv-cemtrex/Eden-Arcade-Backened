import Input from "components/common/formComponent/Input";
import Loader from "components/Loader.component";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { editItems, getItemsById } from "services/items.service";
import {
  editTaskGivers,
  getTaskGiversById,
} from "services/task-givers.service";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validation = z.object({
  name: z.string(),
  photo: z.string(),
  about: z.string(),
  taskGiverId: z.string(),
  priority: z.number().nonnegative(),
  totalTasks: z.number().nonnegative(),
});

function EditGiver(props) {
  const editGiverForm = useFormik({
    validationSchema: toFormikValidationSchema(validation),
    onSubmit: (data) => {
      editTaskGivers(props.id, data).then((res) => {
        props.onClose();
      });
    },
  });

  useEffect(() => {
    getTaskGiversById(props.id).then((res) =>
      editGiverForm.setValues(res.data)
    );
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
          Edit Task Giver
        </Modal.Title>
      </Modal.Header>

      <form>
        <Modal.Body className="bg-black border-start border-end  border-secondary">
          {editGiverForm.values ? (
            <div className="model-content mx-3">
              <div className="row">
                {Object.keys(editGiverForm.values).map((item) => {
                  const excludes = [
                    "__v",
                    "_id",
                    "id",
                    "createdAt",
                    "updatedAt",
                    "itemId",
                  ];
                  const changeTypeKeys = ["totalTasks", "priority"];
                  if (!_.includes(excludes, item)) {
                    return (
                      <div className="col-md-6">
                        <Input
                          label={item
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase();
                            })}
                          name={item}
                          value={editGiverForm.values[item]}
                          type={
                            !_.includes(changeTypeKeys, item)
                              ? "text"
                              : "number"
                          }
                          errors={editGiverForm.errors[item]}
                          onChange={editGiverForm.handleChange}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-black border-start border-end border-bottom border-secondary rounded-0 justify-content-around pt-5">
          <button
            type="submit"
            onClick={editGiverForm.handleSubmit}
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

export default EditGiver;
