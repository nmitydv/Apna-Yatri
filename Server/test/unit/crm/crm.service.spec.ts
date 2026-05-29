import { Test, TestingModule } from '@nestjs/testing';
import { CrmService } from 'src/modules/crm/services/crm.service';
import { LeadRepository } from 'src/modules/crm/repository/repositories/lead.repository';
import { OpportunityRepository } from 'src/modules/crm/repository/repositories/opportunity.repository';
import { PipelineRepository } from 'src/modules/crm/repository/repositories/pipeline.repository';
import { TaskRepository } from 'src/modules/crm/repository/repositories/task.repository';
import { NotFoundException } from '@nestjs/common';

describe('CrmService', () => {
    let service: CrmService;
    let leadRepo: LeadRepository;
    let taskRepo: TaskRepository;

    const mockLeadRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'lead_123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'lead_123') {
                return Promise.resolve({
                    _id: 'lead_123',
                    name: 'John Lead',
                    email: 'john@lead.com',
                    activities: [],
                    save: jest.fn().mockResolvedValue(true),
                });
            }
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    const mockTaskRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'task_123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'task_123') {
                return Promise.resolve({
                    _id: 'task_123',
                    status: 'pending',
                    save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
                });
            }
            return Promise.resolve(null);
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CrmService,
                { provide: LeadRepository, useValue: mockLeadRepository },
                { provide: OpportunityRepository, useValue: {} },
                { provide: PipelineRepository, useValue: {} },
                { provide: TaskRepository, useValue: mockTaskRepository },
            ],
        }).compile();

        service = module.get<CrmService>(CrmService);
        leadRepo = module.get<LeadRepository>(LeadRepository);
        taskRepo = module.get<TaskRepository>(TaskRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createLead', () => {
        it('should successfully create a new lead', async () => {
            const data = { workspaceId: 'ws_1', name: 'John Lead', email: 'john@lead.com' };
            const result = await service.createLead(data);
            expect(result).toBeDefined();
            expect(result.name).toEqual('John Lead');
            expect(leadRepo.create).toHaveBeenCalled();
        });
    });

    describe('getLead', () => {
        it('should return a lead if it exists', async () => {
            const result = await service.getLead('lead_123');
            expect(result).toBeDefined();
            expect(result._id).toEqual('lead_123');
        });

        it('should throw NotFoundException if lead does not exist', async () => {
            await expect(service.getLead('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('completeTask', () => {
        it('should successfully mark a task as completed', async () => {
            const result = await service.completeTask('task_123');
            expect(result.status).toEqual('completed');
        });

        it('should throw NotFoundException for non-existent task', async () => {
            await expect(service.completeTask('non_existent')).rejects.toThrow(NotFoundException);
        });
    });
});
