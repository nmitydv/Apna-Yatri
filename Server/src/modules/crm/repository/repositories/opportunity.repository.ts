import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    OpportunityDoc,
    OpportunityEntity,
} from '../entities/opportunity.entity';

@Injectable()
export class OpportunityRepository extends DatabaseMongoUUIDRepositoryAbstract<
    OpportunityEntity,
    OpportunityDoc
> {
    constructor(
        @DatabaseModel(OpportunityEntity.name)
        private readonly opportunityModel: Model<OpportunityEntity>
    ) {
        super(opportunityModel);
    }
}
