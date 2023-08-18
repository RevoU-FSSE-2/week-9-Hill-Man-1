import express, { Request, Response } from "express";
import { db } from "../config/db.connection";
import { OkPacket } from "mysql2";

// GET ALL TRANSACTIONS
export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM transactions';
        const rows = await db.query(sql);
        res.status(200).json({ success: true, data: rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching transactions' });
    }
};

// GET TRANSACTIONS BY USER ID
export const getTransactionsByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM transactions WHERE user_id = ?';
    try {
        const [result]:any = await db.query(sql, userId);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user transactions' });
    }
};

// GET TRANSACTION BY TYPE
export const getTransactionsByType = async (req: Request, res: Response) => {
    const type = req.params.type;
    const sql = 'SELECT * FROM transactions WHERE type = ?';
    try {
        const result = await db.query(sql, type);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching transactions' });
    }
};

// CREATE NEW TRANSACTION

export const createTransaction = async (req: Request, res: Response) => {
    const { user_id, type, amount } = req.body;
    const sql = 'INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)';
    
    try {
        const [result] = await db.query<OkPacket>(sql, [user_id, type, amount]);
        res.json({ message: 'Transaction added successfully', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the transaction' });
    }
};

// UPDATE TRANSACTION

export const updateTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.id;
    const { type, amount } = req.body;
    const sql = 'UPDATE transactions SET type = ?, amount = ? WHERE id = ?';
    
    try {
        await db.query(sql, [type, amount, transactionId]);
        res.json({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the transaction' });
    }
};

// DELETE TRANSACTION

export const deleteTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.id;
    const sql = 'DELETE FROM transactions WHERE id = ?';

    try {
        await db.query(sql, [transactionId]);
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the transaction' });
    }
};



















