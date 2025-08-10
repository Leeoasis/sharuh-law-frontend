import React, { useState, useEffect } from 'react';
import { SubscribeToNotifications } from './path/to/notificationsService';

const NotificationsComponent = ({ profile }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (profile?.id) {
      const subscription = SubscribeToNotifications(profile.id, (notification) => {
        setNotifications((prev) => [...prev, notification]);

        // If you receive the "No lawyers match" message, display it
        if (notification.message.includes("No lawyers match")) {
          alert(notification.message); // Or use a custom notification UI
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [profile?.id]);

  return (
    <div>
      <h4>Your Notifications</h4>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsComponent;
