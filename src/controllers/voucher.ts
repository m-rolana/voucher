import { db, logger } from '@/services';
import { Request, Response, NextFunction } from '@/types';



class VoucherController {
    async createMany(req: Request, res: Response, next: NextFunction) {
        try {
            const { campaignId, amount } = req.body;
            const campaign = await db.repoManager.campaignRepo.findById(campaignId);

            if (!campaign) {
                throw new Error(`Campaign doesn't exist`);
            }

            const vouchers = await db.repoManager.voucherRepo.createMany(campaign.id, campaign.prefix, amount);
            res.status(200).json(vouchers);
        } catch(e) {
            logger.error(e);
            return next('Failed to create vouchers');
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const { campaignId } = req.query;

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
        } catch(e) {
            logger.error(e);
            return next('Failed to create vouchers');
        }
    }
}

export default VoucherController;
