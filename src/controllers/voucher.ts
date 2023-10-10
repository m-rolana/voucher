import { db } from '@/services';
import {
    Request,
    Response,
    CreateVoucherManyInput,
    ListVoucherInput,
    ExportVouchersInput,
    NextFunction,
    MiddlewareResponse,
} from '@/types';
import { IVoucherController } from './types';
import { getRequestParams } from '@/services/request';
import { CatchError } from '@/decorators';
import { NotFoundError } from '@/services/error';
import config from '@/config';
import { vouchersToCSV } from '@/services/exporter';

class VoucherController implements IVoucherController {

    /**
     * @api {post} /vouchers/batch Create new vouchers
     * @apiName create
     * @apiGroup Voucher
     *
     * @apiParam {String} campaignId    ID of campaign to create vouchers for
     * @apiParam {Number} amount        Amount of vouchers to create
     *
     * @apiSuccess (Success HTTP) {Boolean}     success     Request was successful
     * @apiSuccess (Success HTTP) {Object[]}    vouchers    Created vouchers
     * @apiSuccess (Success HTTP) {String}      vouchers.id
     * @apiSuccess (Success HTTP) {String}      vouchers.discountCode
     * @apiSuccess (Success HTTP) {String}      vouchers.campaignId
     * @apiSuccess (Success HTTP) {String}      vouchers.createdAt
     * @apiSuccess (Success HTTP) {String}      vouchers.updatedAt
     * @apiSuccess (Success HTTP) {String}      vouchers.deletedAt
     *
     * @apiSuccessExample {json} Success-HTTP-Response:
     * {
     *  "success": true,
     *  "vouchers": [
     *     {
     *       "discountCode": "RECHARGE-LUNHQC",
     *       "campaignId": "decaa6fe-c602-4752-a3b7-119ca2a947d5",
     *       "id": "67e890e2-ff15-41eb-8690-934a27575afc",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "deletedAt": null
     *     },
     *     {
     *       "discountCode": "RECHARGE-BLMAOZ",
     *       "campaignId": "decaa6fe-c602-4752-a3b7-119ca2a947d5",
     *       "id": "67e890e2-ff15-41eb-8690-934a27575af1",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "deletedAt": null
     *     },
     *   ]
     * }
     */
    @CatchError({ message: 'Failed to create vouchers.' })
    async createMany(req: Request, res: Response): Promise<MiddlewareResponse> {
        const { campaignId, amount } = getRequestParams<CreateVoucherManyInput>(req);
        const campaign = await db.repoManager.campaignRepo.findById(campaignId);

        if (!campaign) {
            throw new Error(`Campaign doesn't exist`);
        }

        const vouchers = await db.repoManager.voucherRepo.createMany(campaign.id, campaign.prefix, amount);
        res.status(200).json({ success: true, vouchers });
    }

    /**
     * @api {get} /vouchers List vouchers
     * @apiName list
     * @apiGroup Voucher
     *
     * @apiParam {String} campaignId        ID of campaign to list vouchers for
     * @apiParam {Number{1-100}} [take=100] Amount of records to receive
     * @apiParam {Number} [skip=0]          Amount of records to skip
     *
     * @apiSuccess (Success HTTP) {Boolean}     success     Request was successful
     * @apiSuccess (Success HTTP) {Object[]}    vouchers    Created vouchers
     * @apiSuccess (Success HTTP) {String}      vouchers.id
     * @apiSuccess (Success HTTP) {String}      vouchers.discountCode
     * @apiSuccess (Success HTTP) {String}      vouchers.campaignId
     * @apiSuccess (Success HTTP) {String}      vouchers.createdAt
     * @apiSuccess (Success HTTP) {String}      vouchers.updatedAt
     * @apiSuccess (Success HTTP) {String}      vouchers.deletedAt
     *
     * @apiSuccessExample {json} Success-HTTP-Response:
     * {
     *  "success": true,
     *  "vouchers": [
     *     {
     *       "discountCode": "RECHARGE-LUNHQC",
     *       "campaignId": "decaa6fe-c602-4752-a3b7-119ca2a947d5",
     *       "id": "67e890e2-ff15-41eb-8690-934a27575afc",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "deletedAt": null
     *     },
     *     {
     *       "discountCode": "RECHARGE-BLMAOZ",
     *       "campaignId": "decaa6fe-c602-4752-a3b7-119ca2a947d5",
     *       "id": "67e890e2-ff15-41eb-8690-934a27575af1",
     *       "createdAt": "2023-10-10T10:47:11.454Z",
     *       "updatedAt": "2023-10-10T10:47:11.454Z",
     *       "deletedAt": null
     *     },
     *   ]
     * }
     */
    @CatchError({ message: 'Failed to list vouchers.' })
    async list(req: Request, res: Response, next: NextFunction): Promise<MiddlewareResponse> {
        const { campaignId, take = config.pageLimit, skip = 0 } = getRequestParams<ListVoucherInput>(req);

        const vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });

        if (!vouchers.length) {
            return next(new NotFoundError(`There is no voucher for campaign ${campaignId}`));
        }

        res.status(200).json({ success: true, vouchers });
    }

    /**
     * @api {get} /vouchers/export Get vouchers as csv file
     * @apiName export
     * @apiGroup Voucher
     *
     * @apiParam {String} campaignId ID of campaign to list vouchers for
     *
     * @apiSuccess (Success 200) {File} file CSV file
     * @apiSuccessExample {File} Success-Response:
     *     HTTP/1.1 200 OK
     *     Content-Disposition: attachment; filename="vouchers_of_<campaignId>.csv"
     *     Content-Type: text/csv
     *     [CSV File Content Here]
     */
    @CatchError({ message: 'Failed to export vouchers.' })
    async export(req: Request, res: Response, next: NextFunction): Promise<MiddlewareResponse> {
        const { campaignId } = getRequestParams<ExportVouchersInput>(req);

        if (!campaignId) {
            return next(new NotFoundError(`There is no campaign with id ${campaignId}`));
        }

        const filename = `vouchers_of_${campaignId}.csv`;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

        return vouchersToCSV(
            campaignId,
            () => res.status(200).end(),
            res,
        );
    }
}

export default VoucherController;
