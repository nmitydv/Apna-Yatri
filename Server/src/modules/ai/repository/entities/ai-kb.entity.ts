import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const AiAgentDatabaseName = 'ai_agents';

@DatabaseEntity({ collection: AiAgentDatabaseName })
export class AiAgentEntity extends DatabaseMongoUUIDEntityAbstract {
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
        type: String,
    })
    content?: string;

    @Prop({
        type: [{
            name: { type: String, required: true },
            template: { type: String, required: true },
        }],
        default: [],
    })
    prompts: { name: string; template: string }[];

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    agentSettings: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const AiAgentSchema = SchemaFactory.createForClass(AiAgentEntity);
export type AiAgentDoc = AiAgentEntity & Document;
