import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from 'src/modules/workspace/services/workspace.service';
import { WorkspaceRepository } from 'src/modules/workspace/repository/repositories/workspace.repository';
import { NotFoundException } from '@nestjs/common';

describe('WorkspaceService', () => {
    let service: WorkspaceService;
    let repo: WorkspaceRepository;

    const mockWorkspaceRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'ws_123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'ws_123') {
                return Promise.resolve({
                    _id: 'ws_123',
                    name: 'My Workspace',
                    members: [{ userId: 'owner_1', role: 'owner' }],
                    settings: {},
                    save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
                });
            }
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkspaceService,
                { provide: WorkspaceRepository, useValue: mockWorkspaceRepository },
            ],
        }).compile();

        service = module.get<WorkspaceService>(WorkspaceService);
        repo = module.get<WorkspaceRepository>(WorkspaceRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createWorkspace', () => {
        it('should successfully create a new workspace', async () => {
            const data = { name: 'My Workspace', ownerId: 'owner_1' };
            const result = await service.createWorkspace(data);
            expect(result).toBeDefined();
            expect(result.name).toEqual('My Workspace');
            expect(result.members[0].role).toEqual('owner');
        });
    });

    describe('getWorkspace', () => {
        it('should return workspace details', async () => {
            const result = await service.getWorkspace('ws_123');
            expect(result).toBeDefined();
            expect(result._id).toEqual('ws_123');
        });

        it('should throw NotFoundException if workspace not found', async () => {
            await expect(service.getWorkspace('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('inviteMember', () => {
        it('should successfully append new member to workspace roster', async () => {
            const result = await service.inviteMember('ws_123', 'user_abc', 'admin');
            expect(result.members).toContainEqual({ userId: 'user_abc', role: 'admin' });
        });
    });
});
