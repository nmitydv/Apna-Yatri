import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const FlowDatabaseName = 'flows';

@DatabaseEntity({ collection: FlowDatabaseName })
export class FlowEntity extends DatabaseMongoUUIDEntityAbstract {
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
        type: [{
            id: { type: String, required: true },
            type: { type: String, required: true },
            data: { type: Map, of: String },
        }],
        default: [],
    })
    nodes: { id: string; type: string; data: Record<string, string> }[];

    @Prop({
        type: [{
            id: { type: String, required: true },
            source: { type: String, required: true },
            target: { type: String, required: true },
        }],
        default: [],
    })
    edges: { id: string; source: string; target: string }[];

    @Prop({
        required: true,
        type: Number,
        default: 1,
    })
    version: number;

    @Prop({
        required: true,
        type: Boolean,
        default: false,
    })
    isPublished: boolean;

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    analytics: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const FlowSchema = SchemaFactory.createForClass(FlowEntity);
export type FlowDoc = FlowEntity & Document;
