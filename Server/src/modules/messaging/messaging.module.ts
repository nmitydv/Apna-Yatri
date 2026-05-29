import { Module } from '@nestjs/common';
import { MessagingController } from './controllers/messaging.controller';
import { MessagingService } from './services/messaging.service';
import { MessageRepositoryModule } from './repository/message.repository.module';

@Module({
    controllers: [MessagingController],
    providers: [MessagingService],
    exports: [MessagingService],
    imports: [MessageRepositoryModule],
})
export class MessagingModule {}
