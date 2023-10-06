import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '@/config';
import { ILogger } from '@/services/logger';

const { port, password, user: username, name: database } = config.db;

class DB {
    private readonly _logger: ILogger;
    private readonly _db = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port,
        username,
        password,
        database,
        synchronize: config.isDev,
        logging: config.isDev,
        entities: [__dirname + '/entities/*.entity{.js,.ts}'],
        migrations: [],
    });

    constructor(logger: ILogger) {
        this._logger = logger;
    }

    get connection() {
        return this._db;
    }

    connect() {
        return this._db
            .initialize()
            .then(async () => {
                this._logger.info('Database connection is initialized!');
            })
            .catch((error) => this._logger.error(error));
    }
}

export default DB;