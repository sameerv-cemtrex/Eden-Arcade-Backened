import Input from "components/common/formComponent/Input";
import SelectDropdown from "components/common/formComponent/SelectDropdown";
import { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import _ from "lodash";
import { getAllItems } from "services/items.service";
import { getAllCategoryStats } from "services/stats.service";
import { getAllLocations } from "services/locations.service";

const TaskTypeOptions = [
  { value: "fetch", label: "Fetch" },
  { value: "waypoint-fetch", label: "Waypoint-Fetch" },
  { value: "waypoint-extraction", label: "Waypoint-Extraction" },
  { value: "kill", label: "Kill" },
  { value: "survival", label: "Survival" },
];

export const FetchTaskGoals = (props) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    getAllItems().then((res) => setOptions(res.data));
  }, []);

  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Goals</p>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.item}
              label="item name"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={options}
              placeholder="select item"
              label="item name"
              getOptionLabel={(o) => o.name}
              getOptionValue={(o) => o.name}
              isLoading={!options}
              value={options?.find(
                (i) =>
                  i.name === props.addForm.values.goal.item &&
                  props.addForm.values.goal.item
              )}
              onChange={(e) => props.addForm.setFieldValue(`goal.item`, e.name)}
              errors={props.addForm.errors.goal?.item}
            />
          )}
        </div>
        <div className="col-sm-6">
          <Input
            label="Quantity"
            type="number"
            className={props.isView && "border-0 bg-transparent"}
            disabled={props.isView && true}
            name={`goal.quantity`}
            value={props.addForm.values.goal?.quantity}
            onChange={props.addForm.handleChange}
          />
        </div>
      </div>
    </>
  );
};

export const WaypointExtractionGoals = (props) => {
  const [options, setOptions] = useState(null);
  const [arrlength, setLength] = useState(1);
  useEffect(() => {
    getAllLocations().then((res) => setOptions(res.data));
  }, []);

  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Goals</p>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.location}
              label="location"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={options}
              getOptionLabel={(o) => o.name}
              getOptionValue={(o) => o.name}
              placeholder="select location"
              label="location"
              isLoading={!options}
              value={options?.find(
                (i) =>
                  i.name === props.addForm.values.goal.location &&
                  props.addForm.values.goal.location
              )}
              onChange={(e) =>
                props.addForm.setFieldValue(`goal.location`, e.name)
              }
              errors={props.addForm.errors.goal?.location}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const WaypointFetchGoals = (props) => {
  const [items, setItems] = useState(null);
  const [locations, setLocations] = useState(null);
  const [arrlength, setLength] = useState(1);
  useEffect(() => {
    getAllItems().then((res) => setItems(res.data));
    getAllLocations().then((res) => setLocations(res.data));
  }, []);
  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Goals</p>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.item}
              label="item name"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={items}
              getOptionLabel={(o) => o.name}
              getOptionValue={(o) => o.name}
              placeholder="select item"
              label="item name"
              isLoading={!items}
              value={items?.find(
                (i) =>
                  i.name === props.addForm.values.goal.item &&
                  props.addForm.values.goal.item
              )}
              onChange={(e) => props.addForm.setFieldValue(`goal.item`, e.name)}
            />
          )}
        </div>

        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.location}
              label="location"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={locations}
              getOptionLabel={(o) => o.name}
              getOptionValue={(o) => o.name}
              placeholder="select location"
              label="location"
              isLoading={!locations}
              value={locations?.find(
                (i) =>
                  i.name === props.addForm.values.goal.location &&
                  props.addForm.values.goal.location
              )}
              onChange={(e) =>
                props.addForm.setFieldValue(`goal.location`, e.name)
              }
            />
          )}
        </div>
        <div className="col-sm-6 mt-3">
          <Input
            label="Quantity"
            type="number"
            className={props.isView && "border-0 bg-transparent"}
            disabled={props.isView && true}
            name={`goal.quantity`}
            value={props.addForm.values.goal.quantity}
            onChange={props.addForm.handleChange}
          />
        </div>
      </div>
    </>
  );
};

