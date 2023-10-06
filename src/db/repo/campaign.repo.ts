import { DataSource } from 'typeorm';
import BaseRepo from '@/db/repo/base.repo';
import { Campaign } from '@/db/entities';


class CampaignRepo extends BaseRepo {
    private modelName = Campaign.name;

    constructor(dataSource: DataSource) {
        super(dataSource, Campaign.name);
    }

}

export default CampaignRepo;