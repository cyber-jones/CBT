import useAppContext from "./useAppContext";
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";

const useRefresh = () => {
  const { setUser } = useAppContext();
  const axiosPrivate = useAxiosPrivate();

  const fetchUser = async () => {
    try {
      const res = await axiosPrivate.get("/refresh");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setUser(res.data?.user);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return fetchUser;
};

export default useRefresh;
