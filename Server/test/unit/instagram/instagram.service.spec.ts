import { Test, TestingModule } from '@nestjs/testing';
import { InstagramService } from 'src/modules/instagram/services/instagram.service';
import { InstagramRepository } from 'src/modules/instagram/repository/repositories/instagram.repository';
import { NotFoundException } from '@nestjs/common';

describe('InstagramService', () => {
    let service: InstagramService;
    let repository: InstagramRepository;

    const mockAccount = {
        _id: 'i123',
        workspaceId: 'ws123',
        accountId: 'act123',
        accountName: 'my_brand_insta',
        accessToken: 'token_abc',
        health: { status: 'healthy', lastSynced: new Date().toISOString() },
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockInstagramRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'i123', ...dto })),
        findOne: jest.fn().mockImplementation(filter => {
            if (filter.workspaceId === 'ws123') return Promise.resolve({ ...mockAccount });
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InstagramService,
                { provide: InstagramRepository, useValue: mockInstagramRepository },
            ],
        }).compile();

        service = module.get<InstagramService>(InstagramService);
        repository = module.get<InstagramRepository>(InstagramRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('connectAccount', () => {
        it('should successfully connect an Instagram account', async () => {
            const data = { workspaceId: 'ws123', accountId: 'act123', accountName: 'my_brand_insta', accessToken: 'token_abc' };
            const result = await service.connectAccount(data);
            expect(result).toBeDefined();
            expect(result.accountId).toBe('act123');
        });
    });

    describe('getAccount', () => {
        it('should return integration details if workspace integration exists', async () => {
            const result = await service.getAccount('ws123');
            expect(result).toBeDefined();
            expect(result._id).toBe('i123');
        });

        it('should throw NotFoundException if integration not found', async () => {
            await expect(service.getAccount('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('disconnectAccount', () => {
        it('should disconnect the account successfully', async () => {
            const result = await service.disconnectAccount('ws123');
            expect(result).toBe(true);
        });
    });

    describe('syncProfile', () => {
        it('should update the health and return updated account', async () => {
            const result = await service.syncProfile('ws123');
            expect(result).toBeDefined();
            expect(result.health.status).toBe('healthy');
        });
    });
});
