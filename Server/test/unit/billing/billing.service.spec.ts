import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from 'src/modules/billing/services/billing.service';
import { BillingRepository } from 'src/modules/billing/repository/repositories/billing.repository';
import { NotFoundException } from '@nestjs/common';

describe('BillingService', () => {
    let service: BillingService;
    let repository: BillingRepository;

    const mockBilling = {
        _id: 'b123',
        workspaceId: 'ws123',
        plan: 'growth',
        status: 'active',
        stripeSubscriptionId: 'sub_stripe_123',
        invoices: [],
        usage: { messagesSent: '0', contactsCount: '0' },
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
    };

    const mockBillingRepository = {
        create: jest.fn().mockImplementation(dto => Promise.resolve({ _id: 'b123', ...dto })),
        findOne: jest.fn().mockImplementation(filter => {
            if (filter.workspaceId === 'ws123') return Promise.resolve({ ...mockBilling });
            return Promise.resolve(null);
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BillingService,
                { provide: BillingRepository, useValue: mockBillingRepository },
            ],
        }).compile();

        service = module.get<BillingService>(BillingService);
        repository = module.get<BillingRepository>(BillingRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createSubscription', () => {
        it('should successfully register a stripe subscription', async () => {
            const data = { workspaceId: 'ws123', plan: 'growth', stripeSubscriptionId: 'sub_stripe_123' };
            const result = await service.createSubscription(data);
            expect(result).toBeDefined();
            expect(result.plan).toBe('growth');
        });
    });

    describe('getSubscription', () => {
        it('should return subscription if exists', async () => {
            const result = await service.getSubscription('ws123');
            expect(result).toBeDefined();
            expect(result._id).toBe('b123');
        });

        it('should throw NotFoundException if subscription not found', async () => {
            await expect(service.getSubscription('non_existent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updatePlan', () => {
        it('should upgrade or change the pricing plan', async () => {
            const result = await service.updatePlan('ws123', 'enterprise');
            expect(result.plan).toBe('enterprise');
        });
    });

    describe('addInvoice', () => {
        it('should append new payment invoice to invoice list log', async () => {
            const result = await service.addInvoice('ws123', { invoiceId: 'inv_1', amount: 9900, status: 'paid' });
            expect(result.invoices.length).toBeGreaterThan(0);
        });
    });
});
