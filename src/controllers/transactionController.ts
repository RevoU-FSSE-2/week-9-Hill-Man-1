import express, { Request, Response } from "express";
import { db } from "../config/db.connection";
import { OkPacket, RowDataPacket } from "mysql2";
import Redis from 'ioredis';


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
        const insertedTransactionId = result.insertId;

        const redisClient = new Redis();
        const redisKey = `user:${user_id}`;
        redisClient.del(redisKey, (delErr:any, deletedAccount:any) => {
            if (delErr) {
                console.error(delErr);
            } else {
                console.log(`delete cache userId: ${user_id}`);
            }
            redisClient.quit();
        });
        
        res.json({ message: 'Transaction added successfully', id: insertedTransactionId }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the transaction' });
    }
};

// UPDATE TRANSACTION

export const updateTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.id;
    const { type, amount } = req.body;

    const fetchTransactionSQL = "SELECT user_id FROM transactions WHERE id = ?";
    const updateTransactionSQL = "UPDATE transactions SET type = ?, amount = ? WHERE id = ?";
    
    try {
        const [fetchResult] = await db.query<RowDataPacket[]>(fetchTransactionSQL, [transactionId]);

        if (fetchResult.length === 0) {
            console.error("Transaction Not Found");
            return res.status(404).json({ error: "Transaction Not Found" });
        }

        const userId = fetchResult[0].user_id;

        try {
            await db.query<OkPacket>(updateTransactionSQL, [type, amount, transactionId]);
            res.json({ message: 'Transaction updated successfully' });

            const redisClient = new Redis();
            const redisKey = `user:${userId}`;
            redisClient.del(redisKey, (delErr, deletedAccount) => {
                if (delErr) {
                    console.error(delErr);
                } else {
                    console.log(`Deleted Cache for user id : ${userId}`);
                }
                redisClient.quit();
            });
        } catch (updateErr) {
            console.error(updateErr);
            res.status(500).json({ error: "An error occurred while updating transaction" });
        }
    } catch (fetchErr) {
        console.error(fetchErr);
        res.status(500).json({ error: 'An error occurred while fetching transaction data' });
    }
};

// DELETE TRANSACTION

export const deleteTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.id;

    const fetchTransactionSQL = `SELECT user_id FROM transations WHERE id = ?`;

    const sql = 'DELETE FROM transactions WHERE id = ?';

    try {
        await db.query(sql, [transactionId]);
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the transaction' });
    }
};





















