import { NotificationType } from './notification-type.enum';

export class Notification {
    public static ID_SEQUENCE = 0;
    public id: number;
    constructor(public message: String, public type = NotificationType.INFO, public icon?: String) {
        this.id = Notification.ID_SEQUENCE++;
    }
}
