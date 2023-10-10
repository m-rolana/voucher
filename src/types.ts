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

export enum CURRENCY {
    USD = 'USD',
    EUR = 'EUR',
}

// export type ValidationSchema = {
//     [key: string]: Joi.ObjectSchema;
// };

export type ValidationSchema = Joi.ObjectSchema;

export type CreateCampaignInput = {
    startsAt?: Date;
    endsAt?: Date;
    amount?: number;
    currency?: CURRENCY;
    prefix: PREFIX;
};

export type ListCampaignInput = {
    take?: number;
    skip?: number;
};

export type DeleteCampaignInput = {
    id: string;
};

export type CreateVoucherManyInput = {
    campaignId: string;
    amount: number;
};

export type ListVoucherInput = {
    campaignId: string;
    take?: number;
    skip?: number;
};

export type ExportVouchersInput = {
    campaignId: string;
};

export type CatchErrorParams = {
    message: string;
    toLog?: boolean;
    toThrow?: boolean;
};

export type Callback = () => void;

export type MiddlewareResponse = Response | void;
export type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => MiddlewareResponse | Promise<MiddlewareResponse>;

export type Config = {
    env: string;
    isDev: boolean;
    isTest: boolean;
    port: number;
    host: string;
    urlMount: string;
    db: DBConfig;
    pageLimit: number;
    discountCode: DiscountCode;
};

export type DBConfig = {
    password: string;
    user: string;
    name: string;
    port: number;
    host: string;
};

export type DiscountCode = {
    allowedChars: string;
    length: number;
};
