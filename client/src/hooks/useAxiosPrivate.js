import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useRefresh from "./useRefresh";
import { axiosPrivate } from "../data/axiosConfig";

const useAxiosPrivate = () => {
  const { token } = useContext(AuthContext);
  const refresh = useRefresh();

  useEffect(() => {
    const axiosRequestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("Interceptors", config);
        if (token && !config.headers.Authorization)
          config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosRequestInterceptors);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
