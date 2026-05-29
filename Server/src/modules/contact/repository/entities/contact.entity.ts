import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const ContactDatabaseName = 'contacts';

@DatabaseEntity({ collection: ContactDatabaseName })
export class ContactEntity extends DatabaseMongoUUIDEntityAbstract {
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
        required: false,
        lowercase: true,
        trim: true,
        type: String,
    })
    email?: string;

    @Prop({
        required: false,
        type: String,
    })
    mobileNumber?: string;

    @Prop({
        type: [String],
        default: [],
    })
    tags: string[];

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    customFields: Record<string, string>;

    @Prop({
        type: [String],
        default: [],
    })
    notes: string[];

    @Prop({
        type: [{
            event: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }],
        default: [],
    })
    timeline: { event: string; createdAt: Date }[];

    @Prop({
        type: [{
            activityType: { type: String, required: true },
            description: { type: String },
            createdAt: { type: Date, default: Date.now }
        }],
        default: [],
    })
    activity: { activityType: string; description: string; createdAt: Date }[];

    @Prop({
        type: [String],
        default: [],
    })
    segments: string[];

    @Prop({
        required: false,
        type: String,
    })
    source?: string;

    @Prop({
        required: false,
        type: String,
    })
    ownerId?: string;

    @Prop({
        required: true,
        type: Boolean,
        default: false,
    })
    isArchived: boolean;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(ContactEntity);
export type ContactDoc = ContactEntity & Document;
