import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    user: 'cocreate',
    host: process.env.DB_HOST,
    database: 'cocreate',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Connected to the database');
        client?.release();
    }
});

export default pool;