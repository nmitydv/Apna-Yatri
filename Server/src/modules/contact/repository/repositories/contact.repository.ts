import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    ContactDoc,
    ContactEntity,
} from '../entities/contact.entity';

@Injectable()
export class ContactRepository extends DatabaseMongoUUIDRepositoryAbstract<
    ContactEntity,
    ContactDoc
> {
    constructor(
        @DatabaseModel(ContactEntity.name)
        private readonly contactModel: Model<ContactEntity>
    ) {
        super(contactModel);
    }
}
