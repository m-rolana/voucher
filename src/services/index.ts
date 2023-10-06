import { getErrorMessage } from '@/services/error';
import logger from '@/services/logger';
import DB from '@/db';
import { createCode } from './code';

const db = new DB(logger);

export {
    getErrorMessage,
    logger,
    db,
    createCode,
};