import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from 'src/common/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { MigrationSettingSeed } from 'src/migration/seeds/migration.setting.seed';
import { MigrationUserSeed } from 'src/migration/seeds/migration.user.seed';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        AuthModule,
        UserModule,
    ],
    providers: [
        MigrationSettingSeed,
        MigrationUserSeed,
    ],
    exports: [],
})
export class MigrationModule {}
