import { Injectable, NotFoundException } from '@nestjs/common';
import { MarketplaceTemplateRepository } from '../repository/repositories/marketplace.repository';
import { MarketplaceTemplateEntity, MarketplaceTemplateDoc } from '../repository/entities/marketplace.entity';

@Injectable()
export class MarketplaceService {
    constructor(private readonly marketplaceTemplateRepository: MarketplaceTemplateRepository) {}

    async createTemplate(data: any): Promise<MarketplaceTemplateDoc> {
        return this.marketplaceTemplateRepository.create({
            name: data.name,
            description: data.description,
            type: data.type || 'flow',
            price: data.price || 0,
            publisherId: data.publisherId,
            rating: 5.0,
            reviews: [],
            isActive: true,
        });
    }

    async getTemplates(): Promise<MarketplaceTemplateDoc[]> {
        return this.marketplaceTemplateRepository.findAll();
    }

    async rateTemplate(id: string, reviewData: any): Promise<MarketplaceTemplateDoc> {
        const template = await this.marketplaceTemplateRepository.findOneById(id);
        if (!template) {
            throw new NotFoundException('Template not found');
        }
        template.reviews.push({
            reviewerId: reviewData.reviewerId,
            text: reviewData.text,
            score: reviewData.score,
            createdAt: new Date(),
        });
        
        // Calculate new rating
        const totalScore = template.reviews.reduce((acc, curr) => acc + curr.score, 0);
        template.rating = parseFloat((totalScore / template.reviews.length).toFixed(1));
        
        return template.save();
    }
}
