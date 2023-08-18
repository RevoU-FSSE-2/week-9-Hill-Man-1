import express, { Request, Response } from "express";
import { db } from "../config/db.connection";
import Redis from "ioredis";
import { RowDataPacket } from "mysql2";

interface UserInfo {
    id: number;
    name: string;
    address: string;
    balance: number; // Add the balance property here
    // total_income: number;
    total_expense: number;
}

export const getUserInfo = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const redisClient = new Redis();

    try {
        const cachedData = await redisClient.get(userId);
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            console.log('get data from cache');
        } else {
            const sql = `
                SELECT users.id, name, address,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
                FROM users
                LEFT JOIN transactions ON users.id = transactions.user_id 
                WHERE users.id = ?
                GROUP BY users.id`;
            
            const [result] = await db.query<RowDataPacket[]>(sql, [userId]);

            if (result && result.length > 0) {
                const userData: UserInfo = {
                    id: result[0].id,
                    name: result[0].name,
                    address: result[0].address,
                    // total_income: result[0].total_income,
                    balance: result[0].total_income - result[0].total_expense,
                    total_expense: result[0].total_expense
                };

                await redisClient.setex(userId, 3600, JSON.stringify(userData));
                res.json(userData);
                console.log('add new data to cache');
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user information' });
    } finally {
        redisClient.disconnect();
    }
};