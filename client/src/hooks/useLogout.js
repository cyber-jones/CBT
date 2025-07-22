import { useNavigate } from "react-router-dom";
import useAppContext from "./useAppContext";
import useAxiosPrivate from "./useAxiosPrivate";
import { cbt_url } from "../utils/SD";
import { toast } from "react-toastify";

const useLogout = () => {
  const { setAuthUser, setUser, setToken } = useAppContext();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      const res = await axiosPrivate.get("/auth/logout");

      if (res.status !== 204)
        return toast.error(res.data?.message || res.statusText);

      setAuthUser(null);
      setUser(null);
      setToken(null);
      navigate(cbt_url.login);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return logout;
};

export default useLogout;
