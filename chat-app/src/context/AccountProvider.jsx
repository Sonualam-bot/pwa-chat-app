import { createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

export const AccountContext = createContext(null);

// const ENDPOINT = "http://localhost:3000";

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
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
