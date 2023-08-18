import express, { Response, Request } from "express";
import 'dotenv/config';
import { db } from "./config/db.connection";
import bodyParser from "body-parser";
import router from "./routes/routes";
import { Redis } from "ioredis";

const app = express();
const port = process.env.URL || 6592;
const r = new Redis({
    host: 'containers-us-west-133.railway.app',
    password: 'SYK28VPk6UaNnsaVWXsg',
    port: 5501
});

r.on("connect",() => {
    console.log("Connected Redis")
});

app.use(bodyParser.json());

app.use('/', router);

(async () => {
    try {
        await db.connect();
        console.log("MySQL successfully connected");
    } catch (err) {
        console.error("Error connecting to MySQL:", err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
