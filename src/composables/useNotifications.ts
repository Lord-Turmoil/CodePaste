/**
 * Toast notification composable using alertifyjs
 */
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

// Configure alertify
alertify.set('notifier', 'delay', 1.5);
alertify.set('notifier', 'position', 'bottom-left');

export type NotificationType = 'success' | 'warning' | 'error' | 'message';

/**
 * Composable for toast notifications
 */
export function useNotifications() {
  /**
   * Show a success notification
   */
  function success(message: string, wait?: number, callback?: () => void): ReturnType<typeof alertify.success> {
    return alertify.success(message, wait, callback);
  }

  /**
   * Show a warning notification
   */
  function warning(message: string): void {
    alertify.warning(message);
  }

  /**
   * Show an error notification
   */
  function error(message: string): void {
    alertify.error(message);
  }

  /**
   * Show an alert dialog
   */
  function alert(title: string, content: string): void {
    alertify.alert(title, content);
  }

  /**
   * Show a notification based on type
   */
  function notify(type: NotificationType, message: string): void {
    switch (type) {
      case 'success':
        alertify.success(message);
        break;
      case 'warning':
        alertify.warning(message);
        break;
      case 'error':
        alertify.error(message);
        break;
      default:
        alertify.message(message);
    }
  }

  return {
    success,
    warning,
    error,
    alert,
    notify,
  };
}
