import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const WorkspaceDatabaseName = 'workspaces';

@DatabaseEntity({ collection: WorkspaceDatabaseName })
export class WorkspaceEntity extends DatabaseMongoUUIDEntityAbstract {
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
    })
    ownerId: string;

    @Prop({
        type: [{
            userId: { type: String, required: true },
            role: { type: String, required: true },
        }],
        default: [],
    })
    members: { userId: string; role: string }[];

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    settings: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const WorkspaceSchema = SchemaFactory.createForClass(WorkspaceEntity);
export type WorkspaceDoc = WorkspaceEntity & Document;
