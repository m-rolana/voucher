import { Stringifier, stringify } from 'csv-stringify';
import { db } from '@/services';
import { NotFoundError } from './error';
import { Callback } from '@/types';
import config from '@/config';
import _ from 'lodash';
import { Voucher } from '@/db/entities';

async function vouchersToCSV<T extends NodeJS.WritableStream>(
    campaignId: string,
    onFinish: Callback,
    destination: T,
): Promise<void> {
    const stringifier = _initStringifier(onFinish);
    const take = config.pageLimit;
    let skip = 0;

    let vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });

    if (!vouchers.length) {
        throw new NotFoundError(`There is no voucher for campaign ${campaignId}`);
    }

    while (vouchers.length) {
        _writeVouchers(stringifier, vouchers);
        stringifier.pipe(destination);
        skip += take;
        vouchers = await db.repoManager.voucherRepo.find({ where: { campaignId }, take, skip });
    }

    stringifier.end();
}

function _initStringifier(onFinish: Callback): Stringifier {
    const columns = ['id', 'created_at', 'updated_at', 'deleted_at', 'discount_code', 'campaign_id'];
    const stringifier = stringify({ header: true, columns: columns });
    stringifier.on('finish', onFinish);

    return stringifier;
}

function _transformDates<T extends object>(obj: T): T {
    if (_.isEmpty(obj)) {
        return obj;
    }

    const transformedObj: T = { ...obj };

    const dateFields = ['createdAt', 'updatedAt', 'deletedAt'];
    dateFields.forEach((key) => {
        if (key in transformedObj) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: https://github.com/microsoft/TypeScript/issues/44351
            transformedObj[key] = new Date(transformedObj[key]).toISOString();
        }
    });
    return transformedObj;
}

function _writeVouchers(stringifier: Stringifier, vouchers: Voucher[]) {
    const rows = vouchers.map((v) => {
        const transformed = _transformDates(v);
        return Object.values(transformed);
    });
    rows.forEach((r) => stringifier.write(r));
}

export { vouchersToCSV };
