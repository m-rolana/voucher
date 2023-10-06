import 'module-alias/register';
import config from '@/config';
import express from 'express';
import bodyParser from 'body-parser';
import { getErrorMessage } from '@/services/error';
import { logger, db } from '@/services';

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
    if (!err) {
        next();
    }

    logger.error(err);

    res.status(500).send(getErrorMessage(err));
};

const app = express();

app.use(bodyParser.json());
app.use(errorHandler);





async function init() {
    logger.info("Launching node app");

    await db.connect();

    const server = app.listen(() => {
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