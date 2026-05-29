import { Module } from '@nestjs/common';
import { FormsController } from './controllers/forms.controller';
import { FormsService } from './services/forms.service';
import { FormRepositoryModule } from './repository/form.repository.module';

@Module({
    controllers: [FormsController],
    providers: [FormsService],
    exports: [FormsService],
    imports: [FormRepositoryModule],
})
export class FormsModule {}
