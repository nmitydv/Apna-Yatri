import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    CampaignEntity,
    CampaignSchema,
} from './entities/campaign.entity';
import { CampaignRepository } from './repositories/campaign.repository';

@Module({
    providers: [CampaignRepository],
    exports: [CampaignRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CampaignEntity.name,
                    schema: CampaignSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CampaignRepositoryModule {}
