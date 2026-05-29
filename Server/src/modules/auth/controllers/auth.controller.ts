import { Controller, Post, Get, Body, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';

@ApiTags('modules.auth')
@Controller({
    version: '1',
    path: '/auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() body: any) {
        return this.authService.register(body);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: any) {
        return this.authService.login(body);
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout() {
        return { message: 'Logged out successfully' };
    }

    @Post('/refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() body: any) {
        return { accessToken: 'new-access-token-mock', refreshToken: 'new-refresh-token-mock' };
    }

    @Post('/verify-email')
    @HttpCode(HttpStatus.OK)
    async verifyEmail(@Body() body: any) {
        return { message: 'Email verified successfully' };
    }

    @Post('/forgot-password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() body: any) {
        return { message: 'Password reset link sent to email' };
    }

    @Post('/reset-password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() body: any) {
        return { message: 'Password reset successfully' };
    }

    @Post('/change-password')
    @HttpCode(HttpStatus.OK)
    async changePassword(@Body() body: any) {
        return { message: 'Password changed successfully' };
    }

    @Post('/mfa/enable')
    @HttpCode(HttpStatus.OK)
    async enableMfa(@Body() body: any) {
        return { qrCode: 'mock-qr-code-url-data', secret: 'mock-secret-key' };
    }

    @Post('/mfa/verify')
    @HttpCode(HttpStatus.OK)
    async verifyMfa(@Body() body: any) {
        const isValid = await this.authService.verifyMfa(body.userId, body.code);
        return { success: isValid };
    }

    @Post('/mfa/disable')
    @HttpCode(HttpStatus.OK)
    async disableMfa(@Body() body: any) {
        return { message: 'MFA disabled successfully' };
    }

    @Get('/sessions')
    async getSessions(@Query('userId') userId: string) {
        return [
            { id: 'session_1', device: 'Chrome / macOS', ip: '127.0.0.1', active: true },
            { id: 'session_2', device: 'Safari / iPhone', ip: '192.168.1.1', active: false }
        ];
    }

    @Delete('/sessions/:id')
    async revokeSession(@Param('id') id: string) {
        return { message: `Session ${id} revoked` };
    }

    @Post('/social-login')
    @HttpCode(HttpStatus.OK)
    async socialLogin(@Body() body: any) {
        return { message: 'Social login successful', accessToken: 'mock-social-token' };
    }

    @Get('/oauth/authorize')
    async oauthAuthorize() {
        return { url: 'https://social-auth-provider.com/oauth/authorize' };
    }

    @Get('/oauth/callback')
    async oauthCallback(@Query('code') code: string) {
        return { accessToken: 'mock-oauth-access-token', email: 'oauth-user@example.com' };
    }

    @Post('/api-keys')
    async generateApiKey(@Body() body: any) {
        const apiKey = await this.authService.generateApiKey(body.userId);
        return { apiKey };
    }

    @Delete('/api-keys/:key')
    async revokeApiKey(@Param('key') key: string) {
        return { message: `API Key ${key} revoked` };
    }

    @Post('/sso-login')
    @HttpCode(HttpStatus.OK)
    async ssoLogin(@Body() body: any) {
        return { accessToken: 'mock-sso-token' };
    }

    @Post('/saml-login')
    @HttpCode(HttpStatus.OK)
    async samlLogin(@Body() body: any) {
        return { accessToken: 'mock-saml-token' };
    }
}
