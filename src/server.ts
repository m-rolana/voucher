import 'module-alias/register';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '@/config';
import { logger, db, handleRequestError } from '@/services';
import createRouter from '@/routers';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(helmet());
app.use(bodyParser.json());
app.use(config.urlMount, createRouter());
app.use(handleRequestError);


async function init() {
    logger.info("Launching node app");

    await db.connect();

    const server = app.listen(config.port, () => {
        logger.info(`Server is listening at ${config.host}:${config.port}`);
    });

    // graceful shutdown
    process.on('SIGINT', () => {
        logger.info('Stopping server');

        if (server) {
            server.close(() => {
                logger.info('Server stopped');
                process.exit(1);
            });
        }
    });
}

export default init;