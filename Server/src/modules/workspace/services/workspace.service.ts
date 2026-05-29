import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkspaceRepository } from '../repository/repositories/workspace.repository';
import { WorkspaceEntity, WorkspaceDoc } from '../repository/entities/workspace.entity';

@Injectable()
export class WorkspaceService {
    constructor(private readonly workspaceRepository: WorkspaceRepository) {}

    async createWorkspace(data: any): Promise<WorkspaceDoc> {
        return this.workspaceRepository.create({
            name: data.name,
            ownerId: data.ownerId,
            members: [{ userId: data.ownerId, role: 'owner' }],
            settings: {},
            isActive: true,
        });
    }

    async getWorkspace(id: string): Promise<WorkspaceDoc> {
        const workspace = await this.workspaceRepository.findOneById(id);
        if (!workspace) {
            throw new NotFoundException('Workspace not found');
        }
        return workspace;
    }

    async updateWorkspace(id: string, name: string): Promise<WorkspaceDoc> {
        const workspace = await this.getWorkspace(id);
        workspace.name = name;
        return workspace.save();
    }

    async deleteWorkspace(id: string): Promise<boolean> {
        const workspace = await this.getWorkspace(id);
        await this.workspaceRepository.softDelete(workspace);
        return true;
    }

    async inviteMember(id: string, userId: string, role: string): Promise<WorkspaceDoc> {
        const workspace = await this.getWorkspace(id);
        workspace.members.push({ userId, role });
        return workspace.save();
    }

    async removeMember(id: string, userId: string): Promise<WorkspaceDoc> {
        const workspace = await this.getWorkspace(id);
        workspace.members = workspace.members.filter(m => m.userId !== userId);
        return workspace.save();
    }

    async updateSettings(id: string, settings: Record<string, string>): Promise<WorkspaceDoc> {
        const workspace = await this.getWorkspace(id);
        workspace.settings = { ...workspace.settings, ...settings };
        return workspace.save();
    }
}
