import { DataSource } from 'typeorm';
import BaseRepo from '@/db/repo/base.repo';
import { Campaign } from '@/db/entities';
import { CreateCampaignInput } from "@/types";


class CampaignRepo extends BaseRepo {
    protected readonly modelName = 'campaign';

    constructor(dataSource: DataSource) {
        super(dataSource, Campaign.name);
    }

    create(data: CreateCampaignInput): Promise<Campaign> {
        return this.repo.save(data as Campaign);
    }
}

export default CampaignRepo;