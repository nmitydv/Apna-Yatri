import { Controller, Post, Get, Body, Param, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamService } from '../services/team.service';

@ApiTags('modules.team')
@Controller({
    version: '1',
    path: '/team',
})
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post('/invite')
    async inviteTeamMember(@Body() body: any) {
        return this.teamService.inviteMember(body);
    }

    @Get('/invitations/:workspaceId')
    async getInvitations(@Param('workspaceId') workspaceId: string) {
        return this.teamService.getInvitations(workspaceId);
    }

    @Delete('/invitations/:id')
    async revokeInvitation(@Param('id') id: string) {
        return this.teamService.revokeInvitation(id);
    }

    @Post('/role-change')
    async changeRole(@Body() body: any) {
        return { success: true, userId: body.userId, newRole: body.role };
    }

    @Get('/activity/:workspaceId')
    async getTeamActivity(@Param('workspaceId') workspaceId: string) {
        return [
            { timestamp: new Date(), action: 'invite_member', performer: 'owner@workspace.com', target: 'dev@workspace.com' },
            { timestamp: new Date(), action: 'change_settings', performer: 'owner@workspace.com', target: 'general_settings' }
        ];
    }
}
