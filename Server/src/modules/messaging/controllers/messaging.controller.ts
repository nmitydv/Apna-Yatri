import { Controller, Post, Put, Delete, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagingService } from '../services/messaging.service';

@ApiTags('modules.messaging')
@Controller({
    version: '1',
    path: '/messaging',
})
export class MessagingController {
    constructor(private readonly messagingService: MessagingService) {}

    @Post('/send')
    async sendMessage(@Body() body: any) {
        return this.messagingService.sendMessage(body);
    }

    @Post('/receive')
    async receiveMessage(@Body() body: any) {
        return this.messagingService.receiveMessage(body);
    }

    @Get('/history/:workspaceId/:contactId')
    async getHistory(
        @Param('workspaceId') workspaceId: string,
        @Param('contactId') contactId: string
    ) {
        return this.messagingService.getHistory(workspaceId, contactId);
    }

    @Post('/:id/reaction')
    async addReaction(@Param('id') id: string, @Body() body: any) {
        return this.messagingService.addReaction(id, body.reaction);
    }

    @Put('/:id/status')
    async updateStatus(@Param('id') id: string, @Body() body: any) {
        return this.messagingService.updateStatus(id, body.status);
    }

    // Templates APIs
    @Post('/templates')
    async createTemplate(@Body() body: any) {
        return { id: 'tpl_1', name: body.name, content: body.content, status: 'approved' };
    }

    @Get('/templates/:workspaceId')
    async getTemplates(@Param('workspaceId') workspaceId: string) {
        return [
            { id: 'tpl_1', name: 'Welcome Message', content: 'Hi {{name}}, welcome to our service!' },
            { id: 'tpl_2', name: 'Discount Code', content: 'Here is your 20% code: DISCOUNT20' }
        ];
    }

    // Inbox conversation status APIs
    @Put('/conversations/:id/open')
    async openConversation(@Param('id') id: string) {
        return { conversationId: id, status: 'open' };
    }

    @Put('/conversations/:id/close')
    async closeConversation(@Param('id') id: string) {
        return { conversationId: id, status: 'closed' };
    }

    @Post('/attachments/upload')
    async uploadAttachment(@Body() body: any) {
        return { url: 'https://cdn.mychatplatform.com/attachments/photo_123.jpg', mimeType: 'image/jpeg' };
    }
}
