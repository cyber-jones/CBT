import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { server_dev_url } from '../utils/SD';
import { toast } from 'react-toastify';

function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`${server_dev_url}/api/exam`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const selectedExam = res.data.find(e => e._id === id);
        if (!selectedExam) throw new Error('Exam not found');
        setExam(selectedExam);
      } catch (err) {
        alert(err.message || 'Failed to load exam.');
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionAnswers = Object.keys(answers).map(questionId => ({
        questionId,
        selectedOption: answers[questionId]
      }));
      await axios.post(
        `${server_dev_url}/api/exam/submit`,
        { examId: id, answers: submissionAnswers },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast('Exam submitted successfully!');
      navigate('/student');
    } catch (err) {
      toast(err.response?.data?.message || err.message);
    }
  };

  if (!exam) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="exam-form">
      <h2>{exam.title}</h2>
      {exam.questions.map((q, i) => (
        <div key={i} className="question">
          <p>{q.question}</p>
          {q.options.map((opt, j) => (
            <label key={j}>
              <input
                type="radio"
                name={`question-${i}`}
                checked={answers[i] === j}
                onChange={() => handleAnswer(i, j)}
                required
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit Exam</button>
    </form>
  );
}

export default TakeExam;