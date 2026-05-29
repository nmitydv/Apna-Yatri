import { Module } from '@nestjs/common';
import { InstagramController } from './controllers/instagram.controller';
import { InstagramService } from './services/instagram.service';
import { InstagramRepositoryModule } from './repository/instagram.repository.module';

@Module({
    controllers: [InstagramController],
    providers: [InstagramService],
    exports: [InstagramService],
    imports: [InstagramRepositoryModule],
})
export class InstagramModule {}
