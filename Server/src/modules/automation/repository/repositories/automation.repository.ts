import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    AutomationDoc,
    AutomationEntity,
} from '../entities/automation.entity';

@Injectable()
export class AutomationRepository extends DatabaseMongoUUIDRepositoryAbstract<
    AutomationEntity,
    AutomationDoc
> {
    constructor(
        @DatabaseModel(AutomationEntity.name)
        private readonly automationModel: Model<AutomationEntity>
    ) {
        super(automationModel);
    }
}
