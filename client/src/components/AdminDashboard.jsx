import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import FeedbackForm from "./FeedbackForm";
import { server_dev_url } from "../utils/SD";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [lecturers, setLecturers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetchLecturers();
    fetchSubmissions();
    fetchFeedbacks();
    fetchSummary();
  }, []);

  const fetchLecturers = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/auth/lecturers`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLecturers(res.data);
    } catch (err) {
      console.error("Error fetching lecturers:", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/exam/submissions/admin`,
        {   
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/feedback`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/feedback/summary`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSummary(res.data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  const handlePermission = async (lecturerId, canSetExams) => {
    try {
      await axios.put(
        `${
          server_dev_url
        }/api/auth/grant-exam-permission/${lecturerId}`,
        { canSetExams },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchLecturers();
      alert(`Permission ${canSetExams ? "granted" : "revoked"} successfully!`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update permission.");
    }
  };

  const handleApproveResult = async (submissionId) => {
    try {
      await axios.put(
        `${
          server_dev_url
        }/api/exam/approve-result/${submissionId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchSubmissions();
      alert("Result approved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve result.");
    }
  };

  const handleExportFeedback = async () => {
    try {
      const res = await axios.get(
        `${server_dev_url}/api/feedback`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const csv = [
        "Stakeholder Type,Category,Comment,Date",
        ...res.data.map(
          (f) =>
            `${f.stakeholderType},${f.category},"${f.comment}",${new Date(
              f.createdAt
            ).toLocaleDateString()}`
        ),
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "feedback.csv");
    } catch (err) {
      toast("Failed to export feedback." + err.message);
    }
  };

  const categoryData = {
    labels: ["Benefit", "Challenge", "Solution"],
    datasets: [
      {
        label: "Feedback Count by Category",
        data: [
          summary.find((s) => s._id.category === "Benefit")?.count || 0,
          summary.find((s) => s._id.category === "Challenge")?.count || 0,
          summary.find((s) => s._id.category === "Solution")?.count || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        borderColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const stakeholderData = {
    labels: ["Student", "Lecturer"],
    datasets: [
      {
        data: [
          summary
            .filter((s) => s._id.stakeholderType === "Student")
            .reduce((sum, s) => sum + s.count, 0) || 0,
          summary
            .filter((s) => s._id.stakeholderType === "Lecturer")
            .reduce((sum, s) => sum + s.count, 0) || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Feedback Distribution" },
    },
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Manage Lecturers</h3>
      {lecturers.length === 0 ? (
        <p>No lecturers found.</p>
      ) : (
        <ul>
          {lecturers.map((l) => (
            <li key={l._id}>
              {l.email}: {l.canSetExams ? "Can set exams" : "Cannot set exams"}
              <button onClick={() => handlePermission(l._id, !l.canSetExams)}>
                {l.canSetExams ? "Revoke Permission" : "Grant Permission"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Review Results</h3>
      {submissions.length === 0 ? (
        <p>No submissions available.</p>
      ) : (
        <ul>
          {submissions.map((s) => (
            <li key={s._id}>
              {s.exam.title} by {s.student.email}:{" "}
              {s.score !== null ? `${s.score}%` : "Ungraded"}
              {s.score !== null && !s.approved && (
                <button onClick={() => handleApproveResult(s._id)}>
                  Approve Result
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <h3>Feedback</h3>
      <button onClick={handleExportFeedback}>Export Feedback as CSV</button>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul>
          {feedbacks.map((f) => (
            <li key={f._id}>
              {f.stakeholderType} ({f.category}): {f.comment}
              <br />
              <small>{new Date(f.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
      <div className="dashboard">
        <h3>Feedback Summary</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ width: "50%" }}>
            <Bar
              data={categoryData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: { ...options.plugins.title, text: "By Category" },
                },
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Pie
              data={stakeholderData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    ...options.plugins.title,
                    text: "By Stakeholder Type",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
