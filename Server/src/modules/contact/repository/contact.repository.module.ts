import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    ContactEntity,
    ContactSchema,
} from './entities/contact.entity';
import { ContactRepository } from './repositories/contact.repository';

@Module({
    providers: [ContactRepository],
    exports: [ContactRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: ContactEntity.name,
                    schema: ContactSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class ContactRepositoryModule {}
