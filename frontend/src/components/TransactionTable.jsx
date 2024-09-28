import React, { useEffect, useState } from 'react';

const TransactionTable = ({transactionsData}) => {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 border-b">Type</th>
            <th className="py-3 px-4 border-b">Source</th>
            <th className="py-3 px-4 border-b">Custom Source</th>
            <th className="py-3 px-4 border-b">Remark</th>
            <th className="py-3 px-4 border-b">Debit</th>
            <th className="py-3 px-4 border-b">Credit</th>
          </tr>
        </thead>
        <tbody>
          {transactionsData.map((transaction, index) => (
            <tr key={index} className={transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'}>
              <td className="py-2 px-4 border-b">{transaction.type}</td>
              <td className="py-2 px-4 border-b">{transaction.source}</td>
              <td className="py-2 px-4 border-b">{transaction.customSource}</td>
              <td className="py-2 px-4 border-b">{transaction.remark}</td>
              <td className="py-2 px-4 border-b text-right">{transaction.debit.toFixed(2)}</td>
              <td className="py-2 px-4 border-b text-right">{transaction.credit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
