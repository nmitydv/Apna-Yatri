import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    MessageDoc,
    MessageEntity,
} from '../entities/message.entity';

@Injectable()
export class MessageRepository extends DatabaseMongoUUIDRepositoryAbstract<
    MessageEntity,
    MessageDoc
> {
    constructor(
        @DatabaseModel(MessageEntity.name)
        private readonly messageModel: Model<MessageEntity>
    ) {
        super(messageModel);
    }
}
