import { Injectable, NotFoundException } from '@nestjs/common';
import { AutomationRepository } from '../repository/repositories/automation.repository';
import { AutomationEntity, AutomationDoc } from '../repository/entities/automation.entity';

@Injectable()
export class AutomationService {
    constructor(private readonly automationRepository: AutomationRepository) {}

    async createAutomation(data: any): Promise<AutomationDoc> {
        return this.automationRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            isActive: false,
            triggers: data.triggers || [],
            steps: data.steps || [],
            analytics: { totalRuns: '0', successRate: '100%' },
            logs: [],
        });
    }

    async getAutomation(id: string): Promise<AutomationDoc> {
        const automation = await this.automationRepository.findOneById(id);
        if (!automation) {
            throw new NotFoundException('Automation not found');
        }
        return automation;
    }

    async updateAutomation(id: string, data: any): Promise<AutomationDoc> {
        const automation = await this.getAutomation(id);
        Object.assign(automation, data);
        return automation.save();
    }

    async cloneAutomation(id: string): Promise<AutomationDoc> {
        const automation = await this.getAutomation(id);
        return this.automationRepository.create({
            workspaceId: automation.workspaceId,
            name: `${automation.name} (Clone)`,
            isActive: false,
            triggers: automation.triggers,
            steps: automation.steps,
            analytics: { totalRuns: '0', successRate: '100%' },
            logs: [],
        });
    }

    async deleteAutomation(id: string): Promise<boolean> {
        const automation = await this.getAutomation(id);
        await this.automationRepository.softDelete(automation);
        return true;
    }
}