const targetOptions = [
  {
    label: "Small Drone",
    value: "smallDrone",
  },
  {
    label: "Medium Drone",
    value: "mediumDrone",
  },
  {
    label: "Large Drone",
    value: "largeDrone",
  },
  {
    label: "Player",
    value: "player",
  },
];
const hitPointOptions = [
  {
    label: "Head",
    value: "head",
  },
  {
    label: "Body",
    value: "body",
  },
  {
    label: "Legs",
    value: "legs",
  },
  {
    label: "Arms",
    value: "Arms",
  },
];
export const KillTaskGoals = (props) => {
  const [target, setTarget] = useState(targetOptions);
  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    getAllItems().then((res) => setWeapon(res.data));
  }, []);
  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Goals</p>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.target}
              label="Target"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={target}
              placeholder="select target"
              label="Target"
              isLoading={!target}
              value={target.find(
                (i) =>
                  i.value === props.addForm.values.goal.target &&
                  props.addForm.values.goal.target
              )}
              onChange={(e) =>
                props.addForm.setFieldValue(`goal.target`, e.value)
              }
            />
          )}
        </div>
        <div className="col-sm-6">
          <Input
            label="Count"
            name={`goal.count`}
            type="number"
            required
            className={props.isView && "border-0 bg-transparent"}
            disabled={props.isView && true}
            value={props.addForm.values.goal?.count}
            onChange={props.addForm.handleChange}
            errors={props.addForm.errors.goal?.count}
          />
        </div>
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.weapon}
              label="Weapon"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={weapon}
              getOptionLabel={(o) => o.name}
              getOptionValue={(o) => o.name}
              isLoading={!weapon}
              value={weapon?.find(
                (i) =>
                  i.name === props.addForm.values.goal.weapon &&
                  props.addForm.values.goal.weapon
              )}
              placeholder="select weapon"
              label="Weapon"
              onChange={(e) =>
                props.addForm.setFieldValue(`goal.weapon`, e.name)
              }
            />
          )}
        </div>
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.hitPoint}
              label="Hit point"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={hitPointOptions}
              placeholder="select hit point"
              label="Hit point"
              isLoading={!hitPointOptions}
              value={hitPointOptions.find(
                (i) =>
                  i.value === props.addForm.values.goal.hitPoint &&
                  props.addForm.values.goal.hitPoint
              )}
              onChange={(e) =>
                props.addForm.setFieldValue(`goal.hitPoint`, e.value)
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

const additionalConditions = [
  { label: "Without drinking water.", value: 1 },
  { label: "Without taking any Damage.", value: 2 },
  {
    label: "Without taking any healing items.",
    value: 3,
  },
  {
    label: "Without eating anything.",
    value: 4,
  },
];

export const SurvivalTaskGoals = (props) => {
  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
        <p className="fs-5 mb-1 text-gray-600">Goals</p>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <Input
            label="Extraction count"
            type="number"
            className={props.isView && "border-0 bg-transparent"}
            disabled={props.isView && true}
            name={`goal.extractionCount`}
            value={props.addForm.values.goal.extractionCount}
            onChange={props.addForm.handleChange}
          />
        </div>
        <div className="col-sm-6">
          {props.isView ? (
            <Input
              value={props.addForm.values.goal.additionalCondition}
              label="Additional Condition"
              disabled
              className="border-0 bg-transparent"
            />
          ) : (
            <SelectDropdown
              options={additionalConditions}
              placeholder="select condition"
              label="Additional Condition"
              isLoading={!additionalConditions}
              value={additionalConditions.find(
                (i) =>
                  i.value === props.addForm.values.goal.additionalCondition &&
                  props.addForm.values.goal.additionalCondition
              )}
              onChange={(e) =>
                props.addForm.setFieldValue(`goal.additionalCondition`, e)
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
