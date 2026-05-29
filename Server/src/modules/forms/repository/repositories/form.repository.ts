import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    FormDoc,
    FormEntity,
} from '../entities/form.entity';

@Injectable()
export class FormRepository extends DatabaseMongoUUIDRepositoryAbstract<
    FormEntity,
    FormDoc
> {
    constructor(
        @DatabaseModel(FormEntity.name)
        private readonly formModel: Model<FormEntity>
    ) {
        super(formModel);
    }
}
