import config from '../../src/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import fixtures from './fixtures';
import path from 'path';

async function fillDb() {
    const { host, port, password, user: username, name: database } = config.db;

    const options = {
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        synchronize: config.isDev || config.env === 'test',
        logging: config.isDev,
        entities: [ path.join(__dirname, '../../src/db/entities/*.entity{.js,.ts}')],
        migrations: [],
    };
    const db = new DataSource(options as DataSourceOptions);
    await db.initialize();

    await db.query(fixtures.join('\n'))

    await db.destroy();

    return;
}

export {
    fillDb,
};