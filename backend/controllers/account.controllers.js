import Account from '../models/account.model.js';

// Create a new account 
export const createAccount = async (req, res) => {
    const { accountTitle, fullName, bankName, accountNumber, upiId, email, phoneNumber, description, image } = req.body;
    const userId = req.user._id; // Get userId from protected route

    try {
        const account = new Account({
            userId, accountTitle, fullName, bankName, accountNumber, upiId, email, phoneNumber, description, image
        });
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all accounts for a specific user
export const getAllAccountsByUser = async (req, res) => {
    const userId = req.user._id; // Get userId from protected route

    try {
        const accounts = await Account.find({ userId });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific account by ID
export const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an account by ID
export const updateAccount = async (req, res) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccount) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an account by ID
export const deleteAccount = async (req, res) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
