import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { AuthService } from 'src/modules/auth/services/auth.service';

jest.mock('src/modules/auth/services/auth.service', () => {
    return {
        AuthService: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockAuthService = {
        register: jest.fn().mockResolvedValue({ user: { email: 'test@example.com' }, accessToken: 'jwt', refreshToken: 'jwt' }),
        login: jest.fn().mockResolvedValue({ user: { email: 'test@example.com' }, accessToken: 'jwt', refreshToken: 'jwt' }),
        verifyMfa: jest.fn().mockResolvedValue(true),
        generateApiKey: jest.fn().mockResolvedValue('ak_live_mockkey'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('register() should return user and tokens', async () => {
        const result = await controller.register({ email: 'test@example.com', password: 'password' });
        expect(result).toBeDefined();
        expect(result.accessToken).toBe('jwt');
    });

    it('login() should return user and tokens', async () => {
        const result = await controller.login({ email: 'test@example.com', password: 'password' });
        expect(result).toBeDefined();
        expect(result.accessToken).toBe('jwt');
    });

    it('logout() should succeed', async () => {
        const result = await controller.logout();
        expect(result.message).toContain('Logged out');
    });

    it('refreshToken() should return new tokens', async () => {
        const result = await controller.refreshToken({});
        expect(result.accessToken).toBeDefined();
    });

    it('verifyEmail() should succeed', async () => {
        const result = await controller.verifyEmail({});
        expect(result.message).toContain('verified');
    });

    it('forgotPassword() should succeed', async () => {
        const result = await controller.forgotPassword({});
        expect(result.message).toContain('reset link');
    });

    it('resetPassword() should succeed', async () => {
        const result = await controller.resetPassword({});
        expect(result.message).toContain('successfully');
    });

    it('changePassword() should succeed', async () => {
        const result = await controller.changePassword({});
        expect(result.message).toContain('changed');
    });

    it('enableMfa() should return qr code', async () => {
        const result = await controller.enableMfa({});
        expect(result.qrCode).toBeDefined();
    });

    it('verifyMfa() should validate', async () => {
        const result = await controller.verifyMfa({ userId: 'u1', code: '123456' });
        expect(result.success).toBe(true);
    });

    it('disableMfa() should succeed', async () => {
        const result = await controller.disableMfa({});
        expect(result.message).toContain('disabled');
    });

    it('getSessions() should return session list', async () => {
        const result = await controller.getSessions('u1');
        expect(result.length).toBeGreaterThan(0);
    });

    it('revokeSession() should delete session', async () => {
        const result = await controller.revokeSession('s1');
        expect(result.message).toContain('revoked');
    });

    it('socialLogin() should return tokens', async () => {
        const result = await controller.socialLogin({});
        expect(result.accessToken).toBeDefined();
    });

    it('oauthAuthorize() should return redirect url', async () => {
        const result = await controller.oauthAuthorize();
        expect(result.url).toBeDefined();
    });

    it('oauthCallback() should return token and email', async () => {
        const result = await controller.oauthCallback('code123');
        expect(result.accessToken).toBeDefined();
    });

    it('generateApiKey() should return api key', async () => {
        const result = await controller.generateApiKey({ userId: 'u1' });
        expect(result.apiKey).toBeDefined();
    });

    it('revokeApiKey() should delete key', async () => {
        const result = await controller.revokeApiKey('key123');
        expect(result.message).toContain('revoked');
    });

    it('ssoLogin() should return token', async () => {
        const result = await controller.ssoLogin({});
        expect(result.accessToken).toBeDefined();
    });

    it('samlLogin() should return token', async () => {
        const result = await controller.samlLogin({});
        expect(result.accessToken).toBeDefined();
    });
});
