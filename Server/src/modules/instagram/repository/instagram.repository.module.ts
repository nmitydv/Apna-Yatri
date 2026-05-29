import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    InstagramEntity,
    InstagramSchema,
} from './entities/instagram.entity';
import { InstagramRepository } from './repositories/instagram.repository';

@Module({
    providers: [InstagramRepository],
    exports: [InstagramRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: InstagramEntity.name,
                    schema: InstagramSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class InstagramRepositoryModule {}
