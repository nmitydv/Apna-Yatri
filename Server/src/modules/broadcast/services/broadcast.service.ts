import { Injectable } from '@nestjs/common';

@Injectable()
export class BroadcastService {
    private broadcasts: any[] = [];

    async createBroadcast(data: any): Promise<any> {
        const broadcast = {
            id: `brd_${Math.random().toString(36).substr(2, 9)}`,
            ...data,
            status: 'draft',
            sentCount: 0,
            createdAt: new Date(),
        };
        this.broadcasts.push(broadcast);
        return broadcast;
    }

    async getBroadcasts(workspaceId: string): Promise<any[]> {
        return this.broadcasts.filter(b => b.workspaceId === workspaceId);
    }

    async sendBroadcast(id: string): Promise<any> {
        const broadcast = this.broadcasts.find(b => b.id === id);
        if (broadcast) {
            broadcast.status = 'sent';
            broadcast.sentCount = 1200;
            broadcast.sentAt = new Date();
        }
        return broadcast;
    }

    async cancelBroadcast(id: string): Promise<any> {
        const broadcast = this.broadcasts.find(b => b.id === id);
        if (broadcast) {
            broadcast.status = 'cancelled';
        }
        return broadcast;
    }
}
