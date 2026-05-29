import { Injectable } from '@nestjs/common';
import { ContactRepository } from 'src/modules/contact/repository/repositories/contact.repository';

@Injectable()
export class SegmentationService {
    constructor(private readonly contactRepository: ContactRepository) {}

    async createSegment(data: any): Promise<any> {
        return {
            id: `seg_${Math.random().toString(36).substr(2, 9)}`,
            ...data,
            createdAt: new Date(),
        };
    }

    async getAudiencePreview(filters: any): Promise<number> {
        // Query matching contacts count dynamically based on tag/custom-fields filters
        const query: Record<string, any> = {};
        if (filters.tag) {
            query.tags = filters.tag;
        }
        return this.contactRepository.getTotal(query);
    }
}
