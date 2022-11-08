import {
  NotificationTitleMessage,
  NOTIFICATION_TYPE,
} from "react-notifications-component";

export interface INotification {
  type: NOTIFICATION_TYPE;
  title: string;
  message?: NotificationTitleMessage;
}

export interface INotificationWithoutType {
  title?: string;
  message: NotificationTitleMessage;
}