"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionsByType = exports.getTransactionsByUser = exports.getAllTransactions = void 0;
const db_connection_1 = require("../config/db.connection");
// GET ALL TRANSACTIONS
const getAllTransactions = async (req, res) => {
    try {
        const sql = 'SELECT * FROM transactions';
        const rows = await db_connection_1.db.query(sql);
        res.status(200).json({ success: true, data: rows[0] });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching transactions' });
    }
};
exports.getAllTransactions = getAllTransactions;
// GET TRANSACTIONS BY USER ID
const getTransactionsByUser = async (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM transactions WHERE user_id = ?';
    try {
        const result = await db_connection_1.db.query(sql, userId);
        res.json(result[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user transactions' });
    }
};
exports.getTransactionsByUser = getTransactionsByUser;
// GET TRANSACTION BY TYPE
const getTransactionsByType = async (req, res) => {
    const type = req.params.type;
    const sql = 'SELECT * FROM transactions WHERE type = ?';
    try {
        const result = await db_connection_1.db.query(sql, type);
        res.json(result[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching transactions' });
    }
};
exports.getTransactionsByType = getTransactionsByType;
// CREATE NEW TRANSACTION
const createTransaction = async (req, res) => {
    const { user_id, type, amount } = req.body;
    const sql = 'INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)';
    try {
        const [result] = await db_connection_1.db.query(sql, [user_id, type, amount]);
        res.json({ message: 'Transaction added successfully', id: result.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the transaction' });
    }
};
exports.createTransaction = createTransaction;
// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const { type, amount } = req.body;
    const sql = 'UPDATE transactions SET type = ?, amount = ? WHERE id = ?';
    try {
        await db_connection_1.db.query(sql, [type, amount, transactionId]);
        res.json({ message: 'Transaction updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the transaction' });
    }
};
exports.updateTransaction = updateTransaction;
// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const sql = 'DELETE FROM transactions WHERE id = ?';
    try {
        await db_connection_1.db.query(sql, [transactionId]);
        res.json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the transaction' });
    }
};
exports.deleteTransaction = deleteTransaction;
