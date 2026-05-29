import { Test, TestingModule } from '@nestjs/testing';
import { AutomationService } from 'src/modules/automation/services/automation.service';
import { AutomationRepository } from 'src/modules/automation/repository/repositories/automation.repository';
import { NotFoundException } from '@nestjs/common';

describe('AutomationService', () => {
    let service: AutomationService;
    let repository: AutomationRepository;

    const mockAutomation = {
        _id: 'a123',
        workspaceId: 'ws123',
        name: 'Welcome Flow',
        triggers: [],
        steps: [],
        isActive: false,
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockAutomationRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'a123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'a123') return Promise.resolve({ ...mockAutomation });
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AutomationService,
                { provide: AutomationRepository, useValue: mockAutomationRepository },
            ],
        }).compile();

        service = module.get<AutomationService>(AutomationService);
        repository = module.get<AutomationRepository>(AutomationRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createAutomation', () => {
        it('should successfully create a new automation flow', async () => {
            const data = { workspaceId: 'ws123', name: 'Welcome Flow' };
            const result = await service.createAutomation(data);
            expect(result).toBeDefined();
            expect(result.name).toBe('Welcome Flow');
        });
    });

    describe('getAutomation', () => {
        it('should return automation flow detail if exists', async () => {
            const result = await service.getAutomation('a123');
            expect(result).toBeDefined();
            expect(result._id).toBe('a123');
        });

        it('should throw NotFoundException if flow doesn not exist', async () => {
            await expect(service.getAutomation('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateAutomation', () => {
        it('should update and save automation', async () => {
            const result = await service.updateAutomation('a123', { name: 'Updated Flow' });
            expect(result.name).toBe('Updated Flow');
        });
    });

    describe('cloneAutomation', () => {
        it('should successfully clone automation', async () => {
            const result = await service.cloneAutomation('a123');
            expect(result).toBeDefined();
            expect(result.name).toContain('Clone');
        });
    });

    describe('deleteAutomation', () => {
        it('should delete flow', async () => {
            const result = await service.deleteAutomation('a123');
            expect(result).toBe(true);
        });
    });
});
