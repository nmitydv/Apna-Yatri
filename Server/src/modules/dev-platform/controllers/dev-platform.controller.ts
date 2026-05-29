import { Controller, Post, Get, Body, Param, Query, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DevPlatformService } from '../services/dev-platform.service';

@ApiTags('modules.developer-platform')
@Controller({
    version: '1',
    path: '/dev-platform',
})
export class DevPlatformController {
    constructor(private readonly devService: DevPlatformService) {}

    @Post('/api-keys')
    async generateKey(@Body() body: any) {
        const key = await this.devService.generateKey(body.workspaceId);
        return { key };
    }

    @Delete('/api-keys/:key')
    async revokeKey(@Param('key') key: string) {
        return this.devService.revokeKey(key);
    }

    @Get('/api-usage/:workspaceId')
    async getUsage(@Param('workspaceId') workspaceId: string) {
        return {
            workspaceId,
            totalRequests: 24500,
            rateLimitLimit: 60,
            rateLimitRemaining: 58,
            resetTime: new Date(Date.now() + 60000),
        };
    }

    @Post('/oauth-apps')
    async createOauthApp(@Body() body: any) {
        return {
            clientId: `cli_${Math.random().toString(36).substr(2, 16)}`,
            clientSecret: `sec_${Math.random().toString(36).substr(2, 24)}`,
            redirectUri: body.redirectUri,
            name: body.appName,
        };
    }

    @Get('/sdk/downloads')
    async getSdkDownloads() {
        return [
            { language: 'Node.js', url: 'https://sdk.mychatplatform.com/node/mychat-sdk-latest.tgz', version: 'v1.4.2' },
            { language: 'Python', url: 'https://sdk.mychatplatform.com/python/mychat-sdk-latest.tar.gz', version: 'v1.1.0' }
        ];
    }
}
