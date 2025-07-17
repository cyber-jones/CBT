/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const useStudent = (id = null) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [students, setStudent] = useState(null);

  const getStudent = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/student/"+ id);
        else 
            res = await axiosPrivate.get("/student");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setStudent(id ? res.data?.student : res.data?.students);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return { loading, students };
};

export default useStudent;
