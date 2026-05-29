import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepository } from '../repository/repositories/message.repository';
import { MessageEntity, MessageDoc } from '../repository/entities/message.entity';

@Injectable()
export class MessagingService {
    constructor(private readonly messageRepository: MessageRepository) {}

    async sendMessage(data: any): Promise<MessageDoc> {
        return this.messageRepository.create({
            workspaceId: data.workspaceId,
            contactId: data.contactId,
            direction: 'outbound',
            platform: data.platform || 'instagram',
            content: data.content,
            attachments: data.attachments || [],
            reactions: [],
            status: 'sent',
            scheduledFor: data.scheduledFor,
            isDraft: data.isDraft || false,
            metadata: data.metadata || {},
            isActive: true,
        });
    }

    async receiveMessage(data: any): Promise<MessageDoc> {
        return this.messageRepository.create({
            workspaceId: data.workspaceId,
            contactId: data.contactId,
            direction: 'inbound',
            platform: data.platform || 'instagram',
            content: data.content,
            attachments: data.attachments || [],
            reactions: [],
            status: 'delivered',
            isDraft: false,
            metadata: data.metadata || {},
            isActive: true,
        });
    }

    async getHistory(workspaceId: string, contactId: string): Promise<MessageDoc[]> {
        return this.messageRepository.findAll({ workspaceId, contactId });
    }

    async addReaction(id: string, reaction: string): Promise<MessageDoc> {
        const message = await this.messageRepository.findOneById(id);
        if (!message) {
            throw new NotFoundException('Message not found');
        }
        if (!message.reactions.includes(reaction)) {
            message.reactions.push(reaction);
            await message.save();
        }
        return message;
    }

    async updateStatus(id: string, status: string): Promise<MessageDoc> {
        const message = await this.messageRepository.findOneById(id);
        if (!message) {
            throw new NotFoundException('Message not found');
        }
        message.status = status;
        return message.save();
    }
}
