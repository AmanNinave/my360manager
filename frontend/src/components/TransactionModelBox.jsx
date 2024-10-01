import React, { useEffect, useState } from "react";
import {
  incomeSources,
  expenditureSources,
  moneyTransferSources,
} from "../constants/finance.constants.js";

const TransactionModal = ({
  modalFormData,
  isOpen,
  onClose,
  transactionsData,
  setTransactionsData,
}) => {
  const [formData, setFormData] = useState(modalFormData);

  useEffect(() => {
    setFormData(modalFormData);
  }, [modalFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adjust debit/credit values based on the type of transaction
    if (formData.type === "Income") {
      formData.debit = 0; // Clear debit for Income
    } else {
      formData.credit = 0; // Clear credit for Expenditure
    }

    // Use custom source if 'Custom' is selected
    const finalSource =
      formData.source === "Custom" ? formData.customSource : formData.source;

    const finalData = { ...formData, source: finalSource };

    onClose();
    try {
      let url = `${import.meta.env.VITE_BACKEND_IP}/api/finance/addtransaction`;
      let method = "POST";
      if (formData.isEdit) {
        url = `${import.meta.env.VITE_BACKEND_IP}/api/finance/edittransaction/${
          formData._id
        }`;
        method = "PUT";
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (formData.isEdit) {
          setTransactionsData((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction._id === result.transaction._id
                ? result.transaction
                : transaction
            )
          );
        } else {
          setTransactionsData([result.transaction, ...transactionsData]);
        }
      } else {
        console.error("Error submitting transaction", response.status);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit}>
          {/* Transaction Type */}
          <div className="mb-4">
            <label className="block text-gray-700">Transaction Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Income"
                  checked={formData.type === "Income"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                  required
                />
                <span className="ml-2">Income</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Expenditure"
                  checked={formData.type === "Expenditure"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                  required
                />
                <span className="ml-2">Expenditure</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Money Transfer"
                  checked={formData.type === "Money Transfer"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                  required
                />
                <span className="ml-2">Money Transfer</span>
              </label>
            </div>
          </div>

          {/* Source Select */}
          <div className="mb-4">
            <label className="block text-gray-700">Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Source</option>
              {formData.type === "Income"
                ? incomeSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))
                : formData.type === "Expenditure"
                ? expenditureSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))
                : moneyTransferSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))
              }
            </select>
          </div>

          {/* Custom Source Input (conditionally rendered) */}
          {formData.source === "Custom" && (
            <div className="mb-4">
              <label className="block text-gray-700">Custom Source</label>
              <input
                type="text"
                name="customSource"
                value={formData.customSource}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter custom source"
                required
              />
            </div>
          )}

          {/* Remark */}
          <div className="mb-4">
            <label className="block text-gray-700">Remark</label>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter remark"
              required
            />
          </div>

          {/* Conditional Debit/Credit Field */}
          {formData.type === "Income" ? (
            <div className="mb-4">
              <label className="block text-gray-700">Credit</label>
              <input
                type="number"
                name="credit"
                value={formData.credit ? formData.credit : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter credit amount"
                required={formData.type === "Income"}
                min="0"
              />
            </div>
          ) : formData.type === "Expenditure" ? (
            <div className="mb-4">
              <label className="block text-gray-700">Debit</label>
              <input
                type="number"
                name="debit"
                value={formData.debit ? formData.debit : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter debit amount"
                required={formData.type === "Expenditure"}
                min="0"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                name="money_transfer_amount"
                value={formData.money_transfer_amount ? formData.money_transfer_amount : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                required={formData.type === "Money Transfer"}
                min="0"
              />
            </div>
          )
          }

          {/* Mode Radio Buttons */}
          <div className="mb-4">
            <label className="block text-gray-700">Mode</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="Online"
                  checked={formData.mode === "Online"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                  required
                />
                <span className="ml-2">Online</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="Cash"
                  checked={formData.mode === "Cash"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                  required
                />
                <span className="ml-2">Cash</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="Credit Card"
                  checked={formData.mode === "Credit Card"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                  required
                />
                <span className="ml-2">Credit Card</span>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
