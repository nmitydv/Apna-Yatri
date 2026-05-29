import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormsService } from '../services/forms.service';

@ApiTags('modules.forms')
@Controller({
    version: '1',
    path: '/forms',
})
export class FormsController {
    constructor(private readonly formsService: FormsService) {}

    @Post('/')
    async createForm(@Body() body: any) {
        return this.formsService.createForm(body);
    }

    @Get('/:id')
    async getForm(@Param('id') id: string) {
        return this.formsService.getForm(id);
    }

    @Post('/:id/submit')
    async submitForm(@Param('id') id: string, @Body() body: any) {
        return this.formsService.submitForm(id, body.data || {});
    }

    @Get('/:id/embed')
    async embedForm(@Param('id') id: string) {
        return {
            formId: id,
            embedCode: `<iframe src="https://mychatplatform.com/forms/embed/${id}" width="100%" height="500" frameborder="0"></iframe>`,
        };
    }

    @Get('/:id/analytics')
    async getAnalytics(@Param('id') id: string) {
        const form = await this.formsService.getForm(id);
        return {
            formId: id,
            views: 450,
            submissions: form.submissions.length,
            conversionRate: `${((form.submissions.length / 450) * 100).toFixed(1)}%`,
        };
    }
}
