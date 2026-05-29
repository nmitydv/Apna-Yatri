import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from 'src/modules/dashboard/services/dashboard.service';
import { ContactRepository } from 'src/modules/contact/repository/repositories/contact.repository';
import { MessageRepository } from 'src/modules/messaging/repository/repositories/message.repository';
import { CampaignRepository } from 'src/modules/campaign/repository/repositories/campaign.repository';

describe('DashboardService', () => {
    let service: DashboardService;
    let contactRepo: ContactRepository;
    let messageRepo: MessageRepository;
    let campaignRepo: CampaignRepository;

    const mockContactRepository = {
        getTotal: jest.fn().mockResolvedValue(100),
    };

    const mockMessageRepository = {
        getTotal: jest.fn().mockResolvedValue(500),
    };

    const mockCampaignRepository = {
        getTotal: jest.fn().mockResolvedValue(5),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DashboardService,
                { provide: ContactRepository, useValue: mockContactRepository },
                { provide: MessageRepository, useValue: mockMessageRepository },
                { provide: CampaignRepository, useValue: mockCampaignRepository },
            ],
        }).compile();

        service = module.get<DashboardService>(DashboardService);
        contactRepo = module.get<ContactRepository>(ContactRepository);
        messageRepo = module.get<MessageRepository>(MessageRepository);
        campaignRepo = module.get<CampaignRepository>(CampaignRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getOverview', () => {
        it('should return combined analytical dashboard overview stats successfully', async () => {
            const result = await service.getOverview('ws123');
            expect(result).toBeDefined();
            expect(result.totals.subscribers).toBe(100);
            expect(result.totals.messagesSent).toBe(500);
            expect(result.totals.campaignsActive).toBe(5);
            expect(result.channelUsage).toBeDefined();
        });
    });
});
