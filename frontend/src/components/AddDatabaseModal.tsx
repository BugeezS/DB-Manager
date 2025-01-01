import React from "react";

interface AddDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDatabaseModal: React.FC<AddDatabaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Database</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="mb-4">
            {/* Add your form fields here */}
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Database name"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
