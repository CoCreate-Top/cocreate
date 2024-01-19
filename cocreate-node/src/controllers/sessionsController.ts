import { Request, Response } from "express";
import { getGithubAccessToken, getGoogleOAuthTokens, upsertUser } from "../service/userService";
import { googleClientID, origin } from "../config/database";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { log } from "console";

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
            const user = await upsertUser(googleUser.name || "User", googleUser.email);
            if (!user) throw new Error("User not found");
            req.session.userId = user.id;
        } else throw new Error("Google user not found");

        res.redirect(`${origin}`); // TODO: redirect to whatever home page will be

    } catch (error) {
        console.error(error);
        return res.redirect(`${origin}`); // TODO: redirect to login page with error message
    }
}

export async function githubOAuthHandler(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send({ error: "Missing code" });
    }

    try {
        const access_token = await getGithubAccessToken(code as string);

        const { data: emails } = await axios.get("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const primaryEmail = emails.find((email: any) => email.primary).email;

        const { data } = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        // data contains url for user github
        if (data && primaryEmail) {
            const user = await upsertUser(data.name || "User", primaryEmail);
            if (!user) throw new Error("User not found");
            req.session.userId = user.id;
        } else throw new Error("Github user not found");


        res.redirect(`${origin}`); // TODO: redirect to whatever home page will be

    } catch (error) {
        console.error(error);
        return res.redirect(`${origin}`); // TODO: redirect to login page with error message
    }
}

export function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ err });
        } else {
            return res.status(200).json({ message: "Logged out successfully" });
        }
    });
} 

export function ensureAuthenticated(req: Request, res: Response, next: any) {
    console.log(req.session.userId);
    console.log(req.session);
    
    try {
        if (req.session.userId) {
            next();
        } else {
            res.status(401).json({error: "Unauthorized"});
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid session" });
    }
  }
