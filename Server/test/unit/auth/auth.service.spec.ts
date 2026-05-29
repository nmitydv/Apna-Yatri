import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UserRepository } from 'src/modules/user/repository/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let userRepository: UserRepository;
    let jwtService: JwtService;

    const mockUserRepository = {
        exists: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mocked_jwt_token'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserRepository, useValue: mockUserRepository },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userRepository = module.get<UserRepository>(UserRepository);
        jwtService = module.get<JwtService>(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('register', () => {
        it('should successfully register a new user and return tokens', async () => {
            mockUserRepository.exists.mockResolvedValue(false);
            mockUserRepository.create.mockResolvedValue({
                _id: 'user_123',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user',
            });

            const result = await service.register({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            });

            expect(result).toBeDefined();
            expect(result.user._id).toBe('user_123');
            expect(result.accessToken).toBe('mocked_jwt_token');
            expect(result.refreshToken).toBe('mocked_jwt_token');
            expect(mockUserRepository.exists).toHaveBeenCalledWith({ email: 'john@example.com' });
        });

        it('should throw BadRequestException if email already exists', async () => {
            mockUserRepository.exists.mockResolvedValue(true);

            await expect(
                service.register({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                })
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('login', () => {
        it('should successfully login user and return tokens', async () => {
            mockUserRepository.findOne.mockResolvedValue({
                _id: 'user_123',
                email: 'john@example.com',
                role: 'user',
            });

            const result = await service.login({
                email: 'john@example.com',
                password: 'password123',
            });

            expect(result).toBeDefined();
            expect(result.user._id).toBe('user_123');
            expect(result.accessToken).toBe('mocked_jwt_token');
            expect(mockUserRepository.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        });

        it('should throw NotFoundException if user is not found', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);

            await expect(
                service.login({
                    email: 'john@example.com',
                    password: 'password123',
                })
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('verifyMfa', () => {
        it('should return true for valid code', async () => {
            const result = await service.verifyMfa('user_123', '123456');
            expect(result).toBe(true);
        });

        it('should return false for invalid code', async () => {
            const result = await service.verifyMfa('user_123', '000000');
            expect(result).toBe(false);
        });
    });

    describe('generateApiKey', () => {
        it('should return an API key', async () => {
            const result = await service.generateApiKey('user_123');
            expect(result).toContain('ak_live_');
        });
    });
});
