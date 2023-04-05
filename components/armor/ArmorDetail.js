import Loader from "components/Loader.component";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getCategoryStatById } from "services/stats.service";

const category = "armorStatic";

const ArmorDetail = (props) => {
  const [data, setData] = useState();

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
            Armor Detail
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
                        <p className="m-0 text-white">{data.id}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Name</label>
                        <p className="m-0 text-white">{data.name}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Type</label>
                        <p className="m-0 text-white"> {data.type}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Weight</label>
                        <p className="m-0 text-white">{data.weight}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">shield</label>
                        <p className="m-0 text-white"> {data.shield} </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Experience</label>
                        <p className="m-0 text-white"> {data.exp}</p>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-0 bg-black p-2">
                        <label className="mb-1 fw-bold">Description</label>
                        <p className="m-0 text-white">{data.desc}</p>
                      </div>
                    </div>
                  </div>
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

export default ArmorDetail;
