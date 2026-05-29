import { Injectable, NotFoundException } from '@nestjs/common';
import { InstagramRepository } from '../repository/repositories/instagram.repository';
import { InstagramEntity, InstagramDoc } from '../repository/entities/instagram.entity';

@Injectable()
export class InstagramService {
    constructor(private readonly instagramRepository: InstagramRepository) {}

    async connectAccount(data: any): Promise<InstagramDoc> {
        return this.instagramRepository.create({
            workspaceId: data.workspaceId,
            accountId: data.accountId,
            accountName: data.accountName,
            accessToken: data.accessToken,
            status: 'connected',
            health: { status: 'healthy', lastSynced: new Date().toISOString() },
            isActive: true,
        });
    }

    async getAccount(workspaceId: string): Promise<InstagramDoc> {
        const account = await this.instagramRepository.findOne({ workspaceId });
        if (!account) {
            throw new NotFoundException('Instagram integration not found for this workspace');
        }
        return account;
    }

    async disconnectAccount(workspaceId: string): Promise<boolean> {
        const account = await this.getAccount(workspaceId);
        await this.instagramRepository.softDelete(account);
        return true;
    }

    async syncProfile(workspaceId: string): Promise<InstagramDoc> {
        const account = await this.getAccount(workspaceId);
        account.health = { status: 'healthy', lastSynced: new Date().toISOString() };
        return account.save();
    }
}
