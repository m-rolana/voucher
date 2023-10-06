import express from 'express';

export type Request = express.Request;
export type Response = express.Response;
export type NextFunction = express.NextFunction;

export enum PREFIX {
    RECHARGE = 'RECHARGE',
    GIFT_CARD = 'GIFT_CARD',
    FREE_SHIPPING = 'FREE_SHIPPING',
    DISCOUNT = 'DISCOUNT',
}