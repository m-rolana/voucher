import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '@/config';
import { ILogger } from '@/types';
import RepoManager from '@/db/repo';

const { host, port, password, user: username, name: database } = config.db;

class DB {
    private readonly _logger: ILogger;
    private readonly _db = new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        synchronize: config.isDev || config.isTest,
        logging: config.isDev || config.isTest,
        entities: [__dirname + '/entities/*.entity{.js,.ts}'],
        migrations: [],
    });

    constructor(logger: ILogger) {
        this._logger = logger;
    }

    get connection(): DataSource {
        return this._db;
    }

    get repoManager(): RepoManager {
        return new RepoManager(this._db);
    }

    connect(): Promise<DataSource | void> {
        this._logger.debug(this._db.options);
        return this._db
            .initialize()
            .then(async (result) => {
                this._logger.info('Database connection is initialized!');
                return result;
            })
            .catch((error) => {
                this._logger.error(error);
            });
    }
}

export default DB;