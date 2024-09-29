import Transaction from "../models/transaction.model.js";
import TransactionHistory from "../models/transactionHistory.model.js";

export const addTransaction = async (req, res) => {
    try {
        const { type, source, remark, debit, credit } = req.body;
        const userId = req.user._id; // Get userId from protected route

        const newTransaction = new Transaction({
            userId,
            type,
            source,
            remark,
            debit,
            credit,
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

