import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    private notifications: any[] = [];

    async sendNotification(data: any): Promise<any> {
        const notif = {
            id: `not_${Math.random().toString(36).substr(2, 9)}`,
            ...data,
            read: false,
            createdAt: new Date(),
        };
        this.notifications.push(notif);
        return notif;
    }

    async getNotifications(userId: string): Promise<any[]> {
        return this.notifications.filter(n => n.userId === userId);
    }

    async markRead(id: string): Promise<any> {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
        }
        return notif;
    }
}
