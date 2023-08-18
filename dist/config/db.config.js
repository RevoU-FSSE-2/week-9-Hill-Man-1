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
    HOST: process.env.DB_RAILWAY_HOST,
    PORT: process.env.DB_RAILWAY_PORT,
    USER: process.env.DB_RAILWAY_USERNAME,
    PASSWORD: process.env.DB_RAILWAY_PASSWORD,
    DB_NAME: process.env.DB_RAILWAY_NAME
};
