interface IOSNotificationActionButton {
  /**
   * Any unique identifier to represent which button was clicked. This is typically passed back to the service worker
   * and host page through events to identify which button was clicked.
   * e.g. 'like-button'
   */
  readonly actionId: string;
  /**
   * The notification action button's text.
   */
  readonly text: string;
  /**
   * A valid publicly reachable HTTPS URL to an image.
   */
  readonly icon?: string;
  /**
   * The URL to open the web browser to when this action button is clicked.
   */
  readonly launchURL?: string;
}

interface IOSNotification {
  /**
   * The OneSignal notification id;
   *  - Primary id on OneSignal's REST API and dashboard
   */
  readonly notificationId: string;
  /**
   * Visible title text on the notification
   */
  readonly title?: string;
  /**
   * Visible body text on the notification
   */
  readonly body: string;
  /**
   * Visible icon the notification; URL format
   */
  readonly icon?: string;
  /**
   * Visible small badgeIcon that displays on some devices; URL format
   * Example: On Android's status bar
   */
  readonly badgeIcon?: string;
  /**
   * Visible image on the notification; URL format
   */
  readonly image?: string;
  /**
   * Visible buttons on the notification
   */
  readonly actionButtons?: IOSNotificationActionButton[];
  /**
   * If this value is the same as existing notification, it will replace it
   * Can be set when creating the notification with "Web Push Topic" on the dashboard
   * or web_push_topic from the REST API.
   */
  readonly topic?: string;
  /**
   * Custom object that was sent with the notification;
   * definable when creating the notification from the OneSignal REST API or dashboard
   */
  readonly additionalData?: NotificationAdditionalData;
  /**
   * URL to open when clicking or tapping on the notification
   */
  readonly launchURL?: string;
  /**
   * Confirm the push was received by reporting back to OneSignal
   */
  readonly confirmDelivery: boolean;
}

export interface Notification extends Pick<IOSNotification, 'title' | 'body' | 'additionalData'> {}

export type NotificationType = 'POST_AMOUNT_STOCK_CHANGE';

export interface NotificationData {
  postId?: string;
  stockAmount?: number;
}

export interface NotificationAdditionalData {
  type: NotificationType;
  data?: NotificationData;
}
