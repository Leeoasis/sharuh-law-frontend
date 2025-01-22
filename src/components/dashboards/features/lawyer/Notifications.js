import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("ws://localhost:3000/cable");

const SubscribeToNotifications = (userId, callback) => {
  return cable.subscriptions.create(
    { channel: "NotificationsChannel", user_id: userId },
    {
      received: (data) => callback(data),
    }
  );
};

export default SubscribeToNotifications;
