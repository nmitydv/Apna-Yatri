import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    CampaignDoc,
    CampaignEntity,
} from '../entities/campaign.entity';

@Injectable()
export class CampaignRepository extends DatabaseMongoUUIDRepositoryAbstract<
    CampaignEntity,
    CampaignDoc
> {
    constructor(
        @DatabaseModel(CampaignEntity.name)
        private readonly campaignModel: Model<CampaignEntity>
    ) {
        super(campaignModel);
    }
}
