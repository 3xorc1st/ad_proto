import { NextApiRequest, NextApiResponse } from "next";

const config = {
    facebook: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        app_id: process.env.FACEBOOK_APP_ID,
        app_secret: process.env.FACEBOOK_APP_SECRET,
    },
};

const payload = {
    message: 'Hello, Facebook!',
    // other data you want to send
};

const facebookPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { facebook } = config;

    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/facebook-post`;
    fetch(url, { method: 'POST', body: JSON.stringify(payload) });

    // Validate the URL
    try {
        new URL(url);
    } catch (error) {
        console.error("Invalid URL:", url);
        return res.status(400).json({ success: false, error: "Invalid URL constructed" });
    }

    try {
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