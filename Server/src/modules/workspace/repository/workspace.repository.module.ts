import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    WorkspaceEntity,
    WorkspaceSchema,
} from './entities/workspace.entity';
import { WorkspaceRepository } from './repositories/workspace.repository';

@Module({
    providers: [WorkspaceRepository],
    exports: [WorkspaceRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: WorkspaceEntity.name,
                    schema: WorkspaceSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class WorkspaceRepositoryModule {}
