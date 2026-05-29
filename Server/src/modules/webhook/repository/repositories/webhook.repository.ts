import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    WebhookDoc,
    WebhookEntity,
} from '../entities/webhook.entity';

@Injectable()
export class WebhookRepository extends DatabaseMongoUUIDRepositoryAbstract<
    WebhookEntity,
    WebhookDoc
> {
    constructor(
        @DatabaseModel(WebhookEntity.name)
        private readonly webhookModel: Model<WebhookEntity>
    ) {
        super(webhookModel);
    }
}
