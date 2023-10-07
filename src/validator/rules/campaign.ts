import Joi from 'joi';
import { PREFIX, CURRENCY } from '@/types';

export default {
    create: Joi.object({
        startsAt: Joi.date().min('now'),
        endsAt: Joi.alternatives().conditional('startsAt', {
            not: Joi.exist(),
            then: Joi.date().min('now'),
            otherwise: Joi.date().greater(Joi.ref('startsAt')),
        }),
        amount: Joi.number().min(0),
        currency: Joi.string().valid(...Object.values(CURRENCY)),
        prefix: Joi.string()
            .valid(...Object.values(PREFIX))
            .required(),
    }),
    list: Joi.object({
        take: Joi.number().min(1).max(100),
        skip: Joi.number().min(0),
    }),
};
