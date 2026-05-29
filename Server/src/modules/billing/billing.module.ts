import { Module } from '@nestjs/common';
import { BillingController } from './controllers/billing.controller';
import { BillingService } from './services/billing.service';
import { BillingRepositoryModule } from './repository/billing.repository.module';

@Module({
    controllers: [BillingController],
    providers: [BillingService],
    exports: [BillingService],
    imports: [BillingRepositoryModule],
})
export class BillingModule {}
