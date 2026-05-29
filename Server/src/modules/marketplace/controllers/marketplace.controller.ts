import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MarketplaceService } from '../services/marketplace.service';

@ApiTags('modules.marketplace')
@Controller({
    version: '1',
    path: '/marketplace',
})
export class MarketplaceController {
    constructor(private readonly marketplaceService: MarketplaceService) {}

    @Post('/template')
    async submitTemplate(@Body() body: any) {
        return this.marketplaceService.createTemplate(body);
    }

    @Get('/templates')
    async listTemplates() {
        return this.marketplaceService.getTemplates();
    }

    @Post('/template/:id/review')
    async reviewTemplate(@Param('id') id: string, @Body() body: any) {
        return this.marketplaceService.rateTemplate(id, body);
    }

    @Post('/template/:id/install')
    @HttpCode(HttpStatus.OK)
    async installTemplate(@Param('id') id: string, @Query('workspaceId') workspaceId: string) {
        return { success: true, installedTemplateId: id, workspaceId, status: 'activated' };
    }

    @Post('/template/:id/purchase')
    async purchaseTemplate(@Param('id') id: string, @Body() body: any) {
        return { transactionId: 'txn_market_12345', amountPaid: body.price || 0, status: 'paid' };
    }
}
