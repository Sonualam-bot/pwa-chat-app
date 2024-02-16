import { createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [memoizedState, setMemoizedState] = useState({});
  const [loading, setLoading] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://chat-socket-server-ios7.onrender.com");
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
    memoizedState,
    setMemoizedState,
    loading,
    setLoading,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
