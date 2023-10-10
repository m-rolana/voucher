import dotenv from 'dotenv';
import path from 'path';

export type Config = {
    env: string;
    isDev: boolean;
    isTest: boolean;
    port: number;
    host: string;
    urlMount: string;
    db: DBConfig;
    pageLimit: number;
    discountCode: DiscountCode;
};

export type DBConfig = {
    password: string;
    user: string;
    name: string;
    port: number;
    host: string;
};

export type DiscountCode = {
    allowedChars: string;
    length: number;
}

const getDotEnvPath = (env?: string) => {
    if (env == 'test') {
        return '.env.test';
    }
    return '.env';
};

dotenv.config({ path: path.join(process.cwd(), getDotEnvPath(process.env.NODE_ENV)) });

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isTest = env === 'test';

const config: Config = {
    env,
    isDev,
    isTest,
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
    discountCode: {
        allowedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        length: 6,
    },
};

export default config;
