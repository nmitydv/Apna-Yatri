import { Module } from '@nestjs/common';
import { TriggerController } from './controllers/trigger.controller';
import { TriggerService } from './services/trigger.service';

@Module({
    controllers: [TriggerController],
    providers: [TriggerService],
    exports: [TriggerService],
    imports: [],
})
export class TriggerModule {}
