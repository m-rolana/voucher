import dotenv from 'dotenv';

export type Config = {
    env: string;
    isDev: boolean;
    port: number;
    host: string;
    urlMount: string;
};

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

const config: Config = {
    env,
    isDev,
    port: +(process.env.PORT || 8000),
    host: process.env.HOST || '127.0.0.1',
    urlMount: process.env.URL_MOUNT || '/api',
};

export default config;
