"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_connection_1 = require("./config/db.connection");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const ioredis_1 = require("ioredis");
const app = (0, express_1.default)();
const port = process.env.URL || 6592;
const r = new ioredis_1.Redis({
    host: 'containers-us-west-133.railway.app',
    password: 'SYK28VPk6UaNnsaVWXsg',
    port: 5501
});
r.on("connect", () => {
    console.log("Connected Redis");
});
app.use(body_parser_1.default.json());
app.use('/', routes_1.default);
(async () => {
    try {
        await db_connection_1.db.connect();
        console.log("MySQL successfully connected");
    }
    catch (err) {
        console.error("Error connecting to MySQL:", err);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
