import axios from "axios";
import qs from "qs";
import pool, { githubClientId, githubClientSecret, githubOauthRedirectUrl, googleClientID, googleClientSecret, googleOauthRedirectUrl } from "../config/database";

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
        client_id : googleClientID,
        client_secret : googleClientSecret,
        redirect_uri : googleOauthRedirectUrl,
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
        console.error("Error in getGoogleOauthTokens: ");
        console.error(error.response.data);
        throw new Error(error.message);
    }
}

export async function getGithubAccessToken(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const values = {
        client_id:  githubClientId,
        client_secret: githubClientSecret,
        redirect_uri: githubOauthRedirectUrl,
        code,
      };
        
      try {
        const response = await axios.post(url, qs.stringify(values), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const params = new URLSearchParams(response.data);
        const accessToken = params.get('access_token');
        
        return accessToken;
      } catch (err: any) {
        console.error('Error in getGithubAccessToken: ');
        console.error(err.response.data);
        throw Error(err);
      }
}

// TODO: add types
export async function upsertUser(name: string, email: string) {
    try {
        const result = await pool.query(
            `INSERT INTO users (name, email) VALUES ($1, $2)
            ON CONFLICT (email) DO UPDATE SET name = $1, email = $2
            RETURNING *`,
            [name, email]
        );

        return result.rows[0];
    } catch (error: any) {
        console.error("Error in upsertUser: ");
        console.error(error);
        throw new Error(error.message);
    }
}