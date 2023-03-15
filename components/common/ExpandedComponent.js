import _ from "lodash";

/**
 * A custom component for the expandable table rows
 * @param {*} {data}, array of excluded keys
 *  */
const ExpandedComponent = ({ data }, excluded) => (
  <div className="d-flex flex-wrap pe-4 ps-5 pt-3">
    {Object.keys(data).map((item) => {
      if (!_.includes(excluded, item) && item !== "resources") {
        return (
          <div className=" py-3 border-bottom border-secondary px-4">
            <p className="text-gray-800">
              {item.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
              })}
            </p>
            <p className="mb-0 text-white">{data[item]}</p>
          </div>
        );
      }
    })}
  </div>
);

export default ExpandedComponent;
