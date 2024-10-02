import express from 'express';
import {
    createAccount,
    getAllAccountsByUser,
    getAccountById,
    updateAccount,
    deleteAccount
} from '../controllers/account.controllers.js';

const router = express.Router();

// Create a new account 
router.post('/', createAccount);

// Get all accounts for a specific user by userId
router.get('/user', getAllAccountsByUser);

// Get a specific account by ID
router.get('/:id', getAccountById);

// Update a specific account by ID
router.put('/:id', updateAccount);

// Delete a specific account by ID
router.delete('/:id', deleteAccount);

export default router;
