import { Controller, Post, Get, Body, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillingService } from '../services/billing.service';

@ApiTags('modules.billing')
@Controller({
    version: '1',
    path: '/billing',
})
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @Post('/subscription')
    async createSubscription(@Body() body: any) {
        return this.billingService.createSubscription(body);
    }

    @Get('/subscription/:workspaceId')
    async getSubscription(@Param('workspaceId') workspaceId: string) {
        return this.billingService.getSubscription(workspaceId);
    }

    @Put('/subscription/:workspaceId/plan')
    async updatePlan(@Param('workspaceId') workspaceId: string, @Body() body: any) {
        return this.billingService.updatePlan(workspaceId, body.plan);
    }

    @Get('/invoices/:workspaceId')
    async getInvoices(@Param('workspaceId') workspaceId: string) {
        const billing = await this.billingService.getSubscription(workspaceId);
        return billing.invoices;
    }

    @Post('/payments/charge')
    @HttpCode(HttpStatus.OK)
    async processPayment(@Body() body: any) {
        return { success: true, chargeId: 'ch_stripe_123456789', status: 'succeeded' };
    }

    @Post('/refunds')
    async processRefund(@Body() body: any) {
        return { refundId: 're_stripe_123456789', status: 'refunded', amount: body.amount };
    }

    @Get('/usage/:workspaceId')
    async getUsageTracking(@Param('workspaceId') workspaceId: string) {
        const billing = await this.billingService.getSubscription(workspaceId);
        return {
            workspaceId,
            limitations: { messages: 10000, contacts: 2500 },
            currentUsage: billing.usage,
        };
    }
}
