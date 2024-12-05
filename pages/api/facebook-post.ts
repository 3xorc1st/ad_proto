import { NextApiRequest, NextApiResponse } from 'next';
import * as FB from 'fb';
import fetch from 'node-fetch'; // Import node-fetch for server-side fetch

const config = {
    facebook: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        app_id: process.env.FACEBOOK_APP_ID,
        app_secret: process.env.FACEBOOK_APP_SECRET,
    },
};

const handleFacebookPost = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Verify the access token
        try {
            const url = `https://graph.facebook.com/debug_token?input_token=${config.facebook.access_token}&access_token=${config.facebook.app_id}|${config.facebook.app_secret}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.data.is_valid) {
                // Post to Facebook
                FB.api('me/feed', 'post', {
                    message,
                    access_token: config.facebook.access_token,
                }, (response: any) => {
                    if (!response || response.error) {
                        res.status(500).json({ success: false, error: response?.error });
                    } else {
                        res.status(200).json({ success: true, id: response.id });
                    }
                });
            } else {
                res.status(400).json({ success: false, error: 'Invalid token' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
};

export default handleFacebookPost;