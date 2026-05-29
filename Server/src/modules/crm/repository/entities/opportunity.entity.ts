import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const OpportunityDatabaseName = 'crm_opportunities';

@DatabaseEntity({ collection: OpportunityDatabaseName })
export class OpportunityEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        type: String,
    })
    leadId: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    title: string;

    @Prop({
        required: true,
        type: Number,
        default: 0,
    })
    value: number;

    @Prop({
        required: true,
        type: String,
        enum: ['discovery', 'proposal', 'negotiation', 'won', 'lost'],
        default: 'discovery',
    })
    stage: string;

    @Prop({
        required: false,
        type: String,
    })
    ownerId?: string;

    @Prop({
        type: [String],
        default: [],
    })
    notes: string[];

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const OpportunitySchema = SchemaFactory.createForClass(OpportunityEntity);
export type OpportunityDoc = OpportunityEntity & Document;
