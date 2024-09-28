import React, { useState } from 'react';

const TransactionTable = ({ transactionsData }) => {
  // State to store filter values
  const [typeFilter, setTypeFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [minDebitFilter, setMinDebitFilter] = useState('');
  const [maxDebitFilter, setMaxDebitFilter] = useState('');
  const [minCreditFilter, setMinCreditFilter] = useState('');
  const [maxCreditFilter, setMaxCreditFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // State to toggle filter visibility
  const [showFilters, setShowFilters] = useState(true);

  // Function to filter transactions based on filter values
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesType = typeFilter === '' || transaction.type === typeFilter;
    const matchesSource = sourceFilter === '' || transaction.source.toLowerCase().includes(sourceFilter.toLowerCase());

    const matchesMinDebit = minDebitFilter === '' || transaction.debit >= parseFloat(minDebitFilter);
    const matchesMaxDebit = maxDebitFilter === '' || transaction.debit <= parseFloat(maxDebitFilter);

    const matchesMinCredit = minCreditFilter === '' || transaction.credit >= parseFloat(minCreditFilter);
    const matchesMaxCredit = maxCreditFilter === '' || transaction.credit <= parseFloat(maxCreditFilter);

    const matchesStartDate = startDateFilter === '' || new Date(transaction.updatedAt) >= new Date(startDateFilter);
    const matchesEndDate = endDateFilter === '' || new Date(transaction.updatedAt) <= new Date(endDateFilter);

    return matchesType && matchesSource && matchesMinDebit && matchesMaxDebit && matchesMinCredit && matchesMaxCredit && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="absolute top-0 overflow-hidden bg-gray-100 w-full">
      {/* Toggle Button for Filters */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transaction Table</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Conditionally Render Filters Section */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Transaction Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Transaction Type</label>
              <select
                className="border rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Income">Income</option>
                <option value="Expenditure">Expenditure</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Source</label>
              <input
                type="text"
                className="border rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
                placeholder="Source"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              />
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                />
                <input
                  type="date"
                  className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                />
              </div>
            </div>

            {/* Debit Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Debit Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Min"
                  value={minDebitFilter}
                  onChange={(e) => setMinDebitFilter(e.target.value)}
                />
                <input
                  type="number"
                  className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Max"
                  value={maxDebitFilter}
                  onChange={(e) => setMaxDebitFilter(e.target.value)}
                />
              </div>
            </div>

            {/* Credit Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Credit Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Min"
                  value={minCreditFilter}
                  onChange={(e) => setMinCreditFilter(e.target.value)}
                />
                <input
                  type="number"
                  className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Max"
                  value={maxCreditFilter}
                  onChange={(e) => setMaxCreditFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div style={{ height: showFilters ? '50vh' : '80vh' }} className={` overflow-y-auto`}>
        <table className="w-full bg-white border border-gray-300">
          <thead className="sticky top-0 bg-blue-500">
            <tr className="text-white">
              <th className="py-3 px-4 border-b border-r border-gray-200" style={{ width: '17%' }}>Date</th>
              <th className="py-3 px-4 border-b border-r border-gray-200" style={{ width: '10%' }}>Type</th>
              <th className="py-3 px-4 border-b border-r border-gray-200" style={{ width: '10%' }}>Source</th>
              <th className="py-3 px-4 border-b border-r border-gray-200" style={{ width: '40%' }}>Remark</th>
              <th className="py-3 px-4 border-b border-r border-gray-200 text-right" style={{ width: '10%' }}>Debit</th>
              <th className="py-3 px-4 border-b text-right" style={{ width: '10%' }}>Credit</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className={transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'}>
                <td className="py-2 px-4 border-b border-r border-gray-200" style={{ width: '17%' }}>{new Date(transaction.updatedAt).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-r border-gray-200" style={{ width: '10%' }}>{transaction.type}</td>
                <td className="py-2 px-4 border-b border-r border-gray-200" style={{ width: '10%' }}>{transaction.source}</td>
                <td className="py-2 px-4 border-b border-r border-gray-200" style={{ width: '40%' }}>{transaction.remark}</td>
                <td className="py-2 px-4 border-b border-r border-gray-200 text-right" style={{ width: '10%' }}>{transaction.debit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-right" style={{ width: '10%' }}>{transaction.credit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
