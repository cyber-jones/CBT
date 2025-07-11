/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
  },
  {
    id: 2,
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
  },
  {
    id: 3,
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
  },
];

const Exam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(localStorage.getItem("time") ? localStorage.getItem("time") : 60 * 10); // 10 minutes in seconds

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        localStorage.setItem("time", prev - 1);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleQuestionJump = (index) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    alert("Exam submitted! Answers: " + JSON.stringify(answers, null, 2));
    localStorage.removeItem("time");
    navigate(cbt_url.submittedExam)
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-lg font-semibold text-center">CSC101 - Introduction to science</p>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">📝 Question {currentIndex + 1} of {questions.length}</h1>
          <div className="badge badge-primary text-lg p-4">⏰ {formatTime(parseInt(timeLeft))}</div>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{currentQ.question}</h2>
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  className="radio radio-primary"
                  value={option}
                  checked={answers[currentQ.id] === option}
                  onChange={() => handleOptionChange(currentQ.id, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={handlePrev} className="btn btn-outline" disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} className="btn btn-outline" disabled={currentIndex === questions.length - 1}>
            Next
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentIndex === index ? "btn-primary" : "btn-ghost"} ${answers[questions[index].id] ? "btn-success" : ""}`}
              onClick={() => handleQuestionJump(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-wide btn-error" onClick={handleSubmit}>
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exam;
