import { DataSource } from 'typeorm';
import CampaignRepo from '@/db/repo/campaign.repo';

export type Repo = ReturnType<DataSource["getRepository"]>;

export interface IRepoManager {
    readonly _dataSource: DataSource;

    get campaignRepo(): CampaignRepo;
}

export type DeleteResult = {
    success: boolean,
};