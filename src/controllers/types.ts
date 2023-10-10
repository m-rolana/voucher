import { Middleware } from '@/types';

export interface ICampaignController {
    create: Middleware;
    list: Middleware;
    delete: Middleware;
}

export interface IVoucherController {
    createMany: Middleware;
    list: Middleware;
    export: Middleware;
}
