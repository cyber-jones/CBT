import { useParams } from "react-router-dom";
import useSubmission from "../../hooks/useSubmission";
import Loading from "../../components/Loading";


const CourseResult = () => {
  const { id } = useParams();
  const { loading, submissions: exam } = useSubmission(id);
  console.log(exam);
  const examData = {
    course: "CSC 401 - Algorithms",
    department: "Computer Science",
    duration: "1 hour 30 minutes",
    unit: "3",
    submittedAt: "2025-07-17 10:32 AM",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        selectedAnswer: "O(log n)",
      },
      {
        id: 2,
        question: "Which data structure uses FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        selectedAnswer: "Queue",
      },
    ],
  };

  if (loading) return <Loading />

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg md:text-3xl font-bold mb-2 text-primary">{examData?.course}</h1>
        <p className="text-sm text-gray-500">Department: {examData?.department}</p>
        <p className="text-sm text-gray-500">Duration: {examData?.duration}</p>
        <p className="text-sm text-gray-500">Unit: {examData?.unit}</p>
        <p className="text-sm text-green-600 font-semibold">
          Submitted on: {examData?.submittedAt}
        </p>
      </div>

      <div className="space-y-6">
        {examData?.questions.map((q, index) => (
          <div key={q.id} className="card shadow-lg bg-base-100 p-4">
            <h2 className="text-lg font-semibold mb-2">
              Q{index + 1}. {q.question}
            </h2>
            <div className="form-control space-y-1">
              {q.options.map((option, i) => (
                <label key={i} className="label cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    className="radio radio-sm mr-2"
                    checked={q.selectedAnswer === option}
                    readOnly
                    disabled
                  />
                  <span className="label-text">{option}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-primary font-semibold">
              Your Answer: {q.selectedAnswer}
            </p>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-8">
        <span>This exam has been submitted. You cannot make further changes.</span>
      </div>
      <div className="mt-5">
        <button className="btn btn-default">Download</button>
      </div>
    </div>
  );
};

export default CourseResult;
