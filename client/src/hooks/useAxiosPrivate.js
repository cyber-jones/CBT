/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { axiosPrivate } from "../data/axiosConfig";
import useLogout from "./useLogout";

const useAxiosPrivate = () => {
  const { token } = useContext(AuthContext);
  const logout = useLogout();

  useEffect(() => {
    const axiosRequestInterceptors = axiosPrivate.interceptors.request.use(
      (request) => {
        console.log("Req-Interceptors", request);
        if (token && !request.headers.Authorization)
          request.headers.Authorization = `Bearer ${token}`;
        return request;
      },
      (error) => Promise.reject(error)
    );

    const axiosResponseInterceptors = axiosPrivate.interceptors.response.use(
      response => response, async (err) => {
        console.log("Res-Interceptors", err);
        if (err?.response?.status === 403) logout();
        return err;
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosRequestInterceptors);
      axiosPrivate.interceptors.response.eject(axiosResponseInterceptors);
    };
  }, [token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
