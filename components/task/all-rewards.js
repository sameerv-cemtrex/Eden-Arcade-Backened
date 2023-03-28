import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import _ from "lodash";

const TaskTypeOptions = [
  { value: "fetch", label: "Fetch" },
  { value: "waypoint", label: "Waypoint" },
  { value: "kill", label: "Kill" },
  { value: "survival", label: "Survival" },
];

export const FetchTaskRewards = (props) => {
  const [options, setOptions] = useState(TaskTypeOptions);
  const [arrlength, setLength] = useState(1);
  useEffect(() => {}, []);

  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Rewards</p>
        <IoAddCircleOutline
          color="white"
          size={28}
          onClick={() => setLength(arrlength + 1)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="row">
        {_.range(arrlength).map((i) => (
          <>
            <div className="col-sm-6">
              <SelectDropdown
                options={options}
                placeholder="select reward item"
                label="item name"
                onChange={(e) =>
                  props.addForm.setFieldValue(`rewards[${i}].name`, e.value)
                }
              />
            </div>
            <div className="col-sm-6">
              <Input
                label="Quantity"
                type="number"
                name={`rewards[${i}].quantity`}
                value={props.addForm.values.rewards[i]?.quantity || 0}
                onChange={props.addForm.handleChange}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
};
