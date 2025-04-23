import React from 'react';
import AddGoalModalApp from './AddGoalModal';
import AddMetricModal from './AddMetricModal';
import { view } from '@forge/bridge';

const context = await view.getContext();

const App = () => {
  const [modalType , setModalType] = React.useState(context.extension.modal.modalType);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditional render for modal */}
      {modalType === 'add-metric' && <AddMetricModal />}
      {modalType === 'add-goal' && <AddGoalModalApp />}
    </div>
  );
};

export default App;
