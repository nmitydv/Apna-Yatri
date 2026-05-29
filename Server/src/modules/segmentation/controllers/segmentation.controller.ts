import { Controller, Post, Delete, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SegmentationService } from '../services/segmentation.service';

@ApiTags('modules.segmentation')
@Controller({
    version: '1',
    path: '/segmentation',
})
export class SegmentationController {
    constructor(private readonly segmentationService: SegmentationService) {}

    @Post('/')
    async createSegment(@Body() body: any) {
        return this.segmentationService.createSegment(body);
    }

    @Post('/preview')
    async getAudiencePreview(@Body() body: any) {
        const count = await this.segmentationService.getAudiencePreview(body.filters || {});
        return { count };
    }

    @Get('/:id/analytics')
    async getSegmentAnalytics(@Param('id') id: string) {
        return {
            segmentId: id,
            growthPercentage: '+14.2%',
            activeSubscribersCount: 840,
            unsubscribedThisMonth: 12,
        };
    }
}
