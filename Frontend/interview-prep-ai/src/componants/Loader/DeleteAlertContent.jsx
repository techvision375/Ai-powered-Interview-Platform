import React from 'react';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5 bg-amber-50">
      <p className="text-[14px]">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;