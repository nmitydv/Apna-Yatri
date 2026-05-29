import { Module } from '@nestjs/common';
import { SegmentationController } from './controllers/segmentation.controller';
import { SegmentationService } from './services/segmentation.service';
import { ContactRepositoryModule } from 'src/modules/contact/repository/contact.repository.module';

@Module({
    controllers: [SegmentationController],
    providers: [SegmentationService],
    exports: [SegmentationService],
    imports: [ContactRepositoryModule],
})
export class SegmentationModule {}
