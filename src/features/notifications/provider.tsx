import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect } from 'react';
import OneSignal from 'react-onesignal';
import { toast, ToastContainer } from 'react-toastify';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { Notification, NotificationAdditionalData } from '../../types/notifications';
import { renderNotificationsContent } from './utils';

import { ChildrenProp } from 'types/general';

interface State {
  init: () => Promise<void>;
  showMessage: (n: Notification) => void;
}

export const NotificationsContext = createContext<State>({
  init: () => new Promise((resolve) => resolve()),
  showMessage: () => {},
});

export const NotificationsProvider = ({ children }: ChildrenProp) => {
  const { onCallAfar } = useCallFromAfar();
  const showMessage: State['showMessage'] = (n) => {
    toast(renderNotificationsContent(n));
  };

  const handleUpdateNotification = (additionalData: NotificationAdditionalData) => {
    const { data, type } = additionalData;

    switch (type) {
      case 'POST_AMOUNT_STOCK_CHANGE': {
        const { postId, stockAmount } = data || {};
        onCallAfar('updatePostAmount', { postId, stockAmount });
        return;
      }
      default: {
        return;
      }
    }
  };

  const init = async () => {
    await OneSignal.init({
      //TODO set as env var
      appId: '902b9855-f697-4a7a-aa2b-1e970a9034c4',
      allowLocalhostAsSecureOrigin: true,
      autoResubscribe: true,
    });

    OneSignal.Slidedown.promptPush();

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (arg) => {
      const notification = arg.notification as Notification;

      if (DEVELOPMENT) {
        console.log('notification', notification);
      }

      const { title, body, additionalData } = notification;

      if (title && body) {
        return showMessage({
          body,
          title,
        });
      }

      if (additionalData) {
        handleUpdateNotification(additionalData);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        init,
        showMessage,
      }}
    >
      <ToastContainer />
      {children}
    </NotificationsContext.Provider>
  );
};
