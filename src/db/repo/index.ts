import { DataSource } from "typeorm";
import CampaignRepo from '@/db/repo/campaign.repo';
import VoucherRepo from '@/db/repo/voucher.repo';
import { IRepoManager } from "../types";


class RepoManager implements IRepoManager {
    readonly _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
    }

    get campaignRepo() {
        return new CampaignRepo(this._dataSource);
    }

    get voucherRepo() {
        return new VoucherRepo(this._dataSource);
    }
}

export default RepoManager;