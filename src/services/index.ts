import { getErrorMessage } from '@/services/error';
import logger from '@/services/logger';
import DB from '@/db';
import { createCode } from './code';
import Validator from '@/validator';
import rules from '@/validator/rules';
import * as requestService from './request';

const db = new DB(logger);
const validator = new Validator(logger, rules);

export {
    getErrorMessage,
    logger,
    db,
    createCode,
    validator,
    requestService,
};