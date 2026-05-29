import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from '../services/analytics.service';

@ApiTags('modules.analytics')
@Controller({
    version: '1',
    path: '/analytics',
})
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('/engagement/:workspaceId')
    async getEngagement(@Param('workspaceId') workspaceId: string) {
        return this.analyticsService.getEngagementAnalytics(workspaceId);
    }

    @Get('/funnel/:workspaceId')
    async getFunnel(@Param('workspaceId') workspaceId: string) {
        return this.analyticsService.getFunnelTracking(workspaceId);
    }

    @Get('/rates/:workspaceId')
    async getRates(@Param('workspaceId') workspaceId: string) {
        return {
            openRate: '88.4%',
            clickRate: '31.2%',
            conversionRate: '12.0%',
        };
    }

    @Get('/retention/:workspaceId')
    async getRetention(@Param('workspaceId') workspaceId: string) {
        return {
            cohortMonth: '2026-05',
            weeks: {
                w1: '100%',
                w2: '82%',
                w3: '74%',
                w4: '68%',
            }
        };
    }
}
