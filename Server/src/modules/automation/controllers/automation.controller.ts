import { Controller, Post, Put, Delete, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutomationService } from '../services/automation.service';

@ApiTags('modules.automation')
@Controller({
    version: '1',
    path: '/automation',
})
export class AutomationController {
    constructor(private readonly automationService: AutomationService) {}

    @Post('/')
    async createAutomation(@Body() body: any) {
        return this.automationService.createAutomation(body);
    }

    @Get('/:id')
    async getAutomation(@Param('id') id: string) {
        return this.automationService.getAutomation(id);
    }

    @Put('/:id')
    async updateAutomation(@Param('id') id: string, @Body() body: any) {
        return this.automationService.updateAutomation(id, body);
    }

    @Post('/:id/clone')
    async cloneAutomation(@Param('id') id: string) {
        return this.automationService.cloneAutomation(id);
    }

    @Delete('/:id')
    async deleteAutomation(@Param('id') id: string) {
        return this.automationService.deleteAutomation(id);
    }

    @Put('/:id/publish')
    @HttpCode(HttpStatus.OK)
    async publishAutomation(@Param('id') id: string) {
        return this.automationService.updateAutomation(id, { isActive: true });
    }

    @Put('/:id/pause')
    @HttpCode(HttpStatus.OK)
    async pauseAutomation(@Param('id') id: string) {
        return this.automationService.updateAutomation(id, { isActive: false });
    }

    @Post('/:id/trigger')
    async triggerAutomation(@Param('id') id: string, @Body() body: any) {
        const automation = await this.automationService.getAutomation(id);
        automation.logs.push(`Triggered manually at ${new Date().toISOString()}`);
        await automation.save();
        return { status: 'success', executed: true };
    }

    @Get('/:id/logs')
    async getLogs(@Param('id') id: string) {
        const automation = await this.automationService.getAutomation(id);
        return automation.logs;
    }
}
