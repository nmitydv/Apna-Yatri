import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AwsModule } from 'src/common/aws/aws.module';
import { FirebaseController } from 'src/common/firebase/controllers/firebase.controller';
import { FirebaseModule } from 'src/common/firebase/firebase.module';
import { MessageController } from 'src/common/message/controllers/message.controller';
import { SettingController } from 'src/common/setting/controllers/setting.controller';
import { HealthController } from 'src/health/controllers/health.controller';
import { HealthModule } from 'src/health/health.module';

// New Business Modules
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { WorkspaceModule } from 'src/modules/workspace/workspace.module';
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';
import { InstagramModule } from 'src/modules/instagram/instagram.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { MessagingModule } from 'src/modules/messaging/messaging.module';
import { AutomationModule } from 'src/modules/automation/automation.module';
import { FlowBuilderModule } from 'src/modules/flow-builder/flow-builder.module';
import { TriggerModule } from 'src/modules/trigger/trigger.module';
import { AiModule } from 'src/modules/ai/ai.module';
import { CampaignModule } from 'src/modules/campaign/campaign.module';
import { BroadcastModule } from 'src/modules/broadcast/broadcast.module';
import { TaggingModule } from 'src/modules/tagging/tagging.module';
import { SegmentationModule } from 'src/modules/segmentation/segmentation.module';
import { FormsModule } from 'src/modules/forms/forms.module';
import { WebhookModule } from 'src/modules/webhook/webhook.module';
import { BillingModule } from 'src/modules/billing/billing.module';
import { TeamModule } from 'src/modules/team/team.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { MarketplaceModule } from 'src/modules/marketplace/marketplace.module';
import { DevPlatformModule } from 'src/modules/dev-platform/dev-platform.module';
import { AdminModule } from 'src/modules/admin/admin.module';

// New Controllers
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { WorkspaceController } from 'src/modules/workspace/controllers/workspace.controller';
import { DashboardController } from 'src/modules/dashboard/controllers/dashboard.controller';
import { InstagramController } from 'src/modules/instagram/controllers/instagram.controller';
import { ContactController } from 'src/modules/contact/controllers/contact.controller';
import { MessagingController } from 'src/modules/messaging/controllers/messaging.controller';
import { AutomationController } from 'src/modules/automation/controllers/automation.controller';
import { FlowBuilderController } from 'src/modules/flow-builder/controllers/flow-builder.controller';
import { TriggerController } from 'src/modules/trigger/controllers/trigger.controller';
import { AiController } from 'src/modules/ai/controllers/ai.controller';
import { CampaignController } from 'src/modules/campaign/controllers/campaign.controller';
import { BroadcastController } from 'src/modules/broadcast/controllers/broadcast.controller';
import { TaggingController } from 'src/modules/tagging/controllers/tagging.controller';
import { SegmentationController } from 'src/modules/segmentation/controllers/segmentation.controller';
import { FormsController } from 'src/modules/forms/controllers/forms.controller';
import { WebhookController } from 'src/modules/webhook/controllers/webhook.controller';
import { BillingController } from 'src/modules/billing/controllers/billing.controller';
import { TeamController } from 'src/modules/team/controllers/team.controller';
import { NotificationController } from 'src/modules/notification/controllers/notification.controller';
import { AnalyticsController } from 'src/modules/analytics/controllers/analytics.controller';
import { MarketplaceController } from 'src/modules/marketplace/controllers/marketplace.controller';
import { DevPlatformController } from 'src/modules/dev-platform/controllers/dev-platform.controller';
import { AdminController } from 'src/modules/admin/controllers/admin.controller';

@Module({
    controllers: [
        HealthController,
        SettingController,
        MessageController,
        FirebaseController,
        
        AuthController,
        UserController,
        WorkspaceController,
        DashboardController,
        InstagramController,
        ContactController,
        MessagingController,
        AutomationController,
        FlowBuilderController,
        TriggerController,
        AiController,
        CampaignController,
        BroadcastController,
        TaggingController,
        SegmentationController,
        FormsController,
        WebhookController,
        BillingController,
        TeamController,
        NotificationController,
        AnalyticsController,
        MarketplaceController,
        DevPlatformController,
        AdminController,
    ],
    providers: [],
    exports: [],
    imports: [ 
        AwsModule,
        TerminusModule,
        HealthModule,
        FirebaseModule,

        AuthModule,
        UserModule,
        WorkspaceModule,
        DashboardModule,
        InstagramModule,
        ContactModule,
        MessagingModule,
        AutomationModule,
        FlowBuilderModule,
        TriggerModule,
        AiModule,
        CampaignModule,
        BroadcastModule,
        TaggingModule,
        SegmentationModule,
        FormsModule,
        WebhookModule,
        BillingModule,
        TeamModule,
        NotificationModule,
        AnalyticsModule,
        MarketplaceModule,
        DevPlatformModule,
        AdminModule,
    ],
})
export class RoutesModule {}
