import { useState } from "react";
import axios from "axios";
import { server_dev_url } from "../utils/SD";

function ExamForm({ fetchExams }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server_dev_url}/api/exam`,
        { title, questions },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTitle("");
      setQuestions([
        { question: "", options: ["", "", "", ""], correctAnswer: 0 },
      ]);
      fetchExams();
      alert("Exam created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create exam.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="exam-form">
      <h2>Create Exam</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Exam Title"
        required
      />
      {questions.map((q, index) => (
        <div key={index} className="question">
          <input
            type="text"
            value={q.question}
            onChange={(e) => updateQuestion(index, "question", e.target.value)}
            placeholder={`Question ${index + 1}`}
            required
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => updateQuestion(index, i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              required
            />
          ))}
          <select
            value={q.correctAnswer}
            onChange={(e) =>
              updateQuestion(index, "correctAnswer", Number(e.target.value))
            }
            required
          >
            {q.options.map((_, i) => (
              <option key={i} value={i}>
                Option {i + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button type="submit">Create Exam</button>
    </form>
  );
}

export default ExamForm;
