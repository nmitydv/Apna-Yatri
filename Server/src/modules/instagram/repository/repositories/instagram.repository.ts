import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    InstagramDoc,
    InstagramEntity,
} from '../entities/instagram.entity';

@Injectable()
export class InstagramRepository extends DatabaseMongoUUIDRepositoryAbstract<
    InstagramEntity,
    InstagramDoc
> {
    constructor(
        @DatabaseModel(InstagramEntity.name)
        private readonly instagramModel: Model<InstagramEntity>
    ) {
        super(instagramModel);
    }
}
