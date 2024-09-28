import React, { useEffect, useReducer, useRef, useState } from 'react'
import TransactionModal from '../components/TransactionModelBox';
import TransactionTable from '../components/TransactionTable';
const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [transactionsData , setTransactionsData] = useState([]);
  
  useEffect(()=>{
    getData();
  },[]);

  const getData = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_IP}/api/finance/gettransactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setTransactionsData(result);
       
      } else {
        console.error('Error submitting transaction', response.status);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={openModal}
        className="absolute right-40 bg-blue-500 text-white px-6 py-2 z-10 rounded-lg hover:bg-blue-600"
      >
        Add Transaction
      </button>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setTransactionsData={setTransactionsData}
      />

      <div className="relative top-0 flex justify-center items-center flex-1 w-full">
        <TransactionTable transactionsData={transactionsData} />
      </div>
    </div>
  );
}

export default Dashboard