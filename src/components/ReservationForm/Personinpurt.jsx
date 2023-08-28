import React, { useState } from 'react';

const PersonInput = ({ label, onChange }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onChange(count - 1);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold">{label}</label>
      <div className="flex items-center">
        <button
        type='button'
          className="px-4 py-2 border rounded-l"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="px-4 py-2 border-t border-b">
          {count}
        </span>
        <button
        type='button'
          className="px-4 py-2 border rounded-r"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PersonInput;