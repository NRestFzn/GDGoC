import React from 'react';

const Input = ({placeholder, name, type, value, onChange}) => {
  return (
    <input
      className="outline-0 shadow-md w-full bg-white p-[10px] rounded-md"
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
