import { Injectable } from '@nestjs/common';
import { ContactRepository } from 'src/modules/contact/repository/repositories/contact.repository';

@Injectable()
export class TaggingService {
    constructor(private readonly contactRepository: ContactRepository) {}

    async createTag(workspaceId: string, tag: string): Promise<any> {
        return { tag, workspaceId, createdAt: new Date() };
    }

    async assignTag(contactId: string, tag: string): Promise<any> {
        const contact = await this.contactRepository.findOneById(contactId);
        if (contact && !contact.tags.includes(tag)) {
            contact.tags.push(tag);
            await contact.save();
        }
        return contact;
    }

    async removeTag(contactId: string, tag: string): Promise<any> {
        const contact = await this.contactRepository.findOneById(contactId);
        if (contact) {
            contact.tags = contact.tags.filter(t => t !== tag);
            await contact.save();
        }
        return contact;
    }

    async bulkAssignTags(contactIds: string[], tag: string): Promise<any> {
        await this.contactRepository.updateMany(
            { _id: { $in: contactIds } },
            { $addToSet: { tags: tag } }
        );
        return { success: true, count: contactIds.length };
    }
}
