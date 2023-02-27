function Input(props) {
  const { className, placeholder, name, label, value, errors, type } = props;
  return (
    <div className="col-3 mb-3">
      <div className="form-field position-relative">
        <label
          htmlFor={name}
          className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
        >
          {label}
        </label>
        <input
          className={`w-100  ${className}`}
          placeholder={placeholder}
          name={name}
          value={value}
          {...props}
        />
        <p className="text-sm text-danger">{errors}</p>
      </div>
    </div>
  );
}

export default Input;
