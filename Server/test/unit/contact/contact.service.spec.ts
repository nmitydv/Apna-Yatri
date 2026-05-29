import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from 'src/modules/contact/services/contact.service';
import { ContactRepository } from 'src/modules/contact/repository/repositories/contact.repository';
import { NotFoundException } from '@nestjs/common';

describe('ContactService', () => {
    let service: ContactService;
    let repository: ContactRepository;

    const mockContact = {
        _id: 'c123',
        workspaceId: 'ws123',
        name: 'Jane Doe',
        email: 'jane@example.com',
        tags: ['vip'],
        notes: [],
        timeline: [],
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockContactRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'c123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'c123') return Promise.resolve({ ...mockContact });
            return Promise.resolve(null);
        }),
        softDelete: jest.fn().mockResolvedValue(true),
        findAll: jest.fn().mockResolvedValue([mockContact]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContactService,
                { provide: ContactRepository, useValue: mockContactRepository },
            ],
        }).compile();

        service = module.get<ContactService>(ContactService);
        repository = module.get<ContactRepository>(ContactRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createContact', () => {
        it('should successfully create a new contact', async () => {
            const data = { workspaceId: 'ws123', name: 'Jane Doe', email: 'jane@example.com' };
            const result = await service.createContact(data);
            expect(result).toBeDefined();
            expect(result.name).toBe('Jane Doe');
        });
    });

    describe('getContact', () => {
        it('should return a contact if it exists', async () => {
            const result = await service.getContact('c123');
            expect(result).toBeDefined();
            expect(result._id).toBe('c123');
        });

        it('should throw NotFoundException if contact does not exist', async () => {
            await expect(service.getContact('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateContact', () => {
        it('should successfully update a contact', async () => {
            const result = await service.updateContact('c123', { name: 'Jane Updated' });
            expect(result).toBeDefined();
            expect(result.name).toBe('Jane Updated');
        });
    });

    describe('deleteContact', () => {
        it('should successfully delete a contact', async () => {
            const result = await service.deleteContact('c123');
            expect(result).toBe(true);
        });
    });

    describe('addTag', () => {
        it('should add a tag if it does not already exist', async () => {
            const result = await service.addTag('c123', 'premium');
            expect(result.tags).toContain('premium');
        });
    });

    describe('removeTag', () => {
        it('should remove a tag', async () => {
            const result = await service.removeTag('c123', 'vip');
            expect(result.tags).not.toContain('vip');
        });
    });
});
