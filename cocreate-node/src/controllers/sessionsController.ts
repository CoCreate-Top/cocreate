import { Request, Response } from "express";
import { getGoogleOAuthTokens, upsertUser } from "../service/userService";
import pool, { googleClientID, origin } from "../config/database";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(googleClientID);

export async function googleOAuthHandler(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send({ error: "Missing code" });
    }
    
    try {    
        // Tokens from Google, add access_token if needed for Google API calls (Google calendar, etc.)
        const { id_token } = await getGoogleOAuthTokens(code as string);

        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: googleClientID,
        });
        const googleUser = ticket.getPayload();
        
        if (!googleUser?.email_verified) {
            return res.status(403).send({ error: "Google account not verified" });
        }

        if (googleUser && googleUser.email) {
            await upsertUser(googleUser.name || "User", googleUser.email);
        } else throw new Error("Google user not found");

        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [googleUser.email]);
        const user = rows[0];

        if (!user) throw new Error("User not found");

        req.session.userId = user.id;

        res.redirect(`${origin}`); // TODO: redirect to whatever home page will be

    } catch (error) {
        console.error(error);
        return res.redirect(`${origin}`); // TODO: redirect to login page with error message
    }
}

export function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send(err.message);
        } else {
            return res.status(200).send("Logged out successfully");
        }
    });
}

export function ensureAuthenticated(req: Request, res: Response, next: any) {
    if (req.session.userId) {
        next();
    } else {
        console.log("Unauthorized");
        res.status(401).send("Unauthorized");
    }
  }
