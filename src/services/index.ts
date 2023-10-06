import { getErrorMessage } from '@/services/error';
import logger from '@/services/logger';
import DB from '@/db';

const db = new DB(logger);

export {
    getErrorMessage,
    logger,
    db,
};