import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    WebhookEntity,
    WebhookSchema,
} from './entities/webhook.entity';
import { WebhookRepository } from './repositories/webhook.repository';

@Module({
    providers: [WebhookRepository],
    exports: [WebhookRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: WebhookEntity.name,
                    schema: WebhookSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class WebhookRepositoryModule {}
