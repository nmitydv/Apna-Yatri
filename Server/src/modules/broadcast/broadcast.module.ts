import { Module } from '@nestjs/common';
import { BroadcastController } from './controllers/broadcast.controller';
import { BroadcastService } from './services/broadcast.service';

@Module({
    controllers: [BroadcastController],
    providers: [BroadcastService],
    exports: [BroadcastService],
    imports: [],
})
export class BroadcastModule {}
