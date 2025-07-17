import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { axiosPrivate } from "../data/axiosConfig";

const useAxiosPrivate = () => {
  const { token } = useContext(AuthContext);

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
  }, [token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
