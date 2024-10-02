import express from 'express';
import {
    createAccount,
    getAllAccountsByUser,
    getAccountById,
    updateAccount,
    deleteAccount
} from '../controllers/account.controllers.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

// Create a new account 
router.post('/add',protectRoute, createAccount);

// Get all accounts for a specific user by userId
router.get('/user',protectRoute, getAllAccountsByUser);

// Get a specific account by ID
router.get('/:id',protectRoute, getAccountById);

// Update a specific account by ID
router.put('/:id',protectRoute, updateAccount);

// Delete a specific account by ID
router.delete('/:id',protectRoute, deleteAccount);

export default router;
