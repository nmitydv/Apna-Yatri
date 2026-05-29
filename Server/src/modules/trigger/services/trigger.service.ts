import { Injectable } from '@nestjs/common';

@Injectable()
export class TriggerService {
    private triggers: any[] = [];

    async registerTrigger(data: any): Promise<any> {
        const trigger = {
            id: `trg_${Math.random().toString(36).substr(2, 9)}`,
            ...data,
            createdAt: new Date(),
        };
        this.triggers.push(trigger);
        return trigger;
    }

    async getTriggers(workspaceId: string): Promise<any[]> {
        return this.triggers.filter(t => t.workspaceId === workspaceId);
    }

    async removeTrigger(id: string): Promise<boolean> {
        this.triggers = this.triggers.filter(t => t.id !== id);
        return true;
    }
}
