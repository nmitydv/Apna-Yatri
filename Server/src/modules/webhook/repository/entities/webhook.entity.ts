import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const WebhookDatabaseName = 'webhooks';

@DatabaseEntity({ collection: WebhookDatabaseName })
export class WebhookEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    url: string;

    @Prop({
        type: [String],
        default: [],
    })
    events: string[];

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;

    @Prop({
        required: true,
        type: String,
    })
    secretKey: string;

    @Prop({
        type: [{
            event: { type: String, required: true },
            responseStatus: { type: Number },
            responseBody: { type: String },
            sentAt: { type: Date, default: Date.now },
        }],
        default: [],
    })
    logs: { event: string; responseStatus: number; responseBody: string; sentAt: Date }[];
}

export const WebhookSchema = SchemaFactory.createForClass(WebhookEntity);
export type WebhookDoc = WebhookEntity & Document;
