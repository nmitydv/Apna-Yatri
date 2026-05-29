import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const FormDatabaseName = 'forms';

@DatabaseEntity({ collection: FormDatabaseName })
export class FormEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    title: string;

    @Prop({
        type: [{
            name: { type: String, required: true },
            fieldType: { type: String, required: true },
            required: { type: Boolean, default: false },
        }],
        default: [],
    })
    fields: { name: string; fieldType: string; required: boolean }[];

    @Prop({
        type: [{
            data: { type: Map, of: String, required: true },
            submittedAt: { type: Date, default: Date.now }
        }],
        default: [],
    })
    submissions: { data: Record<string, string>; submittedAt: Date }[];

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    analytics: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const FormSchema = SchemaFactory.createForClass(FormEntity);
export type FormDoc = FormEntity & Document;
