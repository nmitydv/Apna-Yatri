import { Module } from '@nestjs/common';
import { FlowBuilderController } from './controllers/flow-builder.controller';
import { FlowBuilderService } from './services/flow-builder.service';
import { FlowRepositoryModule } from './repository/flow.repository.module';

@Module({
    controllers: [FlowBuilderController],
    providers: [FlowBuilderService],
    exports: [FlowBuilderService],
    imports: [FlowRepositoryModule],
})
export class FlowBuilderModule {}
