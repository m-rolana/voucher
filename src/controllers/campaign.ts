import { db, logger } from '@/services';
import { Request, Response, NextFunction } from '@/types';



class CampaignController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const campaign = await db.repoManager.campaignRepo.save(req.body);
            res.json(campaign);
        } catch(e) {
            logger.error(e);
            return next('Failed to create campaign');
        }
    }
}

export default CampaignController;
