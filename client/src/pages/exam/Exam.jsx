/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import { formatTime } from "../../utils/formatTime";
import useExam from "../../hooks/useExam";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAppContext from "../../hooks/useAppContext";

// const questions = [
//   {
//     id: 1,
//     question: "What does HTML stand for?",
//     options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
//   },
//   {
//     id: 2,
//     question: "Which CSS property controls the text size?",
//     options: ["font-style", "text-size", "font-size", "text-style"],
//   },
//   {
//     id: 3,
//     question: "Inside which HTML element do we put the JavaScript?",
//     options: ["<js>", "<javascript>", "<script>", "<code>"],
//   },
// ];

const Exam = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const { loading: loadingExam, exams: exam } = useExam(id);
  const [currentIndex, setCurrentIndex] = useState(
    localStorage.getItem("currentIndex")
      ? Number(JSON.parse(localStorage.getItem("currentIndex")))
      : 0
  );
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(
    localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : {}
  );
  const [questions, setQuestions] = useState([]);
  const [laoding, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [timeLeft, setTimeLeft] = useState(
    Number(localStorage.getItem("time"))
  ); // 10 minutes in seconds

  // Countdown timer
  useEffect(() => {
    if (!loadingExam && exam) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            handleSubmit();
            return 0;
          }
          localStorage.setItem("time", prev - 1000);
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loadingExam, exam]);

  useEffect(() => {
    if (!loadingExam && exam) {
      setQuestions(exam.questions);
      localStorage.setItem("time", exam.time);
    }
  }, [loadingExam, exam]);

  if (loadingExam) return <Loading />;

  const handleOptionChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    localStorage.setItem("answers", JSON.stringify(answers));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      localStorage.setItem("currentIndex", currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      localStorage.setItem("currentIndex", currentIndex - 1);
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentIndex(index);
    localStorage.setItem("currentIndex", index);
  };

  const handleGrading = () => {
    let passedQuestions = [];

    for (let i = 0; questions.length > i; i++) {
      if (questions[i].correctAnswer === answers[questions[i]._id]) {
        passedQuestions.push(questions[i]);
      }
    }

    const percentage = (passedQuestions.length / questions.length) * 100;
    const score = (percentage / 100) * exam.totalMark;

    return { percentage, score };
  };

  const handleSubmit = async () => {
    const { percentage, score } = handleGrading();
    console.log(percentage, score);
    const ansKeys = Object.keys(answers);
    const ansValues = Object.values(answers);
    const structuredAnswer = ansValues.map((_, index) => ({
      questionId: ansKeys[index],
      selectedOption: ansValues[index],
    }));
    setLoading(true);
    try {
      const res = await axiosPrivate.post("/exam/submit", {
        exam: exam._id,
        student: user._id,
        lecturer: exam.lecturer._id,
        answers: structuredAnswer,
        percentage: Number(percentage),
        score: Number(score),
      });

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      localStorage.removeItem("time");
      localStorage.removeItem("answers");
      localStorage.removeItem("currentIndex");
      navigate(cbt_url.submittedExam);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentIndex];
  // console.log(exam);
  return (
    <div className="h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-lg font-semibold text-center">
          {exam?.course?.code} - {exam?.course?.title}
        </p>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            📝 Question {currentIndex + 1} of {questions?.length}
          </h1>
          <div className="badge badge-primary text-lg p-4">
            ⏰ {formatTime(parseInt(timeLeft))}
          </div>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{currentQ?.question}</h2>
          <div className="space-y-3">
            {currentQ &&
              currentQ?.options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`${currentQ._id}`}
                    className="radio radio-primary"
                    value={option}
                    checked={option === answers[currentQ._id]}
                    onChange={handleOptionChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            className="btn btn-outline"
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="btn btn-outline"
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                answers[questions[index]._id] ? "btn-success" : "btn-ghost"
              } ${currentIndex === index ? "btn-error" : "btn-primary"}`}
              onClick={() => handleQuestionJump(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="text-center mt-4">
          {laoding ? (
            <button className="btn btn-default btn-wide">...</button>
          ) : (
            <Modal
              action={"Submit Exam"}
              type={"error btn-wide"}
              handleAction={handleSubmit}
              hidden={!exam?.start}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Exam;
