import React, { useEffect, useReducer, useRef, useState } from 'react'
import TransactionModal from '../components/TransactionModelBox.jsx';
import TransactionTable from '../components/TransactionTable.jsx';
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

  const handleDelete = async (transactionId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_IP}/api/finance/deletetransaction/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to delete the transaction");
      }

      // Filter out the deleted transaction from the state
      setTransactionsData((prevTransactions) =>
        prevTransactions.filter(transaction => transaction._id !== transactionId)
      );

      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };


  return (
    <div className="flex flex-col w-full">

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transactionsData={transactionsData}
        setTransactionsData={setTransactionsData}
      />

      <div className="relative top-0 flex justify-center items-center flex-1 w-full">
        <TransactionTable transactionsData={transactionsData} openModal={openModal} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Dashboard