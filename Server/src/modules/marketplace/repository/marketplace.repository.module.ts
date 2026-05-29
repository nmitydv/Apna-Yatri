import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    MarketplaceTemplateEntity,
    MarketplaceTemplateSchema,
} from './entities/marketplace.entity';
import { MarketplaceTemplateRepository } from './repositories/marketplace.repository';

@Module({
    providers: [MarketplaceTemplateRepository],
    exports: [MarketplaceTemplateRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: MarketplaceTemplateEntity.name,
                    schema: MarketplaceTemplateSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class MarketplaceTemplateRepositoryModule {}
