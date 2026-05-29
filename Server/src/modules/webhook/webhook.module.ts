import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { WebhookService } from './services/webhook.service';
import { WebhookRepositoryModule } from './repository/webhook.repository.module';

@Module({
    controllers: [WebhookController],
    providers: [WebhookService],
    exports: [WebhookService],
    imports: [WebhookRepositoryModule],
})
export class WebhookModule {}
