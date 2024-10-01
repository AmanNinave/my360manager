import React, { useState } from "react";
import TransactionChart from "./TransactionCharts.jsx";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TransactionModal from "./TransactionModelBox.jsx";

const TransactionTable = ({
  transactionsData,
  handleDelete,
  setTransactionsData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    type: "Expenditure",
    source: "",
    customSource: "", // Field to capture custom source input
    remark: "",
    debit: 0,
    credit: 0,
    money_transfer_ammount : 0,
    mode: "Online",
    isEdit: false,
  });
  console.log("t" , transactionsData)
  // State to store filter values
  const [typeFilter, setTypeFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [minDebitFilter, setMinDebitFilter] = useState("");
  const [maxDebitFilter, setMaxDebitFilter] = useState("");
  const [minCreditFilter, setMinCreditFilter] = useState("");
  const [maxCreditFilter, setMaxCreditFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  // State to toggle filter visibility
  const [showFilters, setShowFilters] = useState(false);

  // Function to filter transactions based on filter values
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesType = typeFilter === "" || transaction.type === typeFilter;
    const matchesMode = modeFilter === "" || transaction.mode === modeFilter;
    const matchesSource =
      sourceFilter === "" ||
      transaction.source.toLowerCase().includes(sourceFilter.toLowerCase());

    const matchesMinDebit =
      minDebitFilter === "" || transaction.debit >= parseFloat(minDebitFilter);
    const matchesMaxDebit =
      maxDebitFilter === "" || transaction.debit <= parseFloat(maxDebitFilter);

    const matchesMinCredit =
      minCreditFilter === "" ||
      transaction.credit >= parseFloat(minCreditFilter);
    const matchesMaxCredit =
      maxCreditFilter === "" ||
      transaction.credit <= parseFloat(maxCreditFilter);

    const matchesStartDate =
      startDateFilter === "" ||
      new Date(transaction.createdAt) >= new Date(startDateFilter);
    const matchesEndDate =
      endDateFilter === "" ||
      new Date(transaction.createdAt) <= new Date(endDateFilter);

    return (
      matchesType &&
      matchesMode &&
      matchesSource &&
      matchesMinDebit &&
      matchesMaxDebit &&
      matchesMinCredit &&
      matchesMaxCredit &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFormData({
      type: "Expenditure",
      source: "",
      customSource: "", // Field to capture custom source input
      remark: "",
      debit: 0,
      credit: 0,
      money_transfer_ammount : 0,
      mode: "Online",
      isEdit: false,
    });
  };

  const handleEdit = (transactionToBeEdited) => {
    setModalFormData({ ...transactionToBeEdited, isEdit: true });
    openModal();
  };

  return (
    <>
      <TransactionModal
        modalFormData={modalFormData}
        isOpen={isModalOpen}
        onClose={closeModal}
        transactionsData={transactionsData}
        setTransactionsData={setTransactionsData}
      />
      <div className="absolute top-0 overflow-hidden bg-gray-100 w-full">
        {/* Toggle Button for Filters */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Transaction Table</h2>
          <div className="flex gap-x-5">
            <button
              onClick={openModal}
              className=" bg-blue-500 text-white px-6 py-2 z-10 rounded-lg hover:bg-blue-600"
            >
              Add Transaction
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-500 text-white px-6 py-2 z-10 rounded-lg hover:bg-blue-600"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {/* Conditionally Render Filters Section */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Transaction Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction Type
                </label>
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

              {/* Transaction Mode Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction Mode
                </label>
                <select
                  className="border rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
                  value={modeFilter}
                  onChange={(e) => setModeFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
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
                <label className="block text-sm font-medium mb-1">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="datetime-local"
                    className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500 text-xs"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                  />
                  <input
                    type="datetime-local"
                    className="border rounded-md p-2 w-1/2 focus:ring-blue-500 focus:border-blue-500 text-xs"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                  />
                </div>
              </div>

              {/* Debit Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Debit Range
                </label>
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
                <label className="block text-sm font-medium mb-1">
                  Credit Range
                </label>
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

        {/* Transactions Chart */}
        <TransactionChart transactionsData={filteredTransactions} />

        {/* Transactions Table */}
        <div className={`max-h-[85vh] overflow-y-auto`}>
          <table className="w-full bg-white border border-gray-300">
            <thead className="sticky top-0 bg-blue-500">
              <tr className="text-white">
                <th
                  className="py-3 px-4 border-b border-r border-gray-200"
                  style={{ width: "18%" }}
                >
                  Date
                </th>
                <th
                  className="py-3 px-4 border-b border-r border-gray-200"
                  style={{ width: "10%" }}
                >
                  Mode
                </th>
                <th
                  className="py-3 px-4 border-b border-r border-gray-200"
                  style={{ width: "10%" }}
                >
                  Source
                </th>
                <th
                  className="py-3 px-4 border-b border-r border-gray-200"
                  style={{ width: "40%" }}
                >
                  Remark
                </th>
                <th
                  className="py-3 px-4 border-b border-r border-gray-200"
                  style={{ width: "15%" }}
                >
                  Amount
                </th>
                <th className="py-3 px-4 border-b " style={{ width: "7%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => {
                // Calculate amount and ignore zero values
                const amount =
                  transaction.type === "Income"
                    ? transaction.credit
                    : transaction.debit;
                if (amount === 0) return null; // Ignore rows with zero amounts

                return (
                  <tr
                    key={index}
                    className={
                      transaction.type === "Income"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }
                  >
                    <td
                      className="py-2 px-4 border-b border-r border-gray-200"
                      style={{ width: "18%" }}
                    >
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                    <td
                      className="py-2 px-4 border-b border-r border-gray-200"
                      style={{ width: "10%" }}
                    >
                      {transaction.mode?.length > 8
                        ? transaction.mode.slice(0, 8) + "..."
                        : transaction.mode}
                    </td>
                    <td
                      className="py-2 px-4 border-b border-r border-gray-200"
                      style={{ width: "10%" }}
                    >
                      {transaction.source}
                    </td>
                    <td
                      className="py-2 px-4 border-b border-r border-gray-200"
                      style={{ width: "40%" }}
                    >
                      {transaction.remark}
                    </td>
                    <td
                      className="py-2 px-4 border-b border-r border-gray-200 text-right"
                      style={{ width: "15%" }}
                    >
                      {amount.toFixed(1)}
                      {transaction.type === "Income" ? (
                        <PlusCircleIcon className="h-5 w-5 text-green-600 inline-block ml-2" />
                      ) : (
                        <MinusCircleIcon className="h-5 w-5 text-red-600 inline-block ml-2" />
                      )}
                    </td>
                    <td
                      className="py-2 px-4 pl-6 border-b "
                      style={{ width: "7%" }}
                    >
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <PencilIcon className="h-5 w-5 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <TrashIcon className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
