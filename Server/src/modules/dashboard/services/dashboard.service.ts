import { Injectable } from '@nestjs/common';
import { ContactRepository } from 'src/modules/contact/repository/repositories/contact.repository';
import { MessageRepository } from 'src/modules/messaging/repository/repositories/message.repository';
import { CampaignRepository } from 'src/modules/campaign/repository/repositories/campaign.repository';

@Injectable()
export class DashboardService {
    constructor(
        private readonly contactRepository: ContactRepository,
        private readonly messageRepository: MessageRepository,
        private readonly campaignRepository: CampaignRepository
    ) {}

    async getOverview(workspaceId: string): Promise<any> {
        const contactCount = await this.contactRepository.getTotal({ workspaceId });
        const messageCount = await this.messageRepository.getTotal({ workspaceId });
        const campaignCount = await this.campaignRepository.getTotal({ workspaceId });

        return {
            totals: {
                subscribers: contactCount,
                messagesSent: messageCount,
                campaignsActive: campaignCount,
                revenueGenerated: 1420.50,
            },
            growthPercent: '+12.4%',
            recentCampaigns: [
                { name: 'Instagram Flash Sale', openRate: '88%', status: 'completed' },
                { name: 'Weekly Newsletter DM', openRate: '92%', status: 'active' }
            ],
            channelUsage: {
                instagram: '82%',
                email: '12%',
                sms: '6%',
            }
        };
    }
}
