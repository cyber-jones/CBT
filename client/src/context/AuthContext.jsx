import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const values = { authUser, setAuthUser, user, setUser, token, setToken }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
