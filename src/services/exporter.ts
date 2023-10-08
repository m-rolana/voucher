import { stringify } from 'csv-stringify';
import { db } from '@/services';
import { NotFoundError } from './error';
import { Callback } from '@/types';

async function vouchersToCSV<T extends NodeJS.WritableStream>(campaignId: string, onFinish: Callback, destination: T) {
    const columns = ['id', 'created_at', 'updated_at', 'deleted_at', 'discount_code', 'campaign_id'];
    const stringifier = stringify({ header: true, columns: columns });
    stringifier.on('finish', onFinish);

    const take = 1;
    let skip = 0;

    let vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });

    if (!vouchers || !vouchers.length) {
        // return next(new NotFoundError(`There is no voucher for campaign ${campaignId}`));
        throw new NotFoundError(`There is no voucher for campaign ${campaignId}`);
    }

    while (vouchers.length) {
        const rows = vouchers.map((v) => Object.values(v));
        rows.forEach((r) => stringifier.write(r));
        stringifier.pipe(destination);
        skip += take;
        vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });
    }
    stringifier.end();
}

export { vouchersToCSV };
