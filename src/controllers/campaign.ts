import config from '@/config';
import { db } from '@/services';
import { getRequestParams } from '@/services/request';
import {
    Request,
    Response,
    CreateCampaignInput,
    ListCampaignInput,
    DeleteCampaignInput,
    MiddlewareResponse,
} from '@/types';
import { ICampaignController } from './types';
import { CatchError } from '@/decorators';
import { NotFoundError } from '@/services/error';

class CampaignController implements ICampaignController {
    /**
     * @api {post} /campaigns Create new campaign
     * @apiName create
     * @apiGroup Campaign
     *
     * @apiParam {Date} [startsAt=now]  Date, campaign starts at
     * @apiParam {Date} [endsAt=null]   Date, campaign ends at
     * @apiParam {Number} [amount=0]    Campaign amount
     * @apiParam {String="USD","EUR"} [currency="USD"]  Currency of campaign's amount
     * @apiParam {String="RECHARGE", "GIFT_CARD", "FREE_SHIPPING", "DISCOUNT"} prefix    Prefix for future discount codes
     *
     * @apiSuccess (Success HTTP) {Boolean} success     Request was successful
     * @apiSuccess (Success HTTP) {Object}  campaign     Created campaign
     * @apiSuccess (Success HTTP) {String}  campaign.id
     * @apiSuccess (Success HTTP) {String}  campaign.startsAt
     * @apiSuccess (Success HTTP) {String}  campaign.endsAt
     * @apiSuccess (Success HTTP) {Number}  campaign.amount
     * @apiSuccess (Success HTTP) {String}  campaign.currency
     * @apiSuccess (Success HTTP) {String}  campaign.prefix
     * @apiSuccess (Success HTTP) {String}  campaign.createdAt
     * @apiSuccess (Success HTTP) {String}  campaign.updatedAt
     * @apiSuccess (Success HTTP) {String}  campaign.deletedAt
     *
     * @apiSuccessExample {json} Success-HTTP-Response:
     * {
     *  "success": true,
     *   "campaign": {
     *       "prefix": "RECHARGE",
     *       "deletedAt": null,
     *       "endsAt": null,
     *       "id": "67e890e2-ff15-41eb-8690-934a27575afc",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "startsAt": "2023-10-10T10:45:59.825Z",
     *       "amount": 0,
     *       "currency": "USD"
     *   }
     * }
     */
    @CatchError({ message: 'Failed to create campaign.' })
    async create(req: Request, res: Response): Promise<MiddlewareResponse> {
        const params = getRequestParams<CreateCampaignInput>(req);
        const campaign = await db.repoManager.campaignRepo.create(params);
        return res.json({ success: true, campaign });
    }

    /**
     * @api {get} /campaigns List campaigns
     * @apiName list
     * @apiGroup Campaign
     *
     * @apiParam {Number{1-100}} [take=100] Amount of records to receive
     * @apiParam {Number} [skip=0] Amount of records to skip
     *
     * @apiSuccess (Success HTTP) {Boolean}     success             Request was successful
     * @apiSuccess (Success HTTP) {Object[]}    campaign
     * @apiSuccess (Success HTTP) {String}      campaign.id
     * @apiSuccess (Success HTTP) {String}      campaign.startsAt
     * @apiSuccess (Success HTTP) {String}      campaign.endsAt
     * @apiSuccess (Success HTTP) {Number}      campaign.amount
     * @apiSuccess (Success HTTP) {String}      campaign.currency
     * @apiSuccess (Success HTTP) {String}      campaign.prefix
     * @apiSuccess (Success HTTP) {String}      campaign.createdAt
     * @apiSuccess (Success HTTP) {String}      campaign.updatedAt
     * @apiSuccess (Success HTTP) {String}      campaign.deletedAt
     *
     * @apiSuccessExample {json} Success-HTTP-Response:
     * {
     *  "success": true,
     *   "campaign": [
     *     {
     *       "prefix": "RECHARGE",
     *       "deletedAt": null,
     *       "endsAt": null,
     *       "id": "67e890e2-ff15-41eb-8690-934a27575afc",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "startsAt": "2023-10-10T10:45:59.825Z",
     *       "amount": 100,
     *       "currency": "USD"
     *     },
     *     {
     *       "prefix": "DISCOUNT",
     *       "deletedAt": null,
     *       "endsAt": null,
     *       "id": "67e890e2-ff15-41eb-8690-934a27575af1",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "startsAt": "2023-10-10T10:45:59.825Z",
     *       "amount": 10,
     *       "currency": "USD"
     *     },
     *   ]
     * }
     */
    @CatchError({ message: 'Failed to list campaigns.' })
    async list(req: Request, res: Response): Promise<MiddlewareResponse> {
        // TODO: add filter
        const { take = config.pageLimit, skip = 0 } = getRequestParams<ListCampaignInput>(req);
        const campaigns = await db.repoManager.campaignRepo.find({ take, skip });
        res.json({ success: true, campaigns });
    }

    /**
     * @api {post} /campaigns/:id Delete campaign
     * @apiName delete
     * @apiGroup Campaign
     *
     * @apiSuccess (Success HTTP) {Boolean} success     Request was successful
     *
     * @apiSuccessExample {json} Success-HTTP-Response:
     * {
     *  "success": true,
     * }
     */
    @CatchError({ message: 'Failed to delete campaign.' })
    async delete(req: Request, res: Response): Promise<MiddlewareResponse> {
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
