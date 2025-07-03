import axios from "../data/axiosConfig";
import useAppContext from "./useAppContext";
import { toast } from "react-toastify";

const useRefresh = () => {
  const { setAtuhUser } = useAppContext();

  const fetchAuthUser = async () => {
    try {
      const res = await axios.get("/user");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setAtuhUser(res.data?.user);
      let accessToken = res.data?.user.accessToken;
      return accessToken;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return fetchAuthUser;
};

export default useRefresh;
