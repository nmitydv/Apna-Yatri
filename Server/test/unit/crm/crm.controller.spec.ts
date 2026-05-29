import { Test, TestingModule } from '@nestjs/testing';
import { CrmController } from 'src/modules/crm/controllers/crm.controller';
import { CrmService } from 'src/modules/crm/services/crm.service';

describe('CrmController', () => {
    let controller: CrmController;
    let service: CrmService;

    const mockCrmService = {
        createLead: jest.fn().mockResolvedValue({ _id: 'lead_1', name: 'John Lead' }),
        getLead: jest.fn().mockResolvedValue({ _id: 'lead_1', name: 'John Lead' }),
        updateLead: jest.fn().mockResolvedValue({ _id: 'lead_1', name: 'Updated Lead' }),
        deleteLead: jest.fn().mockResolvedValue(true),
        createOpportunity: jest.fn().mockResolvedValue({ _id: 'opp_1', title: 'Deal 1' }),
        updateOpportunity: jest.fn().mockResolvedValue({ _id: 'opp_1', stage: 'proposal' }),
        createPipeline: jest.fn().mockResolvedValue({ _id: 'pip_1', name: 'Sales Pipe' }),
        createTask: jest.fn().mockResolvedValue({ _id: 'tsk_1', description: 'Call customer' }),
        completeTask: jest.fn().mockResolvedValue({ _id: 'tsk_1', status: 'completed' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CrmController],
            providers: [
                { provide: CrmService, useValue: mockCrmService },
            ],
        }).compile();

        controller = module.get<CrmController>(CrmController);
        service = module.get<CrmService>(CrmService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('createLead() should create lead', async () => {
        const result = await controller.createLead({ name: 'John Lead' });
        expect(result).toBeDefined();
        expect(result._id).toBe('lead_1');
    });

    it('getLead() should return lead', async () => {
        const result = await controller.getLead('lead_1');
        expect(result.name).toBe('John Lead');
    });

    it('updateLead() should update lead', async () => {
        const result = await controller.updateLead('lead_1', { name: 'Updated Lead' });
        expect(result.name).toBe('Updated Lead');
    });

    it('deleteLead() should delete lead', async () => {
        const result = await controller.deleteLead('lead_1');
        expect(result).toBe(true);
    });

    it('searchLeads() should search lead list', async () => {
        const result = await controller.searchLeads('query');
        expect(result.length).toBeGreaterThan(0);
    });

    it('mergeLeads() should merge duplicate records', async () => {
        const result = await controller.mergeLeads({ sourceId: 'l1', targetId: 'l2' });
        expect(result.mergedLeadId).toBe('l2');
    });

    it('createOpportunity() should succeed', async () => {
        const result = await controller.createOpportunity({});
        expect(result._id).toBe('opp_1');
    });

    it('updateOpportunityStage() should succeed', async () => {
        const result = await controller.updateOpportunityStage('opp_1', { stage: 'proposal' });
        expect(result.stage).toBe('proposal');
    });

    it('createPipeline() should succeed', async () => {
        const result = await controller.createPipeline({});
        expect(result._id).toBe('pip_1');
    });

    it('createTask() should succeed', async () => {
        const result = await controller.createTask({});
        expect(result._id).toBe('tsk_1');
    });

    it('completeTask() should succeed', async () => {
        const result = await controller.completeTask('tsk_1');
        expect(result.status).toBe('completed');
    });

    it('createCustomField() should succeed', async () => {
        const result = await controller.createCustomField({ name: 'VIP', type: 'boolean' });
        expect(result.fieldId).toBeDefined();
    });
});
