import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from '../repository/repositories/contact.repository';
import { ContactEntity, ContactDoc } from '../repository/entities/contact.entity';

@Injectable()
export class ContactService {
    constructor(private readonly contactRepository: ContactRepository) {}

    async createContact(data: any): Promise<ContactDoc> {
        return this.contactRepository.create({
            workspaceId: data.workspaceId,
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber,
            tags: data.tags || [],
            customFields: data.customFields || {},
            notes: [],
            timeline: [{ event: 'Contact created', createdAt: new Date() }],
            activity: [{ activityType: 'lifecycle', description: 'Contact entered CRM', createdAt: new Date() }],
            segments: [],
            source: data.source || 'api',
            ownerId: data.ownerId,
            isArchived: false,
            isActive: true,
        });
    }

    async getContact(id: string): Promise<ContactDoc> {
        const contact = await this.contactRepository.findOneById(id);
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }

    async updateContact(id: string, data: any): Promise<ContactDoc> {
        const contact = await this.getContact(id);
        Object.assign(contact, data);
        contact.timeline.push({ event: 'Contact updated', createdAt: new Date() });
        return contact.save();
    }

    async deleteContact(id: string): Promise<boolean> {
        const contact = await this.getContact(id);
        await this.contactRepository.softDelete(contact);
        return true;
    }

    async addTag(id: string, tag: string): Promise<ContactDoc> {
        const contact = await this.getContact(id);
        if (!contact.tags.includes(tag)) {
            contact.tags.push(tag);
            contact.timeline.push({ event: `Tag ${tag} added`, createdAt: new Date() });
            await contact.save();
        }
        return contact;
    }

    async removeTag(id: string, tag: string): Promise<ContactDoc> {
        const contact = await this.getContact(id);
        contact.tags = contact.tags.filter(t => t !== tag);
        contact.timeline.push({ event: `Tag ${tag} removed`, createdAt: new Date() });
        return contact.save();
    }

    async addNote(id: string, note: string): Promise<ContactDoc> {
        const contact = await this.getContact(id);
        contact.notes.push(note);
        contact.timeline.push({ event: `Note added`, createdAt: new Date() });
        return contact.save();
    }

    async searchContacts(workspaceId: string, query: string): Promise<ContactDoc[]> {
        return this.contactRepository.findAll({
            workspaceId,
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
    }
}
