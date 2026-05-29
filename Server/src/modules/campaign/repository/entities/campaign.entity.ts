import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const CampaignDatabaseName = 'campaigns';

@DatabaseEntity({ collection: CampaignDatabaseName })
export class CampaignEntity extends DatabaseMongoUUIDEntityAbstract {
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
        type: String,
        enum: ['draft', 'scheduled', 'active', 'paused', 'completed'],
        default: 'draft',
    })
    status: string;

    @Prop({
        required: false,
        type: String,
    })
    audienceSegmentId?: string;

    @Prop({
        required: false,
        type: String,
    })
    flowId?: string;

    @Prop({
        required: false,
        type: String,
    })
    schedule?: string;

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    analytics: Record<string, string>;

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    abTestSettings: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const CampaignSchema = SchemaFactory.createForClass(CampaignEntity);
export type CampaignDoc = CampaignEntity & Document;
