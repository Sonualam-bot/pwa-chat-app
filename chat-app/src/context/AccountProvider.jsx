import { createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://pwa-chat-app-backend-v2.vercel.app");
  }, []);

  const value = {
    account,
    setAccount,
    person,
    setPerson,
    socket,
    activeUsers,
    setActiveUsers,
    newMessageFlag,
    setNewMessageFlag,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
