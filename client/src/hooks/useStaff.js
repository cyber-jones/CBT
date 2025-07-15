import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";

const useStaff = (id = null, lecturers = false) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [staffs, setStaff] = useState(null);

  const getStaff = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/staff/"+ id);
        if (lecturers)
            res = await axiosPrivate.get("/staff/lecturers");
        else 
            res = await axiosPrivate.get("/staff");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setStaff(id ? res.data?.staff : lecturers ? res.data?.lecturers : res.data?.staffs);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useState(() => {
    getStaff();
  }, []);

  return { loading, staffs };
};

export default useStaff;
