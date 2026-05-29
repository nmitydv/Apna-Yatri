import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const PipelineDatabaseName = 'crm_pipelines';

@DatabaseEntity({ collection: PipelineDatabaseName })
export class PipelineEntity extends DatabaseMongoUUIDEntityAbstract {
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
        type: [String],
        default: ['lead', 'contacted', 'proposal', 'deal_won', 'deal_lost'],
    })
    stages: string[];

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const PipelineSchema = SchemaFactory.createForClass(PipelineEntity);
export type PipelineDoc = PipelineEntity & Document;
