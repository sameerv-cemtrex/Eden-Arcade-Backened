import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#5a5b5b",
    border: "none",
    padding: "3px",
    boxShadow: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected || isFocused ? "#5a5b5b" : "#262626",
      color: isFocused || isSelected ? "white" : "#626366",
    };
  },
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#262626",
    // borderRadius: "20px",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#616075",
    color: "white",
    padding: "1px 3px",
    width: "max-content",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,

    ":hover": {
      backgroundColor: "#ccc",
      color: "#616075",
    },
  }),
};

/**
 * Custom select component.
 *
 * Takes a label and the same params as `react-select`
 */
function SelectDropdown(props) {
  return (
    <div className="position-relative">
      <label className="block mb-1 text-capitalize text-tiny leading-4 fs-6 font-semibold w-100">
        {props.label}
      </label>
      <Select components={makeAnimated()} {...props} styles={colourStyles} />
    </div>
  );
}

export default SelectDropdown;
