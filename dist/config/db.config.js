"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_RailwayConfig = exports.DBConfig = void 0;
exports.DBConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME
};
exports.DB_RailwayConfig = {
    host: 'containers-us-west-42.railway.app',
    user: 'root',
    password: '8SmqdBhCH4ymAgc4evs7',
    port: 6592,
    database: 'railway'
};
// export const redisConnection =  {
//     HOST : process.env.REDIS_HOST,
//     URL : process.env.REDIS_URL,
//     PASSWORD : process.env.REDIS_PASSWORD,
//     PORT : process.env.REDIS_PORT,
//     USER : process.env.REDIS_USER,
// }
