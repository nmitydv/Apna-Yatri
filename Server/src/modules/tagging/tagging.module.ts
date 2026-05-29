import { Module } from '@nestjs/common';
import { TaggingController } from './controllers/tagging.controller';
import { TaggingService } from './services/tagging.service';
import { ContactRepositoryModule } from 'src/modules/contact/repository/contact.repository.module';

@Module({
    controllers: [TaggingController],
    providers: [TaggingService],
    exports: [TaggingService],
    imports: [ContactRepositoryModule],
})
export class TaggingModule {}
