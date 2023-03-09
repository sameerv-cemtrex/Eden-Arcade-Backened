import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#eee",
    padding: "3px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected || isFocused ? "#616075" : undefined,
      color: isFocused || isSelected ? "white" : "black",
    };
  },
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
      <label className="block mb-1 text-capitalize text-tiny leading-4 font-semibold w-100">
        {props.label}
      </label>
      <Select components={makeAnimated()} {...props} styles={colourStyles} />
    </div>
  );
}

export default SelectDropdown;
