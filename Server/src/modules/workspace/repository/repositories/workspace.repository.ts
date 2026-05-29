import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    WorkspaceDoc,
    WorkspaceEntity,
} from '../entities/workspace.entity';

@Injectable()
export class WorkspaceRepository extends DatabaseMongoUUIDRepositoryAbstract<
    WorkspaceEntity,
    WorkspaceDoc
> {
    constructor(
        @DatabaseModel(WorkspaceEntity.name)
        private readonly workspaceModel: Model<WorkspaceEntity>
    ) {
        super(workspaceModel);
    }
}
