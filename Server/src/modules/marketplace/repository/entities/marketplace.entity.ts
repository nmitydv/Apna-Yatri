import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const MarketplaceDatabaseName = 'marketplace_templates';

@DatabaseEntity({ collection: MarketplaceDatabaseName })
export class MarketplaceTemplateEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    name: string;

    @Prop({
        required: true,
        type: String,
    })
    description: string;

    @Prop({
        required: true,
        type: String,
        enum: ['flow', 'automation', 'form'],
    })
    type: string;

    @Prop({
        required: true,
        type: Number,
        default: 0,
    })
    price: number;

    @Prop({
        required: true,
        type: String,
    })
    publisherId: string;

    @Prop({
        required: true,
        type: Number,
        default: 5.0,
    })
    rating: number;

    @Prop({
        type: [{
            reviewerId: { type: String, required: true },
            text: { type: String, required: true },
            score: { type: Number, required: true },
            createdAt: { type: Date, default: Date.now }
        }],
        default: [],
    })
    reviews: { reviewerId: string; text: string; score: number; createdAt: Date }[];

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const MarketplaceTemplateSchema = SchemaFactory.createForClass(MarketplaceTemplateEntity);
export type MarketplaceTemplateDoc = MarketplaceTemplateEntity & Document;
