import { Module } from '@nestjs/common';
import { MarketplaceController } from './controllers/marketplace.controller';
import { MarketplaceService } from './services/marketplace.service';
import { MarketplaceTemplateRepositoryModule } from './repository/marketplace.repository.module';

@Module({
    controllers: [MarketplaceController],
    providers: [MarketplaceService],
    exports: [MarketplaceService],
    imports: [MarketplaceTemplateRepositoryModule],
})
export class MarketplaceModule {}
