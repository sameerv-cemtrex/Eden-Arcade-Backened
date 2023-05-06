import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import React, { useState, useEffect } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import _ from "lodash";
import { getAllItems } from "services/items.service";

export const TaskRewards = (props) => {
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
                <IoRemoveCircleOutline
                  color="white"
                  size={28}
                  onClick={() => {
                    setLength(arrlength - 1);
                    props.addForm.values.rewards.splice(i, 1);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const resourceOptions = [
  { label: "Metal", value: "metal" },
  { label: "Rare Metal", value: "rareMetal" },
  { label: "Water", value: "water" },
  { label: "Energy", value: "energy" },
];

export const ExtraRewards = (props) => {
  const [extraRewardsLength, setExtraRewardsLength] = useState(
    props.addTaskForm.values.extraRewards.length
  );
  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Extra Rewards</p>

        <IoAddCircleOutline
          color="white"
          size={28}
          onClick={() => {
            setExtraRewardsLength(extraRewardsLength + 1);
            props.addTaskForm.setFieldValue("extraRewards", [
              ...props.addTaskForm.values.extraRewards,
              { resource: "", quantity: 1 },
            ]);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="row">
        {_.range(extraRewardsLength).map((i) => (
          <React.Fragment key={`item${i}`}>
            <div className="col-sm-6">
              <SelectDropdown
                options={resourceOptions}
                placeholder="select resource"
                label="resource"
                value={resourceOptions?.find(
                  (t) =>
                    t.value ===
                      props.addTaskForm.values.extraRewards[i]?.resource &&
                    props.addTaskForm.values.extraRewards[i]?.resource
                )}
                onChange={(e) =>
                  props.addTaskForm.setFieldValue(
                    `extraRewards[${i}].resource`,
                    e.value
                  )
                }
              />
            </div>
            <div className="col-sm-5">
              <Input
                label="Quantity"
                type="number"
                name={`extraRewards[${i}].quantity`}
                value={props.addTaskForm.values.extraRewards[i]?.quantity}
                onChange={props.addTaskForm.handleChange}
              />
            </div>

            <div className="col-sm-1 align-self-center">
              <IoRemoveCircleOutline
                color="white"
                size={28}
                onClick={() => {
                  setExtraRewardsLength(extraRewardsLength - 1);
                  props.addTaskForm.values.extraRewards.splice(i, 1);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const statOptions = [
  {
    label: "Player Progression",
    value: "playerProgression",
  },
];

export const StatRewards = (props) => {
  const [statRewardsLength, setStatRewardsLength] = useState(
    props.addTaskForm.values.statRewards.length
  );

  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Stat Rewards</p>

        <IoAddCircleOutline
          color="white"
          size={28}
          onClick={() => {
            setStatRewardsLength(statRewardsLength + 1);
            props.addTaskForm.setFieldValue("statRewards", [
              ...props.addTaskForm.values.statRewards,
              { resource: "", quantity: 1 },
            ]);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="row">
        {_.range(statRewardsLength).map((i) => (
          <React.Fragment key={`item${i}`}>
            <div className="col-sm-6">
              <SelectDropdown
                options={statOptions}
                placeholder="select resource"
                label="resource"
                value={statOptions?.find(
                  (t) =>
                    t.value ===
                      props.addTaskForm.values.statRewards[i]?.resource &&
                    props.addTaskForm.values.statRewards[i]?.resource
                )}
                onChange={(e) =>
                  props.addTaskForm.setFieldValue(
                    `statRewards[${i}].resource`,
                    e.value
                  )
                }
              />
            </div>
            <div className="col-sm-5">
              <Input
                label="Quantity"
                type="number"
                name={`statRewards[${i}].quantity`}
                value={props.addTaskForm.values.statRewards[i]?.quantity}
                onChange={props.addTaskForm.handleChange}
              />
            </div>

            <div className="col-sm-1 align-self-center">
              <IoRemoveCircleOutline
                color="white"
                size={28}
                onClick={() => {
                  setStatRewardsLength(statRewardsLength - 1);
                  props.addTaskForm.values.statRewards.splice(i, 1);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
