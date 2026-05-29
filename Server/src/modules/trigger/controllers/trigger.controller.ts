import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TriggerService } from '../services/trigger.service';

@ApiTags('modules.trigger')
@Controller({
    version: '1',
    path: '/trigger',
})
export class TriggerController {
    constructor(private readonly triggerService: TriggerService) {}

    @Post('/register')
    async registerTrigger(@Body() body: any) {
        return this.triggerService.registerTrigger(body);
    }

    @Get('/workspace/:workspaceId')
    async getTriggers(@Param('workspaceId') workspaceId: string) {
        return this.triggerService.getTriggers(workspaceId);
    }

    @Delete('/:id')
    async removeTrigger(@Param('id') id: string) {
        return this.triggerService.removeTrigger(id);
    }

    @Post('/keyword')
    async keywordTrigger(@Body() body: any) {
        return { triggered: true, triggerType: 'keyword', keyword: body.keyword };
    }

    @Post('/comment')
    async commentTrigger(@Body() body: any) {
        return { triggered: true, triggerType: 'comment', mediaId: body.mediaId };
    }

    @Post('/story-mention')
    async storyMentionTrigger(@Body() body: any) {
        return { triggered: true, triggerType: 'story-mention', user: body.user };
    }

    @Post('/dm')
    async dmTrigger(@Body() body: any) {
        return { triggered: true, triggerType: 'dm', text: body.text };
    }

    @Post('/follow')
    async followTrigger(@Body() body: any) {
        return { triggered: true, triggerType: 'follow', follower: body.follower };
    }

    @Post('/unfollow')
    async unfollowTrigger(@Body() body: any) {
        return { triggered: true, triggerType: 'unfollow', user: body.user };
    }
}
