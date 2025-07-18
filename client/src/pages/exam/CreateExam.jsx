import ExamForm from "../../components/ExamForm";
import "../../App.css";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAppContext from "../../hooks/useAppContext";
import { useNavigate, useParams } from "react-router-dom";
import { examDuration } from "../../data/static";
import { cbt_url } from "../../utils/SD";
import useCourse from "../../hooks/useCourse";

const CreateExam = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { courses: course } = useCourse(id);
  const [time, setTime] = useState(examDuration[0].value);
  const [totalMark, setTotalMark] = useState(30);
  const [instruction, setInstruction] = useState("");
  const [questions, setQuestions] = useState(
    localStorage.getItem("questions")
      ? JSON.parse(localStorage.getItem("questions"))
      : [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
  );

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question" || field === "correctAnswer") {
      newQuestions[index][field] = value;
    } else {
      newQuestions[index].options[field] = value;
    }
    setQuestions(newQuestions);
    localStorage.setItem("questions", JSON.stringify(newQuestions));
  };

  const deleteQuestion = (index) => {
    let newQuestions = [...questions];
    let filteredQuestion = [];

    if (newQuestions.length == 1) return toast.error("Questions are at limit");
    else {
      for (let i = 0; newQuestions.length > i; i++) {
        if (index !== i) filteredQuestion.push(newQuestions[i]);
      }
    }
    setQuestions(filteredQuestion);
    localStorage.setItem("questions", JSON.stringify(filteredQuestion));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalMark < 30) return toast.error("Total mark is too low!");
    setLoading(true);
    try {
      const res = await axiosPrivate.post("/exam", {
        course: id,
        lecturer: user._id,
        department: course.department._id,
        questions,
        time,
        totalMark,
        instruction
      });

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.lecturerCourses);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <ExamForm
        time={time}
        instruction={instruction}
        setInstruction={setInstruction}
        totalMark={totalMark}
        setTotalMark={setTotalMark}
        course={course}
        loading={loading}
        setTime={setTime}
        deleteQuestion={deleteQuestion}
        questions={questions}
        addQuestion={addQuestion}
        updateQuestion={updateQuestion}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateExam;
