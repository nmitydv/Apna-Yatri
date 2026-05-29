import { Injectable, NotFoundException } from '@nestjs/common';
import { BillingRepository } from '../repository/repositories/billing.repository';
import { BillingEntity, BillingDoc } from '../repository/entities/billing.entity';

@Injectable()
export class BillingService {
    constructor(private readonly billingRepository: BillingRepository) {}

    async createSubscription(data: any): Promise<BillingDoc> {
        return this.billingRepository.create({
            workspaceId: data.workspaceId,
            plan: data.plan || 'free',
            status: 'active',
            stripeSubscriptionId: data.stripeSubscriptionId,
            invoices: [],
            usage: { messagesSent: '0', contactsCount: '0' },
            isActive: true,
        });
    }

    async getSubscription(workspaceId: string): Promise<BillingDoc> {
        const billing = await this.billingRepository.findOne({ workspaceId });
        if (!billing) {
            throw new NotFoundException('Subscription billing record not found');
        }
        return billing;
    }

    async updatePlan(workspaceId: string, plan: string): Promise<BillingDoc> {
        const billing = await this.getSubscription(workspaceId);
        billing.plan = plan;
        return billing.save();
    }

    async addInvoice(workspaceId: string, invoiceData: any): Promise<BillingDoc> {
        const billing = await this.getSubscription(workspaceId);
        billing.invoices.push(invoiceData);
        return billing.save();
    }
}
