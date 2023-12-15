import { Request, Response } from "express";
import { getGoogleOAuthTokens, upsertUser } from "../service/user.service";
import pool, { googleClientID, origin } from "../config/database";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(googleClientID);

export async function googleOAuthHandler(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send({ error: "Missing code" });
    }
    
    try {    
        const { id_token, access_token } = await getGoogleOAuthTokens(code as string);
        console.log({id_token, access_token});

        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: googleClientID,
        });
        const googleUser = ticket.getPayload();
        

        console.log({googleUser});

        if (!googleUser?.email_verified) {
            return res.status(403).send({ error: "Google account not verified" });
        }

        if (googleUser && googleUser.email) {
            await upsertUser(googleUser.name || "User", googleUser.email);
        } else throw new Error("Google user not found");

        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [googleUser.email]);
        const user = rows[0];

        // req.session.userId = user.id;
    } catch (error) {
        console.error(error);
        return res.redirect(`${origin}`);
    }
}