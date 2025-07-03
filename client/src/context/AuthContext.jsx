import { createContext, useState } from "react";
// import { io } from "socket.io-client";

const AppContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser, setAuthUser] = useState({});
  const [user, setUser] = useState({});

  // const disconnectSocket = () => {
  //   if (socket && socket.connected)
  //     socket.disconnect();
  //   setSocket(null);
  // };

  // const connectSocket = (Id) => {
  //   if (authUser && Id) {
  //     const newSocket = io(socket_connect_production_url, { query: { userId: Id } });
  //     newSocket.connect();
  //     setSocket(newSocket);
  //   }
  // }


  const values = { socket, setSocket, authUser, setAuthUser, user, setUser }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
