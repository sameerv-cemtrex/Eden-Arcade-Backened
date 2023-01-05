/* eslint-disable default-case */
import {
    required,
    email,
    minLength,
    maxLength,
    isAlpha,
    isAlphaSpace,
    isMobile,
    isNumeric,
    isMonth,
    isDay,
    isYear,
    isPasswordSame,
    nameWithSpace
} from '@/utils/formValidations';
const validateAll = (form) => {
    let formErrors = {};
    Object.keys(form).forEach(function (key) {
        if (form[key].hasOwnProperty('rules')) {
            let rulesData = form[key].rules;
            let messages = {};
            let errors = [];
            if (form[key].hasOwnProperty('messages')) {
                messages = form[key].messages;
            }

            rulesData.forEach(function (item) {
                if (item.includes('min:')) {
                    let validationValue = 1;
                    let arr = item.split(':');
                    if (arr.length > 1) {
                        validationValue = arr[1];
                    }

                    let errorMessage = minLength(form[key].value, { minLength: validationValue });
                    if (errorMessage) {
                        if (messages.hasOwnProperty('min')) {
                            errors.push(messages.min);
                        } else {
                            errors.push(errorMessage);
                        }
                    }
                } else if (item.includes('max:')) {
                    let validationValue = 10;
                    let arr = item.split(':');
                    if (arr.length > 1) {
                        validationValue = arr[1];
                    }

                    let errorMessage = maxLength(form[key].value, { maxLength: validationValue });
                    if (errorMessage) {
                        if (messages.hasOwnProperty('max')) {
                            errors.push(messages.max);
                        } else {
                            errors.push(errorMessage);
                        }
                    }
                } else {
                    let errorMessage = null;
                    switch (item) {
                        case 'required':
                            errorMessage = required(form[key].value);
                            break;
                        case 'alpha':
                            errorMessage = isAlpha(form[key].value);
                            break;
                        case 'alphaSpace':
                            errorMessage = isAlphaSpace(form[key].value);
                            break;
                        case 'phoneNumber':
                            errorMessage = isMobile(form[key].value);
                            break;
                        case 'email':
                            errorMessage = email(form[key].value);
                            break;
                        case 'numeric':
                            if (form[key].value) {
                                errorMessage = isNumeric(form[key].value);
                            }
                            break;
                        case 'month':
                            if (form[key].value) {
                                errorMessage = isMonth(form[key].value);
                            }
                            break;
                        case 'day':
                            if (form[key].value) {
                                errorMessage = isDay(form[key].value);
                            }
                            break;
                        case 'year':
                            if (form[key].value) {
                                errorMessage = isYear(form[key].value);
                            }
                            break;
                        case 'confirm_password':
                            if (form[key].value) {
                                errorMessage = isPasswordSame(form['password'].value, form[key].value);
                            }
                            break;
                        case 'name_with_space':
                            if (form[key].value) {
                                errorMessage = nameWithSpace(form[key].value);
                            }
                            break;
                    }

                    if (errorMessage) {
                        if (messages.hasOwnProperty(item)) {
                            errors.push(messages[item]);
                        } else {
                            errors.push(errorMessage);
                        }
                    }
                }
            });

            if (errors.length > 0) {
                formErrors[key] = errors;
            }
        }
    });
    return formErrors;
};

export {
    validateAll
};