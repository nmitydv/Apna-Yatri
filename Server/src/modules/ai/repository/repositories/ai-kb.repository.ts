import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    AiAgentDoc,
    AiAgentEntity,
} from '../entities/ai-kb.entity';

@Injectable()
export class AiAgentRepository extends DatabaseMongoUUIDRepositoryAbstract<
    AiAgentEntity,
    AiAgentDoc
> {
    constructor(
        @DatabaseModel(AiAgentEntity.name)
        private readonly aiAgentModel: Model<AiAgentEntity>
    ) {
        super(aiAgentModel);
    }
}
