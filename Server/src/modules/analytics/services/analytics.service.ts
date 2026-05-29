import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
    async getEngagementAnalytics(workspaceId: string): Promise<any> {
        return {
            workspaceId,
            openRate: 0.88,
            clickRate: 0.32,
            conversionRate: 0.12,
            revenueGenerated: 25000,
        };
    }

    async getFunnelTracking(workspaceId: string): Promise<any> {
        return {
            steps: [
                { name: 'Opened DM', count: 1000 },
                { name: 'Clicked Button', count: 650 },
                { name: 'Submitted Form', count: 320 },
                { name: 'Purchased Item', count: 120 }
            ],
            dropOffRate: '88%'
        };
    }
}
