import React, { useState } from 'react';
import { view, invoke } from '@forge/bridge';

const context = await view.getContext();

export const AddGoalModalApp = () => {
  const [modalTitle, setModalTitle] = useState(context.extension.modal.modalTitle);
  const [id, setId] = useState(context.extension.modal.id);
  const [name, setName] = useState(context.extension.modal.name);
  const [description, setDescription] = useState(context.extension.modal.description);
  const [targetDate, setTargetDate] = useState(context.extension.modal.targetDate);
  const [progress, setProgress] = useState(context.extension.modal.progress);

  const deleteButton = context.extension.modal.deleteButton;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id,
      name,
      description,
      targetDate,
      progress,
    };
    view.close(payload);
  };

  const handleCancel = () => {
    view.close();
  };

  const handleDelete = async (e) => {
    // e.preventDefault();
    
    const payload = {
      id: context.extension.modal.id
    };
    
    await invoke('delete-user-goal', payload);
    view.close({ ...payload, delete: true });
  }

  return (
    <div className="p-6 font-sans text-sm">
      <h3 className="text-lg font-semibold mb-4">{modalTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-2 border-t border-gray-500 py-3 text-gray-600">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border rounded p-3"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border rounded p-3"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full border rounded p-3"
        />
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          placeholder="Progress (%)"
          className="w-full border rounded p-3"
        />

        <div className="flex justify-between mt-4">
          <div>
            {deleteButton && (
              <button
                type="button"
                onClick={() => handleDelete()}
                className="text-sm px-4 m-2 py-2 border border-red-600 rounded hover:bg-gray-100"
              >
                <span className="text-red-600">Delete</span>
              </button>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm px-4 m-2 py-2 border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm px-4 m-2 py-2 border text-white rounded hover:bg-blue-500 bg-blue-100"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGoalModalApp;
