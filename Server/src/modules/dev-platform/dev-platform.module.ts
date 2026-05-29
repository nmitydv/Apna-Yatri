import { Module } from '@nestjs/common';
import { DevPlatformController } from './controllers/dev-platform.controller';
import { DevPlatformService } from './services/dev-platform.service';

@Module({
    controllers: [DevPlatformController],
    providers: [DevPlatformService],
    exports: [DevPlatformService],
    imports: [],
})
export class DevPlatformModule {}
