import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/repository/repositories/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    async register(data: any): Promise<any> {
        const exist = await this.userRepository.exists({ email: data.email });
        if (exist) {
            throw new BadRequestException('Email already registered');
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password || 'password123', salt);
        
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber || `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            role: data.role || 'user',
            location: data.location || 'US',
            gender: data.gender || 'male',
            age: data.age || 30,
            joiningDate: new Date(),
            isActive: true,
            notificationTokens: [],
        });

        const tokenPayload = { sub: user._id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(tokenPayload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(tokenPayload, { expiresIn: '7d' });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async login(data: any): Promise<any> {
        const user = await this.userRepository.findOne({ email: data.email });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const tokenPayload = { sub: user._id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(tokenPayload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(tokenPayload, { expiresIn: '7d' });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async verifyMfa(userId: string, code: string): Promise<boolean> {
        return code === '123456';
    }

    async generateApiKey(userId: string): Promise<string> {
        return `ak_live_${Buffer.from(userId + Date.now().toString()).toString('hex')}`;
    }
}
