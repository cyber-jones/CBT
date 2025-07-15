import axiosConfig from "../data/axiosConfig";
import useAppContext from "./useAppContext";
import { toast } from "react-toastify";

const useRefresh = () => {
  const { setAuthUser, setUser, setToken } = useAppContext();

  const fetchAuthUser = async () => {
    try {
      const res = await axiosConfig.get("/refresh");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setAuthUser(res.data?.authUser);
      setUser(res.data?.user);
      setToken(res.data?.accessToken);
      let accessToken = res.data?.accessToken;
      return accessToken;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return fetchAuthUser;
};

export default useRefresh;
