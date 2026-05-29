import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaggingService } from '../services/tagging.service';

@ApiTags('modules.tagging')
@Controller({
    version: '1',
    path: '/tagging',
})
export class TaggingController {
    constructor(private readonly taggingService: TaggingService) {}

    @Post('/')
    async createTag(@Body() body: any) {
        return this.taggingService.createTag(body.workspaceId, body.tag);
    }

    @Post('/assign')
    async assignTag(@Body() body: any) {
        return this.taggingService.assignTag(body.contactId, body.tag);
    }

    @Post('/remove')
    async removeTag(@Body() body: any) {
        return this.taggingService.removeTag(body.contactId, body.tag);
    }

    @Post('/bulk')
    async bulkAssignTags(@Body() body: any) {
        return this.taggingService.bulkAssignTags(body.contactIds, body.tag);
    }
}
