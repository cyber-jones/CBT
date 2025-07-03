import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { axiosPrivate } from "../data/axios";
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
  const { authUser } = useContext(AuthContext);
  const refresh = useRefresh();

  useEffect(() => {
    const axiosRequestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("Interceptors", config);
        if (authUser?.accessToken && !config.headers.Authorization)
          config.headers.Authorization = `Bearer ${authUser?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosRequestInterceptors);
    };
  }, [authUser, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
