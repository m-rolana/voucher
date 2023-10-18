import { DataSource } from 'typeorm';
import CampaignRepo from '@/db/repo/campaign.repo';
import VoucherRepo from '@/db/repo/voucher.repo';

export type Repo = ReturnType<DataSource['getRepository']>;

export interface IRepoManager {
    readonly campaignRepo: CampaignRepo;
    readonly voucherRepo: VoucherRepo;
}

export type DeleteResult = {
    success: boolean;
};
