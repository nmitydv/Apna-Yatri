import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    MessageEntity,
    MessageSchema,
} from './entities/message.entity';
import { MessageRepository } from './repositories/message.repository';

@Module({
    providers: [MessageRepository],
    exports: [MessageRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: MessageEntity.name,
                    schema: MessageSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class MessageRepositoryModule {}
