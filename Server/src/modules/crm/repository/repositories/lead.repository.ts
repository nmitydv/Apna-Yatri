import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    LeadDoc,
    LeadEntity,
} from '../entities/lead.entity';

@Injectable()
export class LeadRepository extends DatabaseMongoUUIDRepositoryAbstract<
    LeadEntity,
    LeadDoc
> {
    constructor(
        @DatabaseModel(LeadEntity.name)
        private readonly leadModel: Model<LeadEntity>
    ) {
        super(leadModel);
    }
}
