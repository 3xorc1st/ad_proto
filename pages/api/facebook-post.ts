import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from 'jsonwebtoken';

const config = {
    facebook: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        app_id: process.env.FACEBOOK_APP_ID,
        app_secret: process.env.FACEBOOK_APP_SECRET,
    },
};

const facebookPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { facebook } = config;

    // Log environment variables
    console.log(`FACEBOOK_ACCESS_TOKEN: ${facebook.access_token ? "SET" : "NOT SET"}`);
    console.log(`FACEBOOK_APP_ID: ${facebook.app_id ? "SET" : "NOT SET"}`);
    console.log(`FACEBOOK_APP_SECRET: ${facebook.app_secret ? "SET" : "NOT SET"}`);

    // Validate environment variables
    if (!facebook.access_token || !facebook.app_id || !facebook.app_secret) {
        console.error("Missing Facebook configuration");
        return res.status(500).json({ success: false, error: "Internal Server Error: Missing Facebook configuration" });
    }

    const url = `https://graph.facebook.com/debug_token?input_token=${facebook.access_token}&access_token=${facebook.app_id}|${facebook.app_secret}`;
    console.log("Constructed URL:", url);

    // Validate the URL
    try {
        new URL(url);
    } catch (error) {
        console.error("Invalid URL:", url);
        return res.status(400).json({ success: false, error: "Invalid URL constructed" });
    }

    // Validate JWT with clock skew tolerance
    const validateToken = (token: string) => {
        const toleranceInSeconds = 60; // 1 minute tolerance
        const now = Math.floor(Date.now() / 1000);
        const decoded = jwt.decode(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }

        const iat = (decoded as JwtPayload).iat;
        if (!iat || iat > now + toleranceInSeconds) {
            throw new Error('Token not active yet');
        }
        // Proceed with regular validation
    };

    try {
        validateToken(facebook.access_token);

        const response = await fetch(url, { method: "GET" });
        const data = await response.json();

        if (!response.ok) {
            console.error("Error from Facebook API:", data);
            return res.status(response.status).json({ success: false, error: data });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching from Facebook:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default facebookPost;