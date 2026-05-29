import { Controller, Post, Put, Delete, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CampaignService } from '../services/campaign.service';

@ApiTags('modules.campaign')
@Controller({
    version: '1',
    path: '/campaign',
})
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Post('/')
    async createCampaign(@Body() body: any) {
        return this.campaignService.createCampaign(body);
    }

    @Get('/:id')
    async getCampaign(@Param('id') id: string) {
        return this.campaignService.getCampaign(id);
    }

    @Put('/:id')
    async updateCampaign(@Param('id') id: string, @Body() body: any) {
        return this.campaignService.updateCampaign(id, body);
    }

    @Delete('/:id')
    async deleteCampaign(@Param('id') id: string) {
        return this.campaignService.deleteCampaign(id);
    }

    @Put('/:id/schedule')
    @HttpCode(HttpStatus.OK)
    async scheduleCampaign(@Param('id') id: string, @Body() body: any) {
        return this.campaignService.updateCampaign(id, { status: 'scheduled', schedule: body.schedule });
    }

    @Put('/:id/pause')
    @HttpCode(HttpStatus.OK)
    async pauseCampaign(@Param('id') id: string) {
        return this.campaignService.updateCampaign(id, { status: 'paused' });
    }

    @Put('/:id/resume')
    @HttpCode(HttpStatus.OK)
    async resumeCampaign(@Param('id') id: string) {
        return this.campaignService.updateCampaign(id, { status: 'active' });
    }

    @Get('/:id/analytics')
    async getAnalytics(@Param('id') id: string) {
        const campaign = await this.campaignService.getCampaign(id);
        return campaign.analytics;
    }

    @Post('/:id/ab-test')
    async abTesting(@Param('id') id: string, @Body() body: any) {
        return this.campaignService.updateCampaign(id, { abTestSettings: body.abTestSettings });
    }
}
