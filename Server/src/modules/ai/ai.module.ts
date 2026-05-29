import { Module } from '@nestjs/common';
import { AiController } from './controllers/ai.controller';
import { AiService } from './services/ai.service';
import { AiAgentRepositoryModule } from './repository/ai-kb.repository.module';

@Module({
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
    imports: [AiAgentRepositoryModule],
})
export class AiModule {}
