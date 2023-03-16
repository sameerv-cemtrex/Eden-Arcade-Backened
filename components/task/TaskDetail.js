import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getCategoryStatById } from "services/stats.service";

const category = "taskStatic";

const TaskDetail = (props) => {
  const [data, setData] = useState(null);

  //:: Call Get Api
  useEffect(() => {
    getCategoryStatById(category, props.id).then((res) => setData(res.data));
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
            <div className="model-content p-0">
              {data ? (
                <>
                  <div className="d-grid">
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Id</label>
                        <p className="m-0">{data.id}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Name</label>
                        <p className="m-0">{data.name}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Desc</label>
                        <p className="m-0">{data.desc}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Type</label>
                        <p className="m-0"> {data.type}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Giver</label>
                        <p className="m-0">{data.giver}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Goal</label>
                        <p className="m-0"> {data.goal} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Reward</label>
                        <p className="m-0"> {data.reward}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Experience</label>
                        <p className="m-0"> {data.exp}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Loader />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="action-button d-flex justify-content-start pt-6 gap-2">
              <button
                onClick={props.onHide}
                className="btn btn-secondary btn-fw text-uppercase"
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
