import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    MarketplaceTemplateDoc,
    MarketplaceTemplateEntity,
} from '../entities/marketplace.entity';

@Injectable()
export class MarketplaceTemplateRepository extends DatabaseMongoUUIDRepositoryAbstract<
    MarketplaceTemplateEntity,
    MarketplaceTemplateDoc
> {
    constructor(
        @DatabaseModel(MarketplaceTemplateEntity.name)
        private readonly templateModel: Model<MarketplaceTemplateEntity>
    ) {
        super(templateModel);
    }
}
