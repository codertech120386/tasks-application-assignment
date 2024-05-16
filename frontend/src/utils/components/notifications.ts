import { notifications } from '@mantine/notifications';

type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'loading';

const showNotification = (
  type: NotificationType,
  message?: string,
  duration?: number
) => {
  const titles = {
    success: 'Way to go...',
    error: 'Something went wrong...',
    info: 'Something interesting...',
    warning: 'Proceed with caution...',
    loading: 'Loading please wait...',
  };

  const messages = {
    success: 'Success',
    error: 'Error',
    info: 'Info',
    warning: 'Warning',
  };

  const colors = {
    success: 'green',
    error: 'red',
    info: 'indigo',
    warning: 'yellow',
    loading: 'gray',
  };

  notifications.show({
    title: titles[type],
    message: type === 'loading' ? undefined : `${messages[type]}: ${message}`,
    color: colors[type],
    autoClose: duration ?? 3000,
    loading: type === 'loading',
    withBorder: true,
  });
};

export const notificationsMethods = {
  successNotification: (message?: string, duration?: number) => {
    showNotification('success', message, duration);
  },
  errorNotification: (message?: string, duration?: number) => {
    if (!message?.length) {
      message = 'Somethinggggg went wrong';
    }
    showNotification('error', message, duration);
  },
  infoNotification: (message?: string, duration?: number) => {
    showNotification('info', message, duration);
  },
  warningNotification: (message?: string, duration?: number) => {
    showNotification('warning', message, duration);
  },
  loadingNotification: (duration?: number) => {
    showNotification('loading', undefined, duration);
  },
};
