import { Controller, Post, Put, Delete, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlowBuilderService } from '../services/flow-builder.service';

@ApiTags('modules.flow-builder')
@Controller({
    version: '1',
    path: '/flow-builder',
})
export class FlowBuilderController {
    constructor(private readonly flowService: FlowBuilderService) {}

    @Post('/')
    async createFlow(@Body() body: any) {
        return this.flowService.createFlow(body);
    }

    @Get('/:id')
    async getFlow(@Param('id') id: string) {
        return this.flowService.getFlow(id);
    }

    @Put('/:id')
    async updateFlow(@Param('id') id: string, @Body() body: any) {
        return this.flowService.updateFlow(id, body);
    }

    @Post('/:id/duplicate')
    async duplicateFlow(@Param('id') id: string) {
        return this.flowService.duplicateFlow(id);
    }

    @Delete('/:id')
    async deleteFlow(@Param('id') id: string) {
        return this.flowService.deleteFlow(id);
    }

    @Post('/:id/validate')
    @HttpCode(HttpStatus.OK)
    async validateFlow(@Param('id') id: string) {
        const flow = await this.flowService.getFlow(id);
        const hasNodes = flow.nodes && flow.nodes.length > 0;
        const hasStartNode = flow.nodes.some(n => n.type === 'start');
        
        return {
            valid: hasNodes && hasStartNode,
            errors: !hasNodes ? ['Flow contains no steps'] : (!hasStartNode ? ['Missing start trigger step'] : []),
            warningCount: 0,
        };
    }

    @Get('/:id/preview')
    async previewFlow(@Param('id') id: string) {
        const flow = await this.flowService.getFlow(id);
        return {
            flowId: flow._id,
            previewUrl: `https://visualpreview.mychatplatform.com/preview/${flow._id}?v=${flow.version}`,
        };
    }

    @Put('/:id/publish')
    async publishFlow(@Param('id') id: string) {
        return this.flowService.updateFlow(id, { isPublished: true });
    }
}
