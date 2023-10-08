import config from '@/config';
import { db, logger, requestService } from '@/services';
import { Request, Response, NextFunction, CreateCampaignInput, ListCampaignInput, DeleteCampaignInput } from '@/types';
import { ICampaignController, ControllerResponse } from './types';

const { getRequestParams } = requestService;

class CampaignController implements ICampaignController {
    async create(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        try {
            const params = getRequestParams<CreateCampaignInput>(req);
            const campaign = await db.repoManager.campaignRepo.create(params);
            return res.json(campaign);
        } catch (e) {
            logger.error(e);
            return next('Failed to create campaign');
        }
    }

    async list(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        try {
            // TODO: add filter
            const { take = config.pageLimit, skip = 0 } = getRequestParams<ListCampaignInput>(req);
            const campaigns = await db.repoManager.campaignRepo.find({ take, skip });
            res.json(campaigns);
        } catch (e) {
            logger.error(e);
            return next('Failed to list campaigns');
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        try {
            const { id } = req.params as DeleteCampaignInput;
            // TODO: fix Cascade option for soft delete
            const result = await db.repoManager.campaignRepo.deleteById(id, false);
            res.json({ success: result.success });
        } catch (e) {
            logger.error(e);
            return next('Failed to delete campaign');
        }
    }
}

export default CampaignController;
