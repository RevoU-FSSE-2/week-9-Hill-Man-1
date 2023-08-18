"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionsByType = exports.getTransactionsByUser = exports.getAllTransactions = void 0;
const db_connection_1 = require("../config/db.connection");
const ioredis_1 = __importDefault(require("ioredis"));
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
        const [result] = await db_connection_1.db.query(sql, userId);
        res.json(result);
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
        const insertedTransactionId = result.insertId;
        const redisClient = new ioredis_1.default();
        const redisKey = `user:${user_id}`;
        redisClient.del(redisKey, (delErr, deletedAccount) => {
            if (delErr) {
                console.error(delErr);
            }
            else {
                console.log(`delete cache userId: ${user_id}`);
            }
            redisClient.quit();
        });
        res.json({ message: 'Transaction added successfully', id: insertedTransactionId });
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
    const fetchTransactionSQL = "SELECT user_id FROM transactions WHERE id = ?";
    const updateTransactionSQL = "UPDATE transactions SET type = ?, amount = ? WHERE id = ?";
    try {
        const [fetchResult] = await db_connection_1.db.query(fetchTransactionSQL, [transactionId]);
        if (fetchResult.length === 0) {
            console.error("Transaction Not Found");
            return res.status(404).json({ error: "Transaction Not Found" });
        }
        const userId = fetchResult[0].user_id;
        try {
            await db_connection_1.db.query(updateTransactionSQL, [type, amount, transactionId]);
            res.json({ message: 'Transaction updated successfully' });
            const redisClient = new ioredis_1.default();
            const redisKey = `user:${userId}`;
            redisClient.del(redisKey, (delErr, deletedAccount) => {
                if (delErr) {
                    console.error(delErr);
                }
                else {
                    console.log(`Deleted Cache for user id : ${userId}`);
                }
                redisClient.quit();
            });
        }
        catch (updateErr) {
            console.error(updateErr);
            res.status(500).json({ error: "An error occurred while updating transaction" });
        }
    }
    catch (fetchErr) {
        console.error(fetchErr);
        res.status(500).json({ error: 'An error occurred while fetching transaction data' });
    }
};
exports.updateTransaction = updateTransaction;
// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const fetchTransactionSQL = `SELECT user_id FROM transations WHERE id = ?`;
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
