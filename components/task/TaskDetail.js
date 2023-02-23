import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getCategoryStatById } from "services/stats.service";

const category = "taskStatic";

const TaskDetail = (props) => {
  const [data, setData] = useState(null);

  //:: Call Get Api
  useEffect(() => {
    getCategoryStatById(category, props.id).then((res) => setData(res.message));
  }, [props.id]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="model-box"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Task Detail
          </Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <div className="model-content p-0">
              {data ? (
                <>
                  <div className="d-grid">
                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Id</label>
                        <p className="m-0">{data.id}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Name</label>
                        <p className="m-0">{data.name}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Desc</label>
                        <p className="m-0">{data.desc}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Type</label>
                        <p className="m-0"> {data.type}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Giver</label>
                        <p className="m-0">{data.giver}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Goal</label>
                        <p className="m-0"> {data.goal} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
                        <label className="mb-1 fw-bold">Reward</label>
                        <p className="m-0"> {data.reward}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-light p-2 border rounded">
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
