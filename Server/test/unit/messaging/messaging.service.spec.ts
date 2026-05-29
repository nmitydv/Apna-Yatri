import { Test, TestingModule } from '@nestjs/testing';
import { MessagingService } from 'src/modules/messaging/services/messaging.service';
import { MessageRepository } from 'src/modules/messaging/repository/repositories/message.repository';
import { NotFoundException } from '@nestjs/common';

describe('MessagingService', () => {
    let service: MessagingService;
    let repository: MessageRepository;

    const mockMessage = {
        _id: 'm123',
        workspaceId: 'ws123',
        contactId: 'c123',
        direction: 'outbound',
        platform: 'instagram',
        content: 'Hello World',
        reactions: [],
        status: 'sent',
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockMessageRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'm123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'm123') return Promise.resolve({ ...mockMessage });
            return Promise.resolve(null);
        }),
        findAll: jest.fn().mockResolvedValue([mockMessage]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessagingService,
                { provide: MessageRepository, useValue: mockMessageRepository },
            ],
        }).compile();

        service = module.get<MessagingService>(MessagingService);
        repository = module.get<MessageRepository>(MessageRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendMessage', () => {
        it('should successfully send a message', async () => {
            const data = { workspaceId: 'ws123', contactId: 'c123', content: 'Hello World' };
            const result = await service.sendMessage(data);
            expect(result).toBeDefined();
            expect(result.direction).toBe('outbound');
        });
    });

    describe('receiveMessage', () => {
        it('should successfully receive a message', async () => {
            const data = { workspaceId: 'ws123', contactId: 'c123', content: 'Inbound message' };
            const result = await service.receiveMessage(data);
            expect(result).toBeDefined();
            expect(result.direction).toBe('inbound');
        });
    });

    describe('getHistory', () => {
        it('should return message history list', async () => {
            const result = await service.getHistory('ws123', 'c123');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('addReaction', () => {
        it('should add reaction successfully', async () => {
            const result = await service.addReaction('m123', '❤️');
            expect(result.reactions).toContain('❤️');
        });

        it('should throw NotFoundException if message doesn not exist', async () => {
            await expect(service.addReaction('non_existent', '❤️')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateStatus', () => {
        it('should update message status successfully', async () => {
            const result = await service.updateStatus('m123', 'read');
            expect(result.status).toBe('read');
        });
    });
});
