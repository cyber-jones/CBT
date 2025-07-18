/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const useSubmission = (id = null, examId = null, studentId = null, lecturerId = null, courseId = null) => {
  const axiosPrivate = useAxiosPrivate(); 
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmission] = useState(null);

  const getSubmissions = async () => {
    setLoading(true);
    try {
        let res = null;
        if (id)
            res = await axiosPrivate.get("/exam/submission/"+id);
        else if (examId)
            res = await axiosPrivate.get("/exam/submission-exam/"+examId);
        else if (studentId)
            res = await axiosPrivate.get("/exam/submissions/student/"+studentId);
        else if (lecturerId)
            res = await axiosPrivate.get("/exam/submissions/lecturer/"+lecturerId);
        else if (courseId)
            res = await axiosPrivate.get("/exam/submissions/course/"+courseId);
        else 
            res = await axiosPrivate.get("/exam/submissions");

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setSubmission(id || examId ? res.data?.submission : res.data?.submissions);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return { loading, submissions };
};

export default useSubmission;
