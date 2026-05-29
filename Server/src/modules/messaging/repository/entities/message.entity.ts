import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const MessageDatabaseName = 'messages';

@DatabaseEntity({ collection: MessageDatabaseName })
export class MessageEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        type: String,
    })
    contactId: string;

    @Prop({
        required: true,
        type: String,
        enum: ['inbound', 'outbound'],
    })
    direction: string;

    @Prop({
        required: true,
        type: String,
        enum: ['instagram', 'email', 'sms', 'push'],
    })
    platform: string;

    @Prop({
        required: false,
        type: String,
    })
    content?: string;

    @Prop({
        type: [String],
        default: [],
    })
    attachments: string[];

    @Prop({
        type: [String],
        default: [],
    })
    reactions: string[];

    @Prop({
        required: true,
        type: String,
        enum: ['sent', 'delivered', 'read', 'failed'],
        default: 'sent',
    })
    status: string;

    @Prop({
        required: false,
        type: Date,
    })
    scheduledFor?: Date;

    @Prop({
        required: true,
        type: Boolean,
        default: false,
    })
    isDraft: boolean;

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    metadata: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
export type MessageDoc = MessageEntity & Document;
