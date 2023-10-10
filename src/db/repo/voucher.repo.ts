import { DataSource } from 'typeorm';
import BaseRepo from '@/db/repo/base.repo';
import { Voucher } from '@/db/entities';
import { createCode } from '@/services';
import { PREFIX } from '@/types';


class VoucherRepo extends BaseRepo {
    protected readonly modelName = 'voucher';

    constructor(dataSource: DataSource) {
        super(dataSource, Voucher.name);
    }

    async createMany(campaignId: string, campaignPrefix: PREFIX, amount: number): Promise<Voucher[]> {
        const valuesTemplate = new Array(amount).fill('*');
        const values = valuesTemplate.map(() => ({
            campaignId,
            discountCode: `${campaignPrefix}-${createCode()}`,
        }));

        const result = await this.repo
            .createQueryBuilder()
            .insert()
            .returning('*')
            .values(values)
            .execute();

        return result.generatedMaps as Voucher[];
    }

    async find(options: object): Promise<Voucher[]> {
        return this.repo.find(options) as unknown as Voucher[];
    }
}

export default VoucherRepo;