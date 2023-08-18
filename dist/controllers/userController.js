"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const db_connection_1 = require("../config/db.connection");
const ioredis_1 = __importDefault(require("ioredis"));
const getUserInfo = async (req, res) => {
    const userId = req.params.id;
    const redisClient = new ioredis_1.default();
    try {
        const cachedData = await redisClient.get(userId);
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            console.log('get data from cache');
        }
        else {
            const sql = `
                SELECT users.id, name, address,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
                FROM users
                LEFT JOIN transactions ON users.id = transactions.user_id 
                WHERE users.id = ?
                GROUP BY users.id`;
            const [result] = await db_connection_1.db.query(sql, [userId]);
            if (result && result.length > 0) {
                const userData = {
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
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user information' });
    }
    finally {
        redisClient.disconnect();
    }
};
exports.getUserInfo = getUserInfo;
