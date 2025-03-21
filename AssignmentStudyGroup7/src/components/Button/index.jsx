import React from 'react';
import classNames from 'classnames';

const index = ({message, color, type = '', onClick, disabled = false}) => {
  const styleButton = classNames(`rounded-lg px-4 py-2 text-white `, {
    'btn-green': color == 'green' && !disabled,
    'btn-red': color == 'red' && !disabled,
    'btn-blue': color == 'blue' && !disabled,
    'btn-disable': disabled,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styleButton}
    >
      {message}
    </button>
  );
};

export default index;
