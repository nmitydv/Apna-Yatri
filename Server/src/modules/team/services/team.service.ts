import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamService {
    private invitations: any[] = [];

    async inviteMember(data: any): Promise<any> {
        const invite = {
            id: `inv_${Math.random().toString(36).substr(2, 9)}`,
            ...data,
            status: 'pending',
            createdAt: new Date(),
        };
        this.invitations.push(invite);
        return invite;
    }

    async getInvitations(workspaceId: string): Promise<any[]> {
        return this.invitations.filter(i => i.workspaceId === workspaceId);
    }

    async revokeInvitation(id: string): Promise<boolean> {
        this.invitations = this.invitations.filter(i => i.id !== id);
        return true;
    }
}
