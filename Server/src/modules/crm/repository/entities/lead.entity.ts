import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const LeadDatabaseName = 'crm_leads';

@DatabaseEntity({ collection: LeadDatabaseName })
export class LeadEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    name: string;

    @Prop({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
    })
    email: string;

    @Prop({
        required: false,
        type: String,
    })
    mobileNumber?: string;

    @Prop({
        required: true,
        type: String,
        enum: ['new', 'contacted', 'qualified', 'lost'],
        default: 'new',
    })
    status: string;

    @Prop({
        required: false,
        type: String,
    })
    ownerId?: string;

    @Prop({
        type: [{
            activity: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }],
        default: [],
    })
    activities: { activity: string; timestamp: Date }[];

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const LeadSchema = SchemaFactory.createForClass(LeadEntity);
export type LeadDoc = LeadEntity & Document;
