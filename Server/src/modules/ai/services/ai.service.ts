import { Injectable, NotFoundException } from '@nestjs/common';
import { AiAgentRepository } from '../repository/repositories/ai-kb.repository';
import { AiAgentEntity, AiAgentDoc } from '../repository/entities/ai-kb.entity';

@Injectable()
export class AiService {
    constructor(private readonly aiAgentRepository: AiAgentRepository) {}

    async createAgent(data: any): Promise<AiAgentDoc> {
        return this.aiAgentRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            content: data.content || '',
            prompts: data.prompts || [],
            agentSettings: data.agentSettings || {},
            isActive: true,
        });
    }

    async getAgent(id: string): Promise<AiAgentDoc> {
        const agent = await this.aiAgentRepository.findOneById(id);
        if (!agent) {
            throw new NotFoundException('AI Agent not found');
        }
        return agent;
    }

    async updateAgent(id: string, data: any): Promise<AiAgentDoc> {
        const agent = await this.getAgent(id);
        Object.assign(agent, data);
        return agent.save();
    }

    async deleteAgent(id: string): Promise<boolean> {
        const agent = await this.getAgent(id);
        await this.aiAgentRepository.softDelete(agent);
        return true;
    }

    async generateReply(text: string): Promise<string> {
        return `AI Response to: "${text}" - Structured using prompt templates.`;
    }
}
