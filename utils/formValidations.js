import React from 'react';
import validator from 'validator';

let US_STATES = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

const required = (value) => {
  if (!value || !value.toString().trim().length) {
    return `Field is required`;
  }
};

const email = (value) => {
  value = value === null ? '' : value;
  if (!validator.isEmail(value)) {
    return `Invalid email address.`;
  }
};

const zipcode = (value) => {
  if (!(validator.isInt(value) && validator.isLength(value, { min: 5, max: 5 }))) {
    return `Invalid zip code.`;
  }
};

const minLength = (value, props) => {
  value = value === null ? '' : value;
  if (value.toString().trim().length < props.minLength) {
    return `Field must contains minimum ${props.minLength} characters.`;
  }
};

const maxLength = (value, props) => {
  value = value === null ? '' : value;
  if (value.toString().trim().length > props.maxLength) {
    return `Please enter the data up to ${props.maxLength} characters.`;
  }
};

const isAlpha = (value) => {
  value = value === null ? '' : value;
  if (!validator.isAlpha(value)) {
    return `Field must contains alphabets only.`;
  }
}

const isAlphaSpace = (value) => {
  var regex  = /^[a-zA-Z ]*$/;
  if (!regex.test(value)){
    return `Field must contains alphabets only.`;
  }
}

const isMobile = (value) => {
  value = value === null ? '' : value;
  if (value.toString().trim().length > 0) {
    if (!validator.isNumeric(value) || value.toString().trim().length > 10 || value.toString().trim().length < 10) {
      return `Invalid phone number.`;
    }
  }
}

const isNumeric = (value) => {
  var regex  = /^\d*\.?\d*$/;
  if (!regex.test(value)){
    return `Field must numeric.`;
  }
  // if (!isNaN(value)) {
  //   return `Field must numeric.`;
  // }
}

const isMonth = (value) => {
  value = parseInt(value);
  if (value <= 0 || value > 12) {
    return `Invalid Month.`;
  }
}

const isDay = (value) => {
  value = parseInt(value);
  if (value <= 0 || value > 31) {
    return `Invalid Day.`;
  }
}

const isYear = (value) => {
  value = parseInt(value);
  var cuurentDate = new Date();
  var currentYear = cuurentDate.getFullYear() - 21;
  if (value <= 0) {
    return `Invalid year.`;
  } else if(value > currentYear) {
    return `You must be at least 21.`;
  }
}

const isPasswordSame = (newPassword,confirmPassword) => {
  if(newPassword !== confirmPassword){
    return 'Password does not matches.';
  }
}

const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['password'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>
  }
};

const serverSideError = (value, props) => {
  if (props.isServerSide) {
    return <span className="error">{props.isServerSide}</span>;
  }
}

const nameWithSpace = (value) => {
  value = value === null ? '' : value;
  let regExpression = /^[a-zA-Z\s]*$/;

  if (!regExpression.test(value)) {
      return `Field must contains alphabets only.`;
  }
};


Object.defineProperty(required, 'meta_name', { value: 'required' });

export {
  US_STATES,
  required,
  email,
  password,
  minLength,
  maxLength,
  serverSideError,
  zipcode,
  isAlpha,
  isAlphaSpace,
  isMobile,
  isNumeric,
  isMonth,
  isDay,
  isYear,
  isPasswordSame,
  nameWithSpace
};
