import { db, logger } from '@/services';
import { Request, Response, CreateVoucherManyInput, ListVoucherInput, ExportVouchersInput } from '@/types';
import { stringify } from 'csv-stringify';
import { IVoucherController, ControllerResponse } from './types';
import { getRequestParams } from '@/services/request';
import { CatchError } from '@/decorators';

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
    // TODO: add pagination
    @CatchError({ message: 'Failed to list vouchers.' })
    async list(req: Request, res: Response): Promise<ControllerResponse> {
        const { campaignId } = getRequestParams<ListVoucherInput>(req);

        if (!campaignId) {
            const message = `Invalid campaign id: ${campaignId}`;
            logger.error(message);
            return res.status(400).json({ success: false });
        }

        const vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId } });

        if (!vouchers || !vouchers.length) {
            const message = `There is no voucher for campaign ${campaignId}`;
            logger.error(message);
            return res.status(404).json({ success: false });
        }

        res.status(200).json(vouchers);

    }

    // TODO: add doc
    @CatchError({ message: 'Failed to export vouchers.' })
    async export(req: Request, res: Response): Promise<ControllerResponse> {
        const { campaignId } = getRequestParams<ExportVouchersInput>(req);

        if (!campaignId) {
            const message = `Invalid campaign id: ${campaignId}`;
            logger.error(message);
            return res.status(400).json({ success: false });
        }

        const filename = 'saved_from_db.csv';
        const columns = ['id', 'created_at', 'updated_at', 'deleted_at', 'discount_code', 'campaign_id'];
        const stringifier = stringify({ header: true, columns: columns });
        stringifier.on('finish', () => {
            return res.status(200).end()
        });
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

        const take = 1;
        let skip = 0;

        let vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });

        if (!vouchers || !vouchers.length) {
            const message = `There is no voucher for campaign ${campaignId}`;
            logger.error(message);
            return res.status(404).json({ success: false });
        }

        while (vouchers.length) {
            const rows = vouchers.map(v => Object.values(v));
            rows.forEach(r => stringifier.write(r));
            stringifier.pipe(res);
            skip += take;
            vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });
        }
        stringifier.end();
    }
}

export default VoucherController;
