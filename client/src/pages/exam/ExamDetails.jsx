import { useNavigate } from "react-router-dom"; // Optional if using React Router
import { cbt_url } from "../../utils/SD";

const exam = {
  courseCode: "CSC101",
  courseTitle: "Introduction to Computer Science",
  duration: "1 hour 30 minutes",
  questions: 50,
  totalMarks: 100,
  instructions:
    "Read each question carefully. You must attempt all questions. Do not refresh the page during the exam or attempt to navigate away with the url this will trigger automatic submission. Time will start as soon as you click the 'Start Exam' button.",
};

const ExamDetails = () => {
  const navigate = useNavigate(); // Optional navigation hook

  const handleStart = () => {
    // Navigate to exam page or trigger exam start logic
    alert("Exam started!");
    navigate(cbt_url.startExam + "/1");
  };

  const handleReturn = () => {
    // Navigate back to exam list
    navigate("/exam-list");
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6 border border-base-300">
          <h1 className="text-2xl font-bold text-primary mb-2">
            {exam.courseCode} - {exam.courseTitle}
          </h1>
          <div className="text-white space-y-2">
            <p>
              <strong>Duration:</strong> {exam.duration}
            </p>
            <p>
              <strong>Total Questions:</strong> {exam.questions}
            </p>
            <p>
              <strong>Total Marks:</strong> {exam.totalMarks}
            </p>
            <p className="mt-4">
              <strong>Instructions:</strong>
            </p>
            <p className="text-sm text-red-600">{exam.instructions}</p>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              className="btn btn-outline btn-secondary"
              onClick={handleReturn}
            >
              Return to List
            </button>
            <button className="btn btn-primary" onClick={handleStart}>
              Start Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
