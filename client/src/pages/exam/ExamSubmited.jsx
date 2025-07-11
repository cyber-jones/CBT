import { useNavigate } from "react-router-dom"; // If using React Router
import { cbt_url } from "../../utils/SD";

const ExamSubmitted = () => {
  const navigate = useNavigate(); // Optional

  const handleReturn = () => {
    navigate(cbt_url.dashboard); // Change to your desired route
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-md text-center p-8">
        <div className="text-green-600 text-6xl mb-4">
          ✅
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Exam Submitted!</h2>
        <p className="text-base-content mb-4">
          Thank you for completing the exam. Your responses have been successfully submitted.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will be notified once results are available.
        </p>
        <button className="btn btn-primary w-full" onClick={handleReturn}>
          🔙 Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ExamSubmitted;