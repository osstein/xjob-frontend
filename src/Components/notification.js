import { useContext, useEffect } from "react";
import NotificationContext from "../NotificationContext";

const Notify = () => {
  require("./notification.css");
  // Get context
  const { isNotifications, isCount, setNotifications } = useContext(NotificationContext);

  // Dölj onload
  window.onload = () => {
    document.getElementById("message").classList.add("closed-message");
  };


  //Skapa en ny notifiering
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

  //Kör notifiering när isCount ändras
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
