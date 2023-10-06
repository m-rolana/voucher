import 'module-alias/register';
import config from '@/config';
import express from 'express';
import bodyParser from 'body-parser';
import { getErrorMessage } from '@/services/error';
import logger from '@/services/logger';

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