import { Controller, Post, Put, Delete, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspaceService } from '../services/workspace.service';

@ApiTags('modules.workspace')
@Controller({
    version: '1',
    path: '/workspace',
})
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) {}

    @Post('/')
    async createWorkspace(@Body() body: any) {
        return this.workspaceService.createWorkspace(body);
    }

    @Get('/:id')
    async getWorkspace(@Param('id') id: string) {
        return this.workspaceService.getWorkspace(id);
    }

    @Put('/:id')
    async updateWorkspace(@Param('id') id: string, @Body() body: any) {
        return this.workspaceService.updateWorkspace(id, body.name);
    }

    @Delete('/:id')
    async deleteWorkspace(@Param('id') id: string) {
        return this.workspaceService.deleteWorkspace(id);
    }

    @Post('/:id/invite')
    async inviteMember(@Param('id') id: string, @Body() body: any) {
        return this.workspaceService.inviteMember(id, body.userId, body.role);
    }

    @Post('/:id/remove')
    @HttpCode(HttpStatus.OK)
    async removeMember(@Param('id') id: string, @Body() body: any) {
        return this.workspaceService.removeMember(id, body.userId);
    }

    @Put('/:id/settings')
    async updateSettings(@Param('id') id: string, @Body() body: any) {
        return this.workspaceService.updateSettings(id, body.settings);
    }

    @Get('/:id/analytics')
    async getWorkspaceAnalytics(@Param('id') id: string) {
        return {
            workspaceId: id,
            totalSubscribers: 1450,
            activeCampaigns: 4,
            monthlyMessageLimit: 10000,
            messagesSentThisMonth: 3420,
        };
    }
}
