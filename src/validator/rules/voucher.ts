import Joi from 'joi';

export default {
    createMany: Joi.object({
        campaignId: Joi.string().uuid().required(),
        amount: Joi.number().min(1).max(100).required(),
    }),
    list: Joi.object({
        campaignId: Joi.string().uuid().required(),
    }),
    export: Joi.object({
        campaignId: Joi.string().uuid().required(),
    }),
};
