import Transaction from "../models/transaction.model.js";
import TransactionHistory from "../models/transactionHistory.model.js";

export const addTransaction = async (req, res) => {
    try {
        const { type, source, remark, debit, credit, mode } = req.body;
        const userId = req.user._id; // Get userId from protected route

        const newTransaction = new Transaction({
            userId,
            type,
            source,
            remark,
            debit,
            credit,
            mode
        });

        await newTransaction.save(); // save the new transaction

        res.status(200).json({ message: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
        console.log("Error in addTransaction controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getTransactions = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all transactions directly for the user
        const transactions = await Transaction.find({ userId });

        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error in getTransactions controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id; // Get the transaction ID from the request parameters
        const { type, source, remark, debit, credit, mode } = req.body; // Get updated values from the request body

        // Find and update the transaction
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            { type, source, remark, debit, credit, mode },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        console.log("Error in editTransaction controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id; // Get the transaction ID from the request parameters

        // Find and delete the transaction
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully", transaction: deletedTransaction });
    } catch (error) {
        console.log("Error in deleteTransaction controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
