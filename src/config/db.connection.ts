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
    host: DB_RailwayConfig.HOST,
    user: DB_RailwayConfig.USER,
    password: DB_RailwayConfig.PASSWORD,
    port: DB_RailwayConfig.PORT,
    database: DB_RailwayConfig.DB_RAILWAY_NAME
};

export const db = mysql.createPool(poolConfig);