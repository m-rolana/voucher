import dotenv from 'dotenv';

export type Config = {
    env: string;
    isDev: boolean;
    port: number;
    host: string;
    urlMount: string;
    db: DBConfig;
    pageLimit: number;
};

export type DBConfig = {
    password: string;
    user: string;
    name: string;
    port: number;
    host: string;
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
    db: {
        password: process.env.DB_PASSWORD || '',
        user: process.env.DB_USER || '',
        name: process.env.DB_NAME || '',
        port: +(process.env.DB_PORT || 5432),
        host: process.env.DB_HOST || 'localhost',
    },
    pageLimit: 100,
};

export default config;
