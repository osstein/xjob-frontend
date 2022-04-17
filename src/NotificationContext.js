import { createContext, useState } from "react";

const NotifyContext = createContext();

export function NotifyProvider({ children }) {
  // States
  const [isNotifications, setNotifications] = useState("");
  const [isCount, setCount] = useState(0);

  // New notification to module
  const NewNotification = (message) => {
    setNotifications(message);
    setCount(isCount + 1);
  };

  return (
    <NotifyContext.Provider
      value={{
        isNotifications,
        isCount,
        setNotifications,
        NewNotification,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
}

export default NotifyContext;
