import config from '@/config';
import { db, logger } from '@/services';
import { getRequestParams } from '@/services/request';
import { InternalError } from '@/services/error';
import { Request, Response, NextFunction, CreateCampaignInput, ListCampaignInput, DeleteCampaignInput } from '@/types';
import { ICampaignController, ControllerResponse } from './types';

class CampaignController implements ICampaignController {
    // TODO: add doc
    async create(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        try {
            const params = getRequestParams<CreateCampaignInput>(req);
            const campaign = await db.repoManager.campaignRepo.create(params);
            return res.json(campaign);
        } catch (e) {
            logger.error(e);
            const message = 'Failed to create campaign.';
            return next(new InternalError(message));
        }
    }

    // TODO: add doc
    async list(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        try {
            // TODO: add filter
            const { take = config.pageLimit, skip = 0 } = getRequestParams<ListCampaignInput>(req);
            const campaigns = await db.repoManager.campaignRepo.find({ take, skip });
            res.json(campaigns);
        } catch (e) {
            logger.error(e);
            const message = 'Failed to list campaigns.';
            return next(new InternalError(message));
        }
    }

    // TODO: add doc
    async delete(req: Request, res: Response, next: NextFunction): Promise<ControllerResponse> {
        try {
            const { id } = req.params as DeleteCampaignInput;
            // TODO: fix Cascade option for soft delete
            const result = await db.repoManager.campaignRepo.deleteById(id, false);
            res.json({ success: result.success });
        } catch (e) {
            logger.error(e);
            const message = 'Failed to delete campaign.';
            return next(new InternalError(message));
        }
    }
}

export default CampaignController;
