import React from 'react';

const EditButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-yellow-500 text-white px-10 py-2 rounded">
      Edit
    </button>
  );
};

export default EditButton;
