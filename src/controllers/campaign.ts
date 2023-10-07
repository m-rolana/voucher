import { db, logger } from '@/services';
import { Request, Response, NextFunction } from '@/types';



class CampaignController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const campaign = await db.repoManager.campaignRepo.create(req.body);
            res.json(campaign);
        } catch(e) {
            logger.error(e);
            return next('Failed to create campaign');
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            // TODO: add pagination & filter
            const campaigns = await db.repoManager.campaignRepo.find({});
            res.json(campaigns);
        } catch(e) {
            logger.error(e);
            return next('Failed to list campaigns');
        }
    }
}

export default CampaignController;
