import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import ExamList from './ExamList';
import TakeExam from './TakeExam';
import FeedbackForm from './FeedbackForm';
import { server_dev_url } from '../utils/SD';

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchExams();
    fetchResults();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get(`${server_dev_url}/api/exam`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setExams(res.data);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${server_dev_url}/api/exam/results`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResults(res.data);
    } catch (err) {
      console.error('Error fetching results:', err);
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ExamList exams={exams} />
              <h3>My Results</h3>
              {results.length === 0 ? (
                <p>No results available.</p>
              ) : (
                <ul>
                  {results.map(r => (
                    <li key={r._id}>
                      {r.exam.title}: {r.score !== null ? `${r.score}%` : 'Pending'}
                    </li>
                  ))}
                </ul>
              )}
              <FeedbackForm />
            </>
          }
        />
        <Route path="exam/:id" element={<TakeExam />} />
      </Routes>
    </div>
  );
}

export default StudentDashboard;