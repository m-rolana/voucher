import { db } from '@/services';
import {
    Request,
    Response,
    CreateVoucherManyInput,
    ListVoucherInput,
    ExportVouchersInput,
    NextFunction,
} from '@/types';
import { IVoucherController, ControllerResponse } from './types';
import { getRequestParams } from '@/services/request';
import { CatchError } from '@/decorators';
import { NotFoundError } from '@/services/error';
import config from '@/config';
import { vouchersToCSV } from '@/services/exporter';

class VoucherController implements IVoucherController {
    // TODO: add doc
    @CatchError({ message: 'Failed to create vouchers.' })
    async createMany(req: Request, res: Response): Promise<ControllerResponse> {
        const { campaignId, amount } = getRequestParams<CreateVoucherManyInput>(req);
        const campaign = await db.repoManager.campaignRepo.findById(campaignId);

        if (!campaign) {
            throw new Error(`Campaign doesn't exist`);
        }

        const vouchers = await db.repoManager.voucherRepo.createMany(campaign.id, campaign.prefix, amount);
        res.status(200).json(vouchers);
    }

    // TODO: add doc
    @CatchError({ message: 'Failed to list vouchers.' })
    async list(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        const { campaignId, take = config.pageLimit, skip = 0 } = getRequestParams<ListVoucherInput>(req);

        const vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });

        if (!vouchers || !vouchers.length) {
            return next(new NotFoundError(`There is no voucher for campaign ${campaignId}`));
        }

        res.status(200).json(vouchers);
    }

    // TODO: add doc
    @CatchError({ message: 'Failed to export vouchers.' })
    async export(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        const { campaignId } = getRequestParams<ExportVouchersInput>(req);

        if (!campaignId) {
            return next(new NotFoundError(`There is no campaign with id ${campaignId}`));
        }

        const filename = `vouchers_of_${campaignId}.csv`;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

        return vouchersToCSV(
            campaignId,
            () => res.status(200).end(),
            res,
        );
    }
}

export default VoucherController;
