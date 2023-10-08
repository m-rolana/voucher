import Joi from 'joi';

export default {
    createMany: Joi.object({
        campaignId: Joi.string().uuid().required(),
        amount: Joi.number().min(1).max(100).required(),
    }),
    list: Joi.object({
        campaignId: Joi.string().uuid().required(),
        take: Joi.number().min(1).max(100),
        skip: Joi.number().min(0),
    }),
    export: Joi.object({
        campaignId: Joi.string().uuid().required(),
    }),
};
