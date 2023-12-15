import axios from "axios";
import qs from "qs";
import pool, { googleClientID, googleClientSecret, googleOauthRedirectUrl } from "../config/database";

interface GoogleTokensResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function getGoogleOAuthTokens(code: string): Promise<GoogleTokensResult> {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
        code,
        clientId : googleClientID,
        clientSecret : googleClientSecret,
        redirectUri : googleOauthRedirectUrl,
        grant_type : "authorization_code",
    };

    try {
        const response = await axios.post<GoogleTokensResult>(url, qs.stringify(values), 
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                },
        });
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function upsertUser(name: string, email: string) {
    try {
        await pool.query(
            `INSERT INTO users (name, email) VALUES ($1, $2)
            ON CONFLICT (email) DO UPDATE SET name = $1, email = $2`,
            [name, email]
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}