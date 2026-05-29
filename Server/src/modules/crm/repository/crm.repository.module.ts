import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { LeadEntity, LeadSchema } from './entities/lead.entity';
import { OpportunityEntity, OpportunitySchema } from './entities/opportunity.entity';
import { PipelineEntity, PipelineSchema } from './entities/pipeline.entity';
import { TaskEntity, TaskSchema } from './entities/task.entity';
import { LeadRepository } from './repositories/lead.repository';
import { OpportunityRepository } from './repositories/opportunity.repository';
import { PipelineRepository } from './repositories/pipeline.repository';
import { TaskRepository } from './repositories/task.repository';

@Module({
    providers: [
        LeadRepository,
        OpportunityRepository,
        PipelineRepository,
        TaskRepository,
    ],
    exports: [
        LeadRepository,
        OpportunityRepository,
        PipelineRepository,
        TaskRepository,
    ],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                { name: LeadEntity.name, schema: LeadSchema },
                { name: OpportunityEntity.name, schema: OpportunitySchema },
                { name: PipelineEntity.name, schema: PipelineSchema },
                { name: TaskEntity.name, schema: TaskSchema },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CrmRepositoryModule {}
