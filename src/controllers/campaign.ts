import config from '@/config';
import { db } from '@/services';
import { getRequestParams } from '@/services/request';
import { Request, Response, CreateCampaignInput, ListCampaignInput, DeleteCampaignInput } from '@/types';
import { ICampaignController, ControllerResponse } from './types';
import { CatchError } from '@/decorators';
import { NotFoundError } from '@/services/error';

class CampaignController implements ICampaignController {
    // TODO: add doc
    @CatchError({ message: 'Failed to create campaign.' })
    async create(req: Request, res: Response): Promise<ControllerResponse> {
        const params = getRequestParams<CreateCampaignInput>(req);
        const campaign = await db.repoManager.campaignRepo.create(params);
        return res.json(campaign);
    }

    // TODO: add doc
    @CatchError({ message: 'Failed to list campaigns.' })
    async list(req: Request, res: Response): Promise<ControllerResponse> {
        // TODO: add filter
        const { take = config.pageLimit, skip = 0 } = getRequestParams<ListCampaignInput>(req);
        const campaigns = await db.repoManager.campaignRepo.find({ take, skip });
        res.json(campaigns);
    }

    // TODO: add doc
    @CatchError({ message: 'Failed to delete campaign.' })
    async delete(req: Request, res: Response): Promise<ControllerResponse> {
        const { id } = req.params as DeleteCampaignInput;
        // TODO: fix cascade option for soft delete
        const result = await db.repoManager.campaignRepo.deleteById(id, false);

        if (!result.success) {
            throw new NotFoundError('Campaign does not exist or is already deleted');
        }

        res.json({ success: true });
    }
}

export default CampaignController;
