import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const TaskDatabaseName = 'crm_tasks';

@DatabaseEntity({ collection: TaskDatabaseName })
export class TaskEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 250,
    })
    description: string;

    @Prop({
        required: false,
        type: String,
    })
    dueDate?: Date;

    @Prop({
        required: true,
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    })
    status: string;

    @Prop({
        required: false,
        type: String,
    })
    assigneeId?: string;

    @Prop({
        required: false,
        type: String,
    })
    contactId?: string;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
export type TaskDoc = TaskEntity & Document;
