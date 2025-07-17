/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const useCourse = (id = null, lecturerId = null) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [courses, setCourse] = useState(null);

  const getCourse = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/course/"+ id);
        else if (lecturerId)
            res = await axiosPrivate.get("/course/lecturer/"+ lecturerId);
        else 
            res = await axiosPrivate.get("/course");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setCourse(id ? res.data?.course : res.data?.courses);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return { loading, courses };
};

export default useCourse;
