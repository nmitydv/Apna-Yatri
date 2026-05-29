import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BroadcastService } from '../services/broadcast.service';

@ApiTags('modules.broadcast')
@Controller({
    version: '1',
    path: '/broadcast',
})
export class BroadcastController {
    constructor(private readonly broadcastService: BroadcastService) {}

    @Post('/')
    async createBroadcast(@Body() body: any) {
        return this.broadcastService.createBroadcast(body);
    }

    @Get('/workspace/:workspaceId')
    async getBroadcasts(@Param('workspaceId') workspaceId: string) {
        return this.broadcastService.getBroadcasts(workspaceId);
    }

    @Post('/:id/send')
    @HttpCode(HttpStatus.OK)
    async sendBroadcast(@Param('id') id: string) {
        return this.broadcastService.sendBroadcast(id);
    }

    @Post('/:id/cancel')
    @HttpCode(HttpStatus.OK)
    async cancelBroadcast(@Param('id') id: string) {
        return this.broadcastService.cancelBroadcast(id);
    }

    @Get('/:id/analytics')
    async getAnalytics(@Param('id') id: string) {
        return {
            broadcastId: id,
            recipientsCount: 1200,
            deliveredCount: 1198,
            openRate: '85.4%',
            clickRate: '23.1%',
        };
    }
}
