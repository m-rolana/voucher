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