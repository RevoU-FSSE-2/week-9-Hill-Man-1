"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
require("dotenv/config");
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
exports.db = promise_1.default.createPool(poolConfig);
