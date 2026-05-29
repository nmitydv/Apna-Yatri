import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { ContactRepositoryModule } from 'src/modules/contact/repository/contact.repository.module';
import { MessageRepositoryModule } from 'src/modules/messaging/repository/message.repository.module';
import { CampaignRepositoryModule } from 'src/modules/campaign/repository/campaign.repository.module';

@Module({
    controllers: [DashboardController],
    providers: [DashboardService],
    exports: [DashboardService],
    imports: [
        ContactRepositoryModule,
        MessageRepositoryModule,
        CampaignRepositoryModule
    ],
})
export class DashboardModule {}
