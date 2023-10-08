import { db, logger, requestService } from '@/services';
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
            // TODO: add filter
            const { take, skip } = requestService.getRequestParams(req);
            const campaigns = await db.repoManager.campaignRepo.find({ take, skip });
            res.json(campaigns);
        } catch(e) {
            logger.error(e);
            return next('Failed to list campaigns');
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            // TODO: fix Cascade option for soft delete
            const result = await db.repoManager.campaignRepo.deleteById(id, false);
            res.json({ success: result.success });
        } catch(e) {
            logger.error(e);
            return next('Failed to delete campaign');
        }
    }
}

export default CampaignController;
