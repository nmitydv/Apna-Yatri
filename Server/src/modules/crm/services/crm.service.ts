import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadRepository } from '../repository/repositories/lead.repository';
import { OpportunityRepository } from '../repository/repositories/opportunity.repository';
import { PipelineRepository } from '../repository/repositories/pipeline.repository';
import { TaskRepository } from '../repository/repositories/task.repository';

@Injectable()
export class CrmService {
    constructor(
        private readonly leadRepository: LeadRepository,
        private readonly opportunityRepository: OpportunityRepository,
        private readonly pipelineRepository: PipelineRepository,
        private readonly taskRepository: TaskRepository
    ) {}

    // Leads logic
    async createLead(data: any): Promise<any> {
        return this.leadRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber,
            status: 'new',
            ownerId: data.ownerId,
            activities: [{ activity: 'Lead created', timestamp: new Date() }],
            isActive: true,
        });
    }

    async getLead(id: string): Promise<any> {
        const lead = await this.leadRepository.findOneById(id);
        if (!lead) {
            throw new NotFoundException('Lead not found');
        }
        return lead;
    }

    async updateLead(id: string, data: any): Promise<any> {
        const lead = await this.getLead(id);
        Object.assign(lead, data);
        lead.activities.push({ activity: 'Lead updated', timestamp: new Date() });
        return lead.save();
    }

    async deleteLead(id: string): Promise<boolean> {
        const lead = await this.getLead(id);
        await this.leadRepository.softDelete(lead);
        return true;
    }

    // Opportunity logic
    async createOpportunity(data: any): Promise<any> {
        return this.opportunityRepository.create({
            workspaceId: data.workspaceId,
            leadId: data.leadId,
            title: data.title,
            value: data.value,
            stage: 'discovery',
            ownerId: data.ownerId,
            notes: [],
            isActive: true,
        });
    }

    async getOpportunity(id: string): Promise<any> {
        const opp = await this.opportunityRepository.findOneById(id);
        if (!opp) {
            throw new NotFoundException('Opportunity not found');
        }
        return opp;
    }

    async updateOpportunity(id: string, data: any): Promise<any> {
        const opp = await this.getOpportunity(id);
        Object.assign(opp, data);
        return opp.save();
    }

    // Pipeline logic
    async createPipeline(data: any): Promise<any> {
        return this.pipelineRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            stages: data.stages || ['lead', 'proposal', 'won', 'lost'],
            isActive: true,
        });
    }

    // Task logic
    async createTask(data: any): Promise<any> {
        return this.taskRepository.create({
            workspaceId: data.workspaceId,
            description: data.description,
            dueDate: data.dueDate,
            status: 'pending',
            assigneeId: data.assigneeId,
            contactId: data.contactId,
            isActive: true,
        });
    }

    async completeTask(id: string): Promise<any> {
        const task = await this.taskRepository.findOneById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        task.status = 'completed';
        return task.save();
    }
}
