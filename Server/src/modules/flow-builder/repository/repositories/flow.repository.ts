import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    FlowDoc,
    FlowEntity,
} from '../entities/flow.entity';

@Injectable()
export class FlowRepository extends DatabaseMongoUUIDRepositoryAbstract<
    FlowEntity,
    FlowDoc
> {
    constructor(
        @DatabaseModel(FlowEntity.name)
        private readonly flowModel: Model<FlowEntity>
    ) {
        super(flowModel);
    }
}
