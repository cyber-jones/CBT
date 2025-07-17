/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const useDepartment = (id = null) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [departments, setDepartment] = useState(null);

  const getDepartments = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/department/"+ id);
        else 
            res = await axiosPrivate.get("/department");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setDepartment(id ? res.data?.department : res.data?.departments);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return { loading, departments };
};

export default useDepartment;
