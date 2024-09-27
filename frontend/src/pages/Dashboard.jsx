import React, { useEffect, useReducer, useRef, useState } from 'react'
import TransactionModal from '../components/TransactionModelBox';
import TransactionTable from '../components/TransactionTable';
const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleTransactionSubmit = (formData) => {
    console.log('Transaction Data Submitted:', formData);
    // Add transaction logic here
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <button
        onClick={openModal}
        className="absolute top-4 right-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Transaction
      </button>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTransactionSubmit}
      />

      <div className="flex justify-center items-center flex-1">
        <TransactionTable />
      </div>
    </div>
  );
}

export default Dashboard