import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    TaskDoc,
    TaskEntity,
} from '../entities/task.entity';

@Injectable()
export class TaskRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TaskEntity,
    TaskDoc
> {
    constructor(
        @DatabaseModel(TaskEntity.name)
        private readonly taskModel: Model<TaskEntity>
    ) {
        super(taskModel);
    }
}
