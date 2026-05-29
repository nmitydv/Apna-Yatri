import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const InstagramDatabaseName = 'instagrams';

@DatabaseEntity({ collection: InstagramDatabaseName })
export class InstagramEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        type: String,
    })
    accountId: string;

    @Prop({
        required: true,
        type: String,
    })
    accountName: string;

    @Prop({
        required: true,
        type: String,
    })
    accessToken: string;

    @Prop({
        required: true,
        type: String,
        default: 'connected',
    })
    status: string;

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    health: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const InstagramSchema = SchemaFactory.createForClass(InstagramEntity);
export type InstagramDoc = InstagramEntity & Document;
