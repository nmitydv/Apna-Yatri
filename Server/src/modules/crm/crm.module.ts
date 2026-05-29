import { Module } from '@nestjs/common';
import { CrmController } from './controllers/crm.controller';
import { CrmService } from './services/crm.service';
import { CrmRepositoryModule } from './repository/crm.repository.module';

@Module({
    controllers: [CrmController],
    providers: [CrmService],
    exports: [CrmService],
    imports: [CrmRepositoryModule],
})
export class CrmModule {}
