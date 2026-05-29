import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from 'src/modules/ai/services/ai.service';
import { AiAgentRepository } from 'src/modules/ai/repository/repositories/ai-kb.repository';
import { NotFoundException } from '@nestjs/common';

describe('AiService', () => {
    let service: AiService;
    let repository: AiAgentRepository;

    const mockAgent = {
        _id: 'a123',
        workspaceId: 'ws123',
        name: 'Support Agent',
        content: 'Support KB context',
        prompts: [],
        agentSettings: {},
        isActive: true,
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockAiAgentRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'a123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'a123') return Promise.resolve({ ...mockAgent });
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AiService,
                { provide: AiAgentRepository, useValue: mockAiAgentRepository },
            ],
        }).compile();

        service = module.get<AiService>(AiService);
        repository = module.get<AiAgentRepository>(AiAgentRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createAgent', () => {
        it('should successfully create an AI Agent configuration', async () => {
            const data = { workspaceId: 'ws123', name: 'Support Agent', content: 'Support KB context' };
            const result = await service.createAgent(data);
            expect(result).toBeDefined();
            expect(result.name).toBe('Support Agent');
        });
    });

    describe('getAgent', () => {
        it('should return agent details if exists', async () => {
            const result = await service.getAgent('a123');
            expect(result).toBeDefined();
            expect(result._id).toBe('a123');
        });

        it('should throw NotFoundException if agent doesn not exist', async () => {
            await expect(service.getAgent('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateAgent', () => {
        it('should update and save agent properties', async () => {
            const result = await service.updateAgent('a123', { name: 'Sales Agent' });
            expect(result.name).toBe('Sales Agent');
        });
    });

    describe('deleteAgent', () => {
        it('should successfully delete an agent', async () => {
            const result = await service.deleteAgent('a123');
            expect(result).toBe(true);
        });
    });

    describe('generateReply', () => {
        it('should return simulated model reply text', async () => {
            const result = await service.generateReply('Hello agent');
            expect(result).toContain('AI Response to: "Hello agent"');
        });
    });
});
