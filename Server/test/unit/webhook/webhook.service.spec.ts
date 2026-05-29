import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from 'src/modules/webhook/services/webhook.service';
import { WebhookRepository } from 'src/modules/webhook/repository/repositories/webhook.repository';
import { NotFoundException } from '@nestjs/common';

describe('WebhookService', () => {
    let service: WebhookService;
    let repository: WebhookRepository;

    const mockWebhook = {
        _id: 'w123',
        workspaceId: 'ws123',
        url: 'https://example.com/callback',
        events: ['message.received'],
        isActive: true,
        secretKey: 'whsec_secret',
        logs: [],
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockWebhookRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'w123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'w123') return Promise.resolve({ ...mockWebhook });
            return Promise.resolve(null);
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WebhookService,
                { provide: WebhookRepository, useValue: mockWebhookRepository },
            ],
        }).compile();

        service = module.get<WebhookService>(WebhookService);
        repository = module.get<WebhookRepository>(WebhookRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createWebhook', () => {
        it('should successfully register an outbound client webhook URL', async () => {
            const data = { workspaceId: 'ws123', url: 'https://example.com/callback', events: ['message.received'] };
            const result = await service.createWebhook(data);
            expect(result).toBeDefined();
            expect(result.url).toBe('https://example.com/callback');
            expect(result.secretKey).toBeDefined();
        });
    });

    describe('getWebhook', () => {
        it('should return webhook if it exists', async () => {
            const result = await service.getWebhook('w123');
            expect(result).toBeDefined();
            expect(result._id).toBe('w123');
        });

        it('should throw NotFoundException if webhook not found', async () => {
            await expect(service.getWebhook('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('retryWebhook', () => {
        it('should add retry attempt entry to logs log', async () => {
            const result = await service.retryWebhook('w123', 'log_1');
            expect(result.success).toBe(true);
        });
    });
});
