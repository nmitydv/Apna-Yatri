import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepositoryModule } from 'src/modules/user/repository/user.repository.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [
        UserRepositoryModule,
        JwtModule.register({
            secret: process.env.AUTH_JWT_SECRET_KEY || 'defaultSecretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
})
export class AuthModule {}
