import { Badge } from 'components/badge';

import { Notification } from '../../types/notifications';

export const renderNotificationsContent = (notification: Notification) => {
  const { body, title } = notification;

  return (
    <div className="flex">
      <Badge variant="success" />

      <div className="ms-3">
        <h3 className="text-gray-800 font-semibold ">{title}</h3>
        <div className="text-sm text-gray-700 ">{body}</div>
      </div>
    </div>
  );
};
