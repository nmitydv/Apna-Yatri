import { Module } from '@nestjs/common';
import { AutomationController } from './controllers/automation.controller';
import { AutomationService } from './services/automation.service';
import { AutomationRepositoryModule } from './repository/automation.repository.module';

@Module({
    controllers: [AutomationController],
    providers: [AutomationService],
    exports: [AutomationService],
    imports: [AutomationRepositoryModule],
})
export class AutomationModule {}
