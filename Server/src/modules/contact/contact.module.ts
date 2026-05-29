import { Module } from '@nestjs/common';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { ContactRepositoryModule } from './repository/contact.repository.module';

@Module({
    controllers: [ContactController],
    providers: [ContactService],
    exports: [ContactService],
    imports: [ContactRepositoryModule],
})
export class ContactModule {}
