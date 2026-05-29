import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    BillingDoc,
    BillingEntity,
} from '../entities/billing.entity';

@Injectable()
export class BillingRepository extends DatabaseMongoUUIDRepositoryAbstract<
    BillingEntity,
    BillingDoc
> {
    constructor(
        @DatabaseModel(BillingEntity.name)
        private readonly billingModel: Model<BillingEntity>
    ) {
        super(billingModel);
    }
}
