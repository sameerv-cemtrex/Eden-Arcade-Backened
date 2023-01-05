function Input(props) {
  const {className, placeholder, name, value, onchangeHandler, errors, type} = props;
  return (
    <>
    <input
        type={type}
        className={className}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onchangeHandler}
      />
      <p className='error'>{errors}</p>
    </>
  )
}

export default Input