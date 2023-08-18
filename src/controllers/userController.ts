import { Request, Response } from 'express';
import Redis from 'ioredis';
import { db } from "../config/db.connection";
import { RowDataPacket } from 'mysql2';

export const getUserInfo = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const redisKey = `user:${userId}`; 
    const r = new Redis({
        host: 'containers-us-west-133.railway.app',
        password: 'SYK28VPk6UaNnsaVWXsg',
        port: 5501
    });


    r.get(redisKey, async (redisErr, cachedData) => {
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            console.log('get data from cache');
        } else {
            const sql = 'SELECT users.id, name, address, ' +
                'SUM(CASE WHEN type="income" THEN amount ELSE 0 END) AS total_income, ' +
                'SUM(CASE WHEN type="expense" THEN amount ELSE 0 END) AS total_expense ' +
                'FROM users ' +
                'LEFT JOIN transactions ON users.id = transactions.user_id ' +
                'WHERE users.id = ? ' +
                'GROUP BY users.id';

            try {
                const [result] = await db.query<RowDataPacket[]>(sql, [userId]);
                if (result.length > 0) {
                    const userData = {
                        id: result[0].id,
                        name: result[0].name,
                        address: result[0].address,
                        balance: result[0].total_income - result[0].total_expense,
                        expense: result[0].total_expense
                    };

                    // Set data in Redis cache
                    r.setex(redisKey, 60, JSON.stringify(userData)); // Cache for 1 hour
                    res.json(userData);
                    console.log('add new data to cache');
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while fetching user information' });
            }
        }
    });
};
