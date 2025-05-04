import { createConsumer } from "@rails/actioncable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cable = createConsumer("ws://localhost:3000/cable");

const SubscribeToNotifications = (userId, callback = null) => {
  return cable.subscriptions.create(
    { channel: "NotificationsChannel", user_id: userId },
    {
      received: (data) => {
        if (data?.message) {
          toast.info(data.message, {
            position: "top-right",
            autoClose: 4000,
            pauseOnHover: true,
            draggable: true,
          });
        }

        // Optional: forward it to dashboard state as well
        if (callback) {
          callback(data);
        }
      },
    }
  );
};

export default SubscribeToNotifications;
