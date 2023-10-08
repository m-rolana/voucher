import express from 'express';
import Joi from 'joi';

export type Request = express.Request;
export type Response = express.Response;
export type NextFunction = express.NextFunction;

export enum PREFIX {
    RECHARGE = 'RECHARGE',
    GIFT_CARD = 'GIFT_CARD',
    FREE_SHIPPING = 'FREE_SHIPPING',
    DISCOUNT = 'DISCOUNT',
}

export enum CURRENCY { USD = 'USD', EUR = 'EUR' }

// export type ValidationSchema = {
//     [key: string]: Joi.ObjectSchema;
// };

export type ValidationSchema = Joi.ObjectSchema;

export type CreateCampaignInput = {
    startsAt?: Date
    endsAt?: Date
    amount?: number
    currency?: CURRENCY
    prefix: PREFIX
}

export type ListCampaignInput = {
    take?: number
    skip?: number
}

export type DeleteCampaignInput = {
    id: string
}

export type CreateVoucherManyInput = {
    campaignId: string
    amount: number
}

export type ListVoucherInput = {
    campaignId: string
}

export type ExportVouchersInput = {
    campaignId: string
}

export type CatchErrorParams = {
    message: string,
    toLog?: boolean,
    toThrow?: boolean,
}