import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceService } from 'src/modules/marketplace/services/marketplace.service';
import { MarketplaceTemplateRepository } from 'src/modules/marketplace/repository/repositories/marketplace.repository';
import { NotFoundException } from '@nestjs/common';

describe('MarketplaceService', () => {
    let service: MarketplaceService;
    let repository: MarketplaceTemplateRepository;

    const mockTemplate = {
        _id: 't123',
        name: 'E-commerce Automation Flow',
        description: 'Ready-to-use e-commerce store responses',
        type: 'flow',
        price: 4900,
        publisherId: 'pub123',
        rating: 5.0,
        reviews: [],
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockMarketplaceTemplateRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 't123', ...dto })),
        findAll: jest.fn().mockResolvedValue([mockTemplate]),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 't123') return Promise.resolve({ ...mockTemplate });
            return Promise.resolve(null);
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MarketplaceService,
                { provide: MarketplaceTemplateRepository, useValue: mockMarketplaceTemplateRepository },
            ],
        }).compile();

        service = module.get<MarketplaceService>(MarketplaceService);
        repository = module.get<MarketplaceTemplateRepository>(MarketplaceTemplateRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createTemplate', () => {
        it('should successfully publish a new community flow template', async () => {
            const data = { name: 'E-commerce Automation Flow', description: 'Store templates', type: 'flow', price: 4900, publisherId: 'pub123' };
            const result = await service.createTemplate(data);
            expect(result).toBeDefined();
            expect(result.name).toBe('E-commerce Automation Flow');
        });
    });

    describe('getTemplates', () => {
        it('should retrieve list of template listings', async () => {
            const result = await service.getTemplates();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('rateTemplate', () => {
        it('should append review and recalculate template rating successfully', async () => {
            const result = await service.rateTemplate('t123', { reviewerId: 'rev123', text: 'Great flow', score: 4 });
            expect(result.reviews.length).toBeGreaterThan(0);
            expect(result.rating).toBe(4);
        });

        it('should throw NotFoundException if template does not exist', async () => {
            await expect(service.rateTemplate('non_existent', { reviewerId: 'r', text: 't', score: 5 })).rejects.toThrow(NotFoundException);
        });
    });
});
