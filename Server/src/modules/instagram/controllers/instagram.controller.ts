import { Controller, Post, Get, Body, Param, Query, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InstagramService } from '../services/instagram.service';

@ApiTags('modules.instagram')
@Controller({
    version: '1',
    path: '/instagram',
})
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) {}

    @Post('/connect')
    async connectAccount(@Body() body: any) {
        return this.instagramService.connectAccount(body);
    }

    @Get('/account/:workspaceId')
    async getAccount(@Param('workspaceId') workspaceId: string) {
        return this.instagramService.getAccount(workspaceId);
    }

    @Delete('/disconnect/:workspaceId')
    async disconnectAccount(@Param('workspaceId') workspaceId: string) {
        return this.instagramService.disconnectAccount(workspaceId);
    }

    @Post('/sync/:workspaceId')
    @HttpCode(HttpStatus.OK)
    async syncProfile(@Param('workspaceId') workspaceId: string) {
        return this.instagramService.syncProfile(workspaceId);
    }

    @Get('/pages')
    async getPages(@Query('token') token: string) {
        return [
            { id: 'page_1', name: 'Brand Shop Instagram', category: 'Retail' },
            { id: 'page_2', name: 'Personal Blog', category: 'Influencer' }
        ];
    }

    @Get('/webhook')
    verifyWebhook(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string
    ) {
        if (mode === 'subscribe' && token === 'myVerifyToken') {
            return challenge;
        }
        return 'Verification failed';
    }

    @Post('/webhook')
    @HttpCode(HttpStatus.OK)
    handleWebhookEvents(@Body() body: any) {
        console.log('Received Instagram Webhook Event:', JSON.stringify(body));
        return { status: 'EVENT_RECEIVED' };
    }
}
