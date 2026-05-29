import { Controller, Post, Put, Delete, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactService } from '../services/contact.service';

@ApiTags('modules.contact')
@Controller({
    version: '1',
    path: '/contact',
})
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post('/')
    async createContact(@Body() body: any) {
        return this.contactService.createContact(body);
    }

    @Get('/:id')
    async getContact(@Param('id') id: string) {
        return this.contactService.getContact(id);
    }

    @Put('/:id')
    async updateContact(@Param('id') id: string, @Body() body: any) {
        return this.contactService.updateContact(id, body);
    }

    @Delete('/:id')
    async deleteContact(@Param('id') id: string) {
        return this.contactService.deleteContact(id);
    }

    @Get('/search/:workspaceId')
    async searchContacts(@Param('workspaceId') workspaceId: string, @Query('q') q: string) {
        return this.contactService.searchContacts(workspaceId, q || '');
    }

    @Post('/:id/tag')
    async addTag(@Param('id') id: string, @Body() body: any) {
        return this.contactService.addTag(id, body.tag);
    }

    @Delete('/:id/tag/:tag')
    async removeTag(@Param('id') id: string, @Param('tag') tag: string) {
        return this.contactService.removeTag(id, tag);
    }

    @Post('/:id/note')
    async addNote(@Param('id') id: string, @Body() body: any) {
        return this.contactService.addNote(id, body.note);
    }

    @Post('/import')
    async importContacts(@Body() body: any) {
        return { importedCount: body.contacts?.length || 0, status: 'success' };
    }

    @Get('/export/:workspaceId')
    async exportContacts(@Param('workspaceId') workspaceId: string) {
        return [
            { name: 'John Doe', email: 'john@example.com', tags: ['vip', 'lead'] },
            { name: 'Jane Smith', email: 'jane@example.com', tags: ['customer'] }
        ];
    }
}
