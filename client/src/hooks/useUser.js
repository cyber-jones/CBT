import useAppContext from "./useAppContext";
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { Roles } from "../utils/SD";

const useRefresh = () => {
  const { setUser } = useAppContext();
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useAppContext();

  const fetchUser = async () => {
    try {
        let res = null;
        if (authUser?.roles.includes(Roles.LECTURER))
            res = await axiosPrivate.get("/staff/"+authUser?.idNumber);
        else 
            res = await axiosPrivate.get("/student/"+authUser?.idNumber);

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
