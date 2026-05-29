import { Injectable, NotFoundException } from '@nestjs/common';
import { CampaignRepository } from '../repository/repositories/campaign.repository';
import { CampaignEntity, CampaignDoc } from '../repository/entities/campaign.entity';

@Injectable()
export class CampaignService {
    constructor(private readonly campaignRepository: CampaignRepository) {}

    async createCampaign(data: any): Promise<CampaignDoc> {
        return this.campaignRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            status: 'draft',
            audienceSegmentId: data.audienceSegmentId,
            flowId: data.flowId,
            schedule: data.schedule,
            analytics: { sent: '0', clicks: '0', conversions: '0' },
            abTestSettings: {},
            isActive: true,
        });
    }

    async getCampaign(id: string): Promise<CampaignDoc> {
        const campaign = await this.campaignRepository.findOneById(id);
        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }
        return campaign;
    }

    async updateCampaign(id: string, data: any): Promise<CampaignDoc> {
        const campaign = await this.getCampaign(id);
        Object.assign(campaign, data);
        return campaign.save();
    }

    async deleteCampaign(id: string): Promise<boolean> {
        const campaign = await this.getCampaign(id);
        await this.campaignRepository.softDelete(campaign);
        return true;
    }
}
