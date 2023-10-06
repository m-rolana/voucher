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
            res.json(vouchers);
        } catch(e) {
            logger.error(e);
            return next('Failed to create vouchers');
        }
    }
}

export default VoucherController;
