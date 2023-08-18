import mysql from 'mysql2/promise';
import { DBConfig } from './db.config';
import 'dotenv/config';


    const poolConfig = {
    host: DBConfig.HOST,
    user: DBConfig.USER,
    password: DBConfig.PASSWORD,
    database: DBConfig.DB_NAME,
};

export const db = mysql.createPool(poolConfig);