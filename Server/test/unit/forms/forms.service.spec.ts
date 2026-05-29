import { Test, TestingModule } from '@nestjs/testing';
import { FormsService } from 'src/modules/forms/services/forms.service';
import { FormRepository } from 'src/modules/forms/repository/repositories/form.repository';
import { NotFoundException } from '@nestjs/common';

describe('FormsService', () => {
    let service: FormsService;
    let repository: FormRepository;

    const mockForm = {
        _id: 'f123',
        workspaceId: 'ws123',
        title: 'Lead Capture Form',
        fields: [],
        submissions: [],
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockFormRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'f123', ...dto })),
        findOneById: jest.fn().mockImplementation(id => {
            if (id === 'f123') return Promise.resolve({ ...mockForm });
            return Promise.resolve(null);
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FormsService,
                { provide: FormRepository, useValue: mockFormRepository },
            ],
        }).compile();

        service = module.get<FormsService>(FormsService);
        repository = module.get<FormRepository>(FormRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createForm', () => {
        it('should successfully build a new capture form', async () => {
            const data = { workspaceId: 'ws123', title: 'Lead Capture Form' };
            const result = await service.createForm(data);
            expect(result).toBeDefined();
            expect(result.title).toBe('Lead Capture Form');
        });
    });

    describe('getForm', () => {
        it('should return form structure if exists', async () => {
            const result = await service.getForm('f123');
            expect(result).toBeDefined();
            expect(result._id).toBe('f123');
        });

        it('should throw NotFoundException if form doesn not exist', async () => {
            await expect(service.getForm('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('submitForm', () => {
        it('should submit capture field answers successfully', async () => {
            const result = await service.submitForm('f123', { email: 'client@example.com', feedback: 'Great service' });
            expect(result.submissions.length).toBeGreaterThan(0);
        });
    });
});
