/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const useExam = (id = null, lecturerId = null, studentId = null, courseId = null) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [exams, setEaxm] = useState(null);

  const getExam = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/exam/"+id);
        else if (lecturerId)
            res = await axiosPrivate.get("/exam/lecturer/"+lecturerId);
        else if (studentId)
            res = await axiosPrivate.get("/exam/student/"+studentId);
        else if (courseId)
            res = await axiosPrivate.get("/exam/course/"+courseId);
        else 
            res = await axiosPrivate.get("/exam");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setEaxm(id ? res.data?.exam : courseId ? res.data?.exam : res.data?.exams);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  return { loading, exams };
};

export default useExam;
