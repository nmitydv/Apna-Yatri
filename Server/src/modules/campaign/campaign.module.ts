import { Module } from '@nestjs/common';
import { CampaignController } from './controllers/campaign.controller';
import { CampaignService } from './services/campaign.service';
import { CampaignRepositoryModule } from './repository/campaign.repository.module';

@Module({
    controllers: [CampaignController],
    providers: [CampaignService],
    exports: [CampaignService],
    imports: [CampaignRepositoryModule],
})
export class CampaignModule {}
