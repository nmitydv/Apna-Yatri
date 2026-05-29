import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';

@Module({
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
    imports: [],
})
export class NotificationModule {}
