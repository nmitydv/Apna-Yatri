import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    FormEntity,
    FormSchema,
} from './entities/form.entity';
import { FormRepository } from './repositories/form.repository';

@Module({
    providers: [FormRepository],
    exports: [FormRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: FormEntity.name,
                    schema: FormSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class FormRepositoryModule {}
