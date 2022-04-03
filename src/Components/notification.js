import { useContext, useEffect } from "react";
import NotificationContext from "../NotificationContext";

const Notify = () => {
  require("./notification.css");
  const { isNotifications, isCount, setNotifications } = useContext(NotificationContext);

  const showNotify = () => {
    let message = document.getElementById("message");
    message.classList.remove("closed-message");
    setTimeout(() => {
      message.classList.add("closed-message");
      setTimeout(() => {
        
        setNotifications("");
      }, 200);
    }, 3000);
  };

  useEffect(() => {
    showNotify();
  }, [isCount]);

  return (
    <div className="notification">
      <p id="message" className="message">
        {isNotifications}
      </p>
    </div>
  );
};

export default Notify;
