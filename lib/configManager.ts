import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const configPath = path.resolve(__dirname, '../config/config.json');
const algorithm = 'aes-256-ctr';
const secretKey = process.env.CONFIG_SECRET_KEY || 'default_secret_key';
const iv = crypto.randomBytes(16);

export const readConfig = (): any => ({
    facebook: {
        access_token: process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN || '',
        app_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
        // No expongas el secret en el cliente
        app_secret: process.env.FACEBOOK_APP_SECRET || '',
    },
});

export const writeConfig = (config: any): void => {
    const data = JSON.stringify(config, null, 2);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    fs.writeFileSync(configPath, encrypted, 'utf8');
};