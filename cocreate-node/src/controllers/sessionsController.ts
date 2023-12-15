import { Request, Response } from "express";
import { getGoogleOAuthTokens } from "../service/user.service";
import { origin } from "../config/database";
import jwt from "jsonwebtoken";

export async function googleOAuthHandler(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send({ error: "Missing code" });
    }
    
    try {    
        const { id_token, access_token } = await getGoogleOAuthTokens(code as string);
        console.log({id_token, access_token});

        const googleUser = jwt.decode(id_token);
    
    } catch (error) {
        console.error(error);
        return res.redirect(`${origin}`);
    }
}