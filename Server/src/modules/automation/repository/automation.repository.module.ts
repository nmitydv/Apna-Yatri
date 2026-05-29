import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    AutomationEntity,
    AutomationSchema,
} from './entities/automation.entity';
import { AutomationRepository } from './repositories/automation.repository';

@Module({
    providers: [AutomationRepository],
    exports: [AutomationRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: AutomationEntity.name,
                    schema: AutomationSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class AutomationRepositoryModule {}
