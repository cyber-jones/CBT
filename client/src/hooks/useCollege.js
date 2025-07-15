import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";

const useCollege = (id = null) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [colleges, setCollege] = useState(null);

  const getColleges = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/college/"+ id);
        else 
            res = await axiosPrivate.get("/college");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setCollege(id ? res.data?.college : res.data?.colleges);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useState(() => {
    getColleges();
  }, []);

  return { loading, colleges };
};

export default useCollege;
