import { Controller, Post, Get, Body, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';

@ApiTags('modules.platform-admin')
@Controller({
    version: '1',
    path: '/platform-admin',
})
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('/system-logs')
    async getSystemLogs() {
        return this.adminService.getSystemLogs();
    }

    @Get('/audit-logs')
    async getAuditLogs() {
        return this.adminService.getAuditLogs();
    }

    @Get('/feature-flags')
    async getFeatureFlags() {
        return this.adminService.getFeatureFlags();
    }

    @Post('/feature-flags')
    async toggleFeatureFlag(@Body() body: any) {
        return this.adminService.toggleFeatureFlag(body.flag, body.value);
    }

    @Put('/plans/:planId')
    async managePricingPlan(@Param('planId') planId: string, @Body() body: any) {
        return {
            planId,
            price: body.price,
            featuresList: body.features,
            status: 'updated_globally',
        };
    }

    @Get('/platform-analytics')
    async getPlatformAnalytics() {
        return {
            totalRegisteredUsers: 14520,
            totalWorkspaces: 3420,
            activeMFAUsers: 2310,
            totalPlatformMRR: 85400,
            averageDailyMessages: 843200,
        };
    }
}
