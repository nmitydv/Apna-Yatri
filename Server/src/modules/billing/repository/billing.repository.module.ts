import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    BillingEntity,
    BillingSchema,
} from './entities/billing.entity';
import { BillingRepository } from './repositories/billing.repository';

@Module({
    providers: [BillingRepository],
    exports: [BillingRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: BillingEntity.name,
                    schema: BillingSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class BillingRepositoryModule {}
