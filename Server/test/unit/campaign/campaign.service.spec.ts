import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from 'src/modules/campaign/services/campaign.service';
import { CampaignRepository } from 'src/modules/campaign/repository/repositories/campaign.repository';
import { NotFoundException } from '@nestjs/common';

describe('CampaignService', () => {
    let service: CampaignService;
    let repository: CampaignRepository;

    const mockCampaign = {
        _id: 'c123',
        workspaceId: 'ws123',
        name: 'Black Friday Campaign',
        status: 'draft',
        audienceSegmentId: 'seg123',
        flowId: 'f123',
        schedule: { scheduledAt: new Date().toISOString() },
        analytics: { sent: '0', clicks: '0', conversions: '0' },
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockCampaignRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'c123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'c123') return Promise.resolve({ ...mockCampaign });
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CampaignService,
                { provide: CampaignRepository, useValue: mockCampaignRepository },
            ],
        }).compile();

        service = module.get<CampaignService>(CampaignService);
        repository = module.get<CampaignRepository>(CampaignRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createCampaign', () => {
        it('should successfully create a outbound messaging campaign', async () => {
            const data = { workspaceId: 'ws123', name: 'Black Friday Campaign', audienceSegmentId: 'seg123', flowId: 'f123' };
            const result = await service.createCampaign(data);
            expect(result).toBeDefined();
            expect(result.name).toBe('Black Friday Campaign');
        });
    });

    describe('getCampaign', () => {
        it('should return campaign details if exists', async () => {
            const result = await service.getCampaign('c123');
            expect(result).toBeDefined();
            expect(result._id).toBe('c123');
        });

        it('should throw NotFoundException if campaign not found', async () => {
            await expect(service.getCampaign('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateCampaign', () => {
        it('should update and save campaign properties', async () => {
            const result = await service.updateCampaign('c123', { status: 'sent' });
            expect(result.status).toBe('sent');
        });
    });

    describe('deleteCampaign', () => {
        it('should successfully soft delete a campaign', async () => {
            const result = await service.deleteCampaign('c123');
            expect(result).toBe(true);
        });
    });
});
