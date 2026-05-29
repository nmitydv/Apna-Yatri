import { Module } from '@nestjs/common';
import { UserPublicController } from "../../modules/user/controllers/user.public.controller";
import { UserModule } from "../../modules/user/user.module";
import { AuthModule } from "../../common/auth/auth.module";

@Module({
    controllers: [UserPublicController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule],
})
export class RoutesPublicModule {}
