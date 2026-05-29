import { Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../repository/repositories/flow.repository';
import { FlowEntity, FlowDoc } from '../repository/entities/flow.entity';

@Injectable()
export class FlowBuilderService {
    constructor(private readonly flowRepository: FlowRepository) {}

    async createFlow(data: any): Promise<FlowDoc> {
        return this.flowRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            nodes: data.nodes || [],
            edges: data.edges || [],
            version: 1,
            isPublished: false,
            analytics: { clickCount: '0', runCount: '0' },
            isActive: true,
        });
    }

    async getFlow(id: string): Promise<FlowDoc> {
        const flow = await this.flowRepository.findOneById(id);
        if (!flow) {
            throw new NotFoundException('Flow not found');
        }
        return flow;
    }

    async updateFlow(id: string, data: any): Promise<FlowDoc> {
        const flow = await this.getFlow(id);
        Object.assign(flow, data);
        return flow.save();
    }

    async duplicateFlow(id: string): Promise<FlowDoc> {
        const flow = await this.getFlow(id);
        return this.flowRepository.create({
            workspaceId: flow.workspaceId,
            name: `${flow.name} (Duplicate)`,
            nodes: flow.nodes,
            edges: flow.edges,
            version: 1,
            isPublished: false,
            analytics: { clickCount: '0', runCount: '0' },
            isActive: true,
        });
    }

    async deleteFlow(id: string): Promise<boolean> {
        const flow = await this.getFlow(id);
        await this.flowRepository.softDelete(flow);
        return true;
    }
}
