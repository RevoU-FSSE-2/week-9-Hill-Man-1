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
    HOST: process.env.DB_RAILWAY_HOST || 'localhostcontainers-us-west-42.railway.app',
    USER: process.env.DB_RAILWAY_USER || 'root',
    PASSWORD: process.env.DB_RAILWAY_PASSWORD || '8SmqdBhCH4ymAgc4evs7',
    PORT: process.env.DB_RAILWAY_PORT ? parseInt(process.env.DB_RAILWAY_PORT) : 3306,
    DB_RAILWAY_NAME: process.env.DB_RAILWAY_NAME || 'railway'
};
// export const redisConnection =  {
//     HOST : process.env.REDIS_HOST,
//     URL : process.env.REDIS_URL,
//     PASSWORD : process.env.REDIS_PASSWORD,
//     PORT : process.env.REDIS_PORT,
//     USER : process.env.REDIS_USER,
// }
