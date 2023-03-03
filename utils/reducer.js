/**
 *
 * @param {Object} state
 * @param {String} action
 * @returns updated state
 */

export const actionType = {
  SET_FORM_VALUE: "SET_FORM_VALUE",
  SET_ERRORS: "SET_ERRORS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_FORM_VALUE:
      return {
        ...state,
        form: action.payload,
      };
    case actionType.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
