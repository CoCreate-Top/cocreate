"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Pool = require('pg').Pool;
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.NODE_PORT;
const pool = new Pool({
    user: 'cocreate',
    host: '127.0.0.1',
    database: 'cocreate',
    password: 'cocreate2023',
    port: 5432,
});
app.get('/', (req, res) => {
    pool.query('SELECT * FROM test', (error, results) => {
        if (error)
            throw error;
        res.status(200).json(results.rows);
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
