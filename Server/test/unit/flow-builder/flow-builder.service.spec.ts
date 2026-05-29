import { Test, TestingModule } from '@nestjs/testing';
import { FlowBuilderService } from 'src/modules/flow-builder/services/flow-builder.service';
import { FlowRepository } from 'src/modules/flow-builder/repository/repositories/flow.repository';
import { NotFoundException } from '@nestjs/common';

describe('FlowBuilderService', () => {
    let service: FlowBuilderService;
    let repository: FlowRepository;

    const mockFlow = {
        _id: 'f123',
        workspaceId: 'ws123',
        name: 'Insta DM Flow',
        nodes: [],
        edges: [],
        version: 1,
        isPublished: false,
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockFlowRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'f123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'f123') return Promise.resolve({ ...mockFlow });
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FlowBuilderService,
                { provide: FlowRepository, useValue: mockFlowRepository },
            ],
        }).compile();

        service = module.get<FlowBuilderService>(FlowBuilderService);
        repository = module.get<FlowRepository>(FlowRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createFlow', () => {
        it('should successfully create a visual flow builder chart', async () => {
            const data = { workspaceId: 'ws123', name: 'Insta DM Flow' };
            const result = await service.createFlow(data);
            expect(result).toBeDefined();
            expect(result.name).toBe('Insta DM Flow');
        });
    });

    describe('getFlow', () => {
        it('should return flow if it exists', async () => {
            const result = await service.getFlow('f123');
            expect(result).toBeDefined();
            expect(result._id).toBe('f123');
        });

        it('should throw NotFoundException if flow does not exist', async () => {
            await expect(service.getFlow('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateFlow', () => {
        it('should update visual flow', async () => {
            const result = await service.updateFlow('f123', { name: 'Updated Insta DM Flow' });
            expect(result.name).toBe('Updated Insta DM Flow');
        });
    });

    describe('duplicateFlow', () => {
        it('should duplicate visual flow', async () => {
            const result = await service.duplicateFlow('f123');
            expect(result).toBeDefined();
            expect(result.name).toContain('Duplicate');
        });
    });

    describe('deleteFlow', () => {
        it('should delete flow', async () => {
            const result = await service.deleteFlow('f123');
            expect(result).toBe(true);
        });
    });
});
