import Input from "components/common/formComponent/Input";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { getDomeSalesById } from "services/dome-sales.service";
import Loader from "components/Loader.component";
import dayjs from "dayjs";

const ViewNftPrefab = (props) => {
  const viewSaleItemForm = useFormik({});

  useEffect(() => {
    getDomeSalesById(props.id).then((res) =>
      viewSaleItemForm.setValues(res.data)
    );
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
            View NFT Prefab
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-black border-start border-end  border-secondary">
            <div className="model-content">
              {viewSaleItemForm.values ? (
                <div className="row">
                  {Object.keys(viewSaleItemForm.values).map((item) => {
                    if (!_.includes(["__v", "_id", "id"], item))
                      return (
                        <div className="col-sm-6" key={item}>
                          <Input
                            label={item}
                            onChange={viewSaleItemForm.handleChange}
                            name={item}
                            className="border-0 bg-transparent"
                            value={
                              item === "item"
                                ? viewSaleItemForm.values[item].name
                                : _.includes(["startTime", "endTime"], item)
                                ? dayjs(viewSaleItemForm.values[item]).format(
                                    "DD-MM-YYYY HH:mm"
                                  )
                                : viewSaleItemForm.values[item]
                            }
                            errors={viewSaleItemForm.errors[item]}
                          />
                        </div>
                      );
                  })}
                </div>
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

export default ViewNftPrefab;
