import { Injectable } from '@nestjs/common';

@Injectable()
export class DevPlatformService {
    private keys: string[] = [];

    async generateKey(workspaceId: string): Promise<string> {
        const key = `ak_dev_${Buffer.from(workspaceId + Date.now().toString()).toString('hex')}`;
        this.keys.push(key);
        return key;
    }

    async revokeKey(key: string): Promise<boolean> {
        this.keys = this.keys.filter(k => k !== key);
        return true;
    }
}
