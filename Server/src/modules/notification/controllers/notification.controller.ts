import { Controller, Post, Get, Body, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';

@ApiTags('modules.notification')
@Controller({
    version: '1',
    path: '/notification',
})
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('/send')
    async sendNotification(@Body() body: any) {
        return this.notificationService.sendNotification(body);
    }

    @Get('/user/:userId')
    async getNotifications(@Param('userId') userId: string) {
        return this.notificationService.getNotifications(userId);
    }

    @Put('/:id/read')
    async markRead(@Param('id') id: string) {
        return this.notificationService.markRead(id);
    }

    @Post('/email')
    async sendEmailNotification(@Body() body: any) {
        return { success: true, transport: 'custom_smtp', sentTo: body.email };
    }

    @Post('/push')
    async sendPushNotification(@Body() body: any) {
        return { success: true, platform: 'fcm', sentTo: body.userId };
    }
}
