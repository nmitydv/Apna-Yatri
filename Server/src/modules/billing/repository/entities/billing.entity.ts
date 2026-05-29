import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const BillingDatabaseName = 'billings';

@DatabaseEntity({ collection: BillingDatabaseName })
export class BillingEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        type: String,
    })
    workspaceId: string;

    @Prop({
        required: true,
        type: String,
        enum: ['free', 'growth', 'enterprise'],
        default: 'free',
    })
    plan: string;

    @Prop({
        required: true,
        type: String,
        enum: ['active', 'past_due', 'canceled'],
        default: 'active',
    })
    status: string;

    @Prop({
        required: false,
        type: String,
    })
    stripeSubscriptionId?: string;

    @Prop({
        type: [{
            invoiceId: { type: String, required: true },
            amount: { type: Number, required: true },
            status: { type: String, required: true },
            paidAt: { type: Date, default: Date.now },
        }],
        default: [],
    })
    invoices: { invoiceId: string; amount: number; status: string; paidAt: Date }[];

    @Prop({
        type: Map,
        of: String,
        default: {},
    })
    usage: Record<string, string>;

    @Prop({
        required: true,
        type: Boolean,
        default: true,
    })
    isActive: boolean;
}

export const BillingSchema = SchemaFactory.createForClass(BillingEntity);
export type BillingDoc = BillingEntity & Document;
