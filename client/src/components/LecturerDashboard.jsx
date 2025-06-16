import { useState, useEffect } from "react";
import axios from "axios";
import ExamForm from "./ExamForm";
import FeedbackForm from "./FeedbackForm";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { server_dev_url } from "../utils/SD";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LecturerDashboard() {
  const [exams, setExams] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchExams();
    fetchSubmissions();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/exam`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setExams(
        res.data.filter(
          (e) => e.lecturer._id === localStorage.getItem("userId")
        )
      );
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/exam/submissions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const handleGrade = async (submissionId, score) => {
    try {
      await axios.put(
        `${server_dev_url}/api/exam/grade/${submissionId}`,
        { score },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchSubmissions();
      alert("Submission graded successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to grade submission.");
    }
  };

  const data = {
    labels: exams.map((e) => e.title),
    datasets: [
      {
        label: "Average Score",
        data: exams.map((e) => {
          const subs = submissions.filter(
            (s) => s.exam._id === e._id && s.score !== null
          );
          return subs.length
            ? (subs.reduce((sum, s) => sum + s.score, 0) / subs.length).toFixed(
                2
              )
            : 0;
        }),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Average Scores by Exam" },
    },
  };

  return (
    <div>
      <h2>Lecturer Dashboard</h2>
      <ExamForm fetchExams={fetchExams} />
      <h3>My Exams</h3>
      {exams.length === 0 ? (
        <p>No exams created.</p>
      ) : (
        <ul>
          {exams.map((e) => (
            <li key={e._id}>{e.title}</li>
          ))}
        </ul>
      )}
      <h3>Submissions to Grade</h3>
      {submissions.length === 0 ? (
        <p>No submissions available.</p>
      ) : (
        <ul>
          {submissions.map((s) => (
            <li key={s._id}>
              {s.exam.title} by {s.student.email}:{" "}
              {s.score !== null ? (
                `${s.score}%`
              ) : (
                <input
                  type="number"
                  min="0"
                  max="100"
                  onBlur={(e) => handleGrade(s._id, Number(e.target.value))}
                  placeholder="Enter score"
                />
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="dashboard">
        <h3>Performance Analytics</h3>
        <Bar data={data} options={options} />
      </div>
      <FeedbackForm />
    </div>
  );
}

export default LecturerDashboard;
