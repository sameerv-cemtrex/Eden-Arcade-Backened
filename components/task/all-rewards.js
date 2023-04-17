import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import React, { useState, useEffect } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import _ from "lodash";
import { getAllItems } from "services/items.service";

const TaskRewards = (props) => {
  const [options, setOptions] = useState(null);
  const [arrlength, setLength] = useState(props.addForm.values.rewards.length);

  useEffect(() => {
    getAllItems().then((res) => setOptions(res.data));
  }, []);

  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Rewards</p>
        {!props.isView && (
          <IoAddCircleOutline
            color="white"
            size={28}
            onClick={() => {
              setLength(arrlength + 1);
              props.addForm.setFieldValue("rewards", [
                ...props.addForm.values.rewards,
                { item: "", quantity: 1 },
              ]);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div className="row">
        {_.range(arrlength).map((i) => (
          <React.Fragment key={`item${i}`}>
            <div className="col-sm-6">
              {props.isView ? (
                <Input
                  value={props.addForm.values.rewards[i].item}
                  label="item name"
                  disabled
                  className="border-0 bg-transparent"
                />
              ) : (
                <SelectDropdown
                  options={options}
                  placeholder="select reward item"
                  label="item name"
                  getOptionLabel={(o) => o.name}
                  getOptionValue={(o) => o.name}
                  isLoading={!options}
                  value={options?.find(
                    (t) =>
                      t.name === props.addForm.values.rewards[i].item &&
                      props.addForm.values.rewards[i].item
                  )}
                  onChange={(e) =>
                    props.addForm.setFieldValue(`rewards[${i}].item`, e.name)
                  }
                />
              )}
            </div>
            <div className="col-sm-5">
              <Input
                label="Quantity"
                type="number"
                name={`rewards[${i}].quantity`}
                disabled={props.isView && true}
                className={props.isView && "border-0 bg-transparent"}
                value={props.addForm.values.rewards[i]?.quantity}
                onChange={props.addForm.handleChange}
              />
            </div>
            {!props.isView && (
              <div className="col-sm-1 align-self-center">
                {arrlength > 1 && (
                  <IoRemoveCircleOutline
                    color="white"
                    size={28}
                    onClick={() => {
                      setLength(arrlength - 1);
                      props.addForm.values.rewards.splice(i, 1);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
export default TaskRewards;
