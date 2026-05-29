import { Controller, Post, Get, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebhookService } from '../services/webhook.service';

@ApiTags('modules.webhook')
@Controller({
    version: '1',
    path: '/webhook',
})
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post('/')
    async createWebhook(@Body() body: any) {
        return this.webhookService.createWebhook(body);
    }

    @Get('/:id')
    async getWebhook(@Param('id') id: string) {
        return this.webhookService.getWebhook(id);
    }

    @Post('/:id/retry/:logId')
    @HttpCode(HttpStatus.OK)
    async retryWebhook(@Param('id') id: string, @Param('logId') logId: string) {
        return this.webhookService.retryWebhook(id, logId);
    }

    @Get('/:id/logs')
    async getLogs(@Param('id') id: string) {
        const webhook = await this.webhookService.getWebhook(id);
        return webhook.logs;
    }
}
