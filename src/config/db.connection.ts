import mysql from 'mysql2/promise';
import { DBConfig, DB_RailwayConfig } from './db.config';
import 'dotenv/config';


//     const poolConfig = {
//     host: DBConfig.HOST,
//     user: DBConfig.USER,
//     password: DBConfig.PASSWORD,
//     database: DBConfig.DB_NAME
// };



const poolConfig = {
    host: 'containers-us-west-42.railway.app',
    user: 'root',
    password: '8SmqdBhCH4ymAgc4evs7',
    port: 6592,
    database: 'railway'
};

export const db = mysql.createPool(poolConfig);