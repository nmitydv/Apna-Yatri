import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    FlowEntity,
    FlowSchema,
} from './entities/flow.entity';
import { FlowRepository } from './repositories/flow.repository';

@Module({
    providers: [FlowRepository],
    exports: [FlowRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: FlowEntity.name,
                    schema: FlowSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class FlowRepositoryModule {}
