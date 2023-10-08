import { Request, Response, NextFunction } from '@/types';

export type ControllerResponse = Response | void
export type Controller = (req: Request, res: Response, next: NextFunction) => ControllerResponse | Promise<ControllerResponse>

export interface ICampaignController {
    create: Controller,
    list: Controller,
    delete: Controller,
}

export interface IVoucherController {
    createMany: Controller,
    list: Controller,
    export: Controller,
}
