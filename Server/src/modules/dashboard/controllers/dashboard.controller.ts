import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from '../services/dashboard.service';

@ApiTags('modules.dashboard')
@Controller({
    version: '1',
    path: '/dashboard',
})
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('/overview/:workspaceId')
    async getOverview(@Param('workspaceId') workspaceId: string) {
        return this.dashboardService.getOverview(workspaceId);
    }

    @Get('/revenue/:workspaceId')
    async getRevenueStats(@Param('workspaceId') workspaceId: string) {
        return {
            mrr: 1250,
            arr: 15000,
            ltv: 240,
            churnRate: '1.2%',
        };
    }

    @Get('/messages/:workspaceId')
    async getMessageStats(@Param('workspaceId') workspaceId: string) {
        return {
            sent: 8432,
            delivered: 8412,
            failed: 20,
            incoming: 1234,
        };
    }

    @Post('/export-reports')
    async exportReports(@Body() body: any) {
        return {
            downloadUrl: 'https://cdn.mychatplatform.com/reports/dashboard_analytics_202605.pdf',
            status: 'ready',
        };
    }
}
