import { Link } from "react-router-dom";

function ExamList({ exams }) {
  return (
    <div className="exam-list">
      <h2>Available Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam._id}>
              <Link to={`/student/exam/${exam._id}`}>{exam.title}</Link> (Set
              by: {exam.lecturer.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExamList;
