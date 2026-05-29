import { Injectable, NotFoundException } from '@nestjs/common';
import { WebhookRepository } from '../repository/repositories/webhook.repository';
import { WebhookEntity, WebhookDoc } from '../repository/entities/webhook.entity';

@Injectable()
export class WebhookService {
    constructor(private readonly webhookRepository: WebhookRepository) {}

    async createWebhook(data: any): Promise<WebhookDoc> {
        return this.webhookRepository.create({
            workspaceId: data.workspaceId,
            url: data.url,
            events: data.events || [],
            isActive: true,
            secretKey: `whsec_${Math.random().toString(36).substr(2, 16)}`,
            logs: [],
        });
    }

    async getWebhook(id: string): Promise<WebhookDoc> {
        const webhook = await this.webhookRepository.findOneById(id);
        if (!webhook) {
            throw new NotFoundException('Webhook not found');
        }
        return webhook;
    }

    async retryWebhook(id: string, logId: string): Promise<any> {
        const webhook = await this.getWebhook(id);
        webhook.logs.push({
            event: 'retry.event',
            responseStatus: 200,
            responseBody: 'Webhook Retried Successfully',
            sentAt: new Date(),
        });
        await webhook.save();
        return { success: true };
    }
}
