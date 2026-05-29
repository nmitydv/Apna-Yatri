import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    AiAgentEntity,
    AiAgentSchema,
} from './entities/ai-kb.entity';
import { AiAgentRepository } from './repositories/ai-kb.repository';

@Module({
    providers: [AiAgentRepository],
    exports: [AiAgentRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: AiAgentEntity.name,
                    schema: AiAgentSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class AiAgentRepositoryModule {}
