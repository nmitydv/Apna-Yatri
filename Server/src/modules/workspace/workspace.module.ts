import { Module } from '@nestjs/common';
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceService } from './services/workspace.service';
import { WorkspaceRepositoryModule } from './repository/workspace.repository.module';

@Module({
    controllers: [WorkspaceController],
    providers: [WorkspaceService],
    exports: [WorkspaceService],
    imports: [WorkspaceRepositoryModule],
})
export class WorkspaceModule {}
