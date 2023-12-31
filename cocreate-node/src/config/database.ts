import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

export const googleClientID = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const googleOauthRedirectUrl = process.env.GOOGLE_OAUTH_REDIRECT_URL;
export const githubClientId = process.env.GITHUB_CLIENT_ID;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
export const githubOauthRedirectUrl = process.env.GITHUB_OAUTH_REDIRECT_URL;

export const origin = process.env.ORIGIN_URL;

export function isProduction() {
    return process.env.NODE_ENV === 'production';
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
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