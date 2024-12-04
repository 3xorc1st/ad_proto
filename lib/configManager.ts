import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const configPath = path.resolve(__dirname, '../config/config.json');
const algorithm = 'aes-256-ctr';
const secretKey = process.env.CONFIG_SECRET_KEY || 'default_secret_key';
const iv = crypto.randomBytes(16);

export const readConfig = (): any => {
    const data = fs.readFileSync(configPath, 'utf8');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
};

export const writeConfig = (config: any): void => {
    const data = JSON.stringify(config, null, 2);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    fs.writeFileSync(configPath, encrypted, 'utf8');
};