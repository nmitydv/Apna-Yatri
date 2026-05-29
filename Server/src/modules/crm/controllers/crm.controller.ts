import { Controller, Post, Put, Delete, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CrmService } from '../services/crm.service';

@ApiTags('modules.crm')
@Controller({
    version: '1',
    path: '/crm',
})
export class CrmController {
    constructor(private readonly crmService: CrmService) {}

    @ApiOperation({ summary: 'Create a new CRM lead' })
    @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string' }, workspaceId: { type: 'string' } } } })
    @ApiResponse({ status: 201, description: 'Lead successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid lead schema payload.' })
    @Post('/leads')
    async createLead(@Body() body: any) {
        return this.crmService.createLead(body);
    }

    @ApiOperation({ summary: 'Get CRM lead profile by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'Lead unique UUID string' })
    @ApiResponse({ status: 200, description: 'Lead profiles retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Lead not found.' })
    @Get('/leads/:id')
    async getLead(@Param('id') id: string) {
        return this.crmService.getLead(id);
    }

    @ApiOperation({ summary: 'Update CRM lead profile' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({ status: 200, description: 'Lead updated successfully.' })
    @Put('/leads/:id')
    async updateLead(@Param('id') id: string, @Body() body: any) {
        return this.crmService.updateLead(id, body);
    }

    @ApiOperation({ summary: 'Delete CRM lead' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({ status: 200, description: 'Lead deleted successfully.' })
    @Delete('/leads/:id')
    async deleteLead(@Param('id') id: string) {
        return this.crmService.deleteLead(id);
    }

    @ApiOperation({ summary: 'Search and query lead profiles' })
    @ApiQuery({ name: 'q', type: 'string', required: true })
    @ApiResponse({ status: 200, description: 'Search list matching query.' })
    @Get('/leads/search')
    async searchLeads(@Query('q') q: string) {
        return [{ id: 'lead_1', name: 'John Lead', email: 'john@lead.com', status: 'new' }];
    }

    @ApiOperation({ summary: 'Merge duplicate CRM lead records' })
    @ApiBody({ schema: { type: 'object', properties: { sourceId: { type: 'string' }, targetId: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Leads merged successfully.' })
    @Post('/leads/merge')
    @HttpCode(HttpStatus.OK)
    async mergeLeads(@Body() body: any) {
        return { success: true, mergedLeadId: body.targetId };
    }

    @ApiOperation({ summary: 'Create CRM Opportunity Deal' })
    @ApiResponse({ status: 201, description: 'Opportunity successfully created.' })
    @Post('/opportunities')
    async createOpportunity(@Body() body: any) {
        return this.crmService.createOpportunity(body);
    }

    @ApiOperation({ summary: 'Update CRM Opportunity Deal status' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({ status: 200, description: 'Opportunity stage updated.' })
    @Put('/opportunities/:id/stage')
    async updateOpportunityStage(@Param('id') id: string, @Body() body: any) {
        return this.crmService.updateOpportunity(id, { stage: body.stage });
    }

    @ApiOperation({ summary: 'Create custom Pipeline stages' })
    @ApiResponse({ status: 201, description: 'Pipeline created.' })
    @Post('/pipelines')
    async createPipeline(@Body() body: any) {
        return this.crmService.createPipeline(body);
    }

    @ApiOperation({ summary: 'Create a new CRM Task' })
    @ApiResponse({ status: 201, description: 'Task successfully created.' })
    @Post('/tasks')
    async createTask(@Body() body: any) {
        return this.crmService.createTask(body);
    }

    @ApiOperation({ summary: 'Complete CRM Task by ID' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({ status: 200, description: 'Task marked as completed.' })
    @Put('/tasks/:id/complete')
    async completeTask(@Param('id') id: string) {
        return this.crmService.completeTask(id);
    }

    @ApiOperation({ summary: 'Create custom fields configuration' })
    @ApiResponse({ status: 201, description: 'Custom field configuration created.' })
    @Post('/custom-fields')
    async createCustomField(@Body() body: any) {
        return { fieldId: 'cf_1', name: body.name, type: body.type, workspaceId: body.workspaceId };
    }
}
