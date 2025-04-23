import React, { useState } from 'react';
import { view, invoke } from '@forge/bridge';

const context = await view.getContext();

export const AddMetricModal = () => {
  const [modalTitle, setModalTitle] = useState(context.extension.modal.modalTitle);
  const [id, setId] = useState(context.extension.modal.id);
  const [name, setName] = useState(context.extension.modal.name);
  const [completed, setCompleted] = useState(context.extension.modal.completed);
  const [remaining, setRemaining] = useState(context.extension.modal.remaining);

  const deleteButton = context.extension.modal.deleteButton;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        id,
        name,
        completed,
        remaining,
    };
    console.log('AddMetricModal submitted with', payload);
    view.close(payload);
  };

  const handleCancel = () => {
    view.close();
  };

  const handleDelete = async (e) => {
    // e.preventDefault();
    console.log('Delete button clicked');
    
    const payload = {
      id: context.extension.modal.id
    };

    console.log('Deleting metric with ID:', payload.id);
    await invoke('delete-metric', payload);
    view.close({ ...payload, delete: true });
  }

  return (
    <div className="p-6 font-sans text-sm">
      <h3 className="text-lg font-semibold mb-4">{modalTitle}</h3>
      <div className="space-y-2 border-t border-gray-500 py-3 text-gray-600">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border rounded p-3"
        />
        <input
          type="number"
          value={completed}
          placeholder="Completed"
          onChange={(e) => setCompleted(e.target.value)}
          className="w-full border rounded p-3"
        />
        <input
          type="number"
          value={remaining}
          placeholder="Remaining"
          onChange={(e) => setRemaining(e.target.value)}
          className="w-full border rounded p-3"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          {deleteButton && (
            <button
              onClick={() => handleDelete()}
              className="text-sm px-4 m-2 py-2 border border-red-600 rounded hover:bg-gray-100"
            >
              <span className="text-red-600">Delete</span>
            </button>
          )}
        </div>

        <div>
          <button
            onClick={handleCancel}
            className="text-sm px-4 m-2 py-2 border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-sm px-4 m-2 py-2 border text-white rounded hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMetricModal;
