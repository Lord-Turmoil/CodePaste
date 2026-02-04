declare module 'alertifyjs' {
  interface AlertifyNotification {
    setContent(content: string): void;
    dismiss(): void;
  }

  interface AlertifyInstance {
    success(message: string, wait?: number, callback?: () => void): AlertifyNotification;
    error(message: string, wait?: number, callback?: () => void): AlertifyNotification;
    warning(message: string, wait?: number, callback?: () => void): AlertifyNotification;
    message(message: string, wait?: number, callback?: () => void): AlertifyNotification;
    alert(title: string, message: string, callback?: () => void): AlertifyInstance;
    set(type: string, key: string, value: string | number): void;
  }

  const alertify: AlertifyInstance;
  export default alertify;
}
