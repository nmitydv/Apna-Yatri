import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const AutomationDatabaseName = 'automations';

@DatabaseEntity({ collection: AutomationDatabaseName })
export class AutomationEntity extends DatabaseMongoUUIDEntityAbstract {
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
        type: Boolean,
        default: false,
    })
    isActive: boolean;

    @Prop({
        type: [{
            triggerType: { type: String, required: true },
            value: { type: String },
        }],
        default: [],
    })
    triggers: { triggerType: string; value: string }[];

    @Prop({
        type: [{
            stepType: { type: String, required: true },
            content: { type: String },
        }],
        default: [],
    })
    steps: { stepType: string; content: string }[];

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    analytics: Record<string, string>;

    @Prop({
        type: [String],
        default: [],
    })
    logs: string[];
}

export const AutomationSchema = SchemaFactory.createForClass(AutomationEntity);
export type AutomationDoc = AutomationEntity & Document;
