import { useParams } from "react-router-dom";
import useSubmission from "../../hooks/useSubmission";
import Loading from "../../components/Loading";
import { examDuration } from "../../data/static";
import useCourse from "../../hooks/useCourse";
import { useEffect, useState } from "react";
import useDepartment from "../../hooks/useDepartment";


const CourseResult = () => {
  const { id } = useParams();
  const { loading, submissions: submission } = useSubmission(id);
  const { loading: loadingCourse, courses } = useCourse();
  const { loading: loadingDepartment, departments } = useDepartment();
  const [department, setDepartment] = useState(null);
  const [course, setCourse] = useState(null);

  console.log(submission);

  useEffect(() => {
    if (!loading, !loadingCourse && !loadingDepartment && submission && courses && departments) {
      const getCourse = courses.find(course => course._id === submission.exam.course);
      const getDepartment = departments.find(dept => dept._id === submission.exam.department);

      setCourse(getCourse);
      setDepartment(getDepartment)
    }
  }, [loading, loadingCourse, loadingDepartment, submission, courses, departments]);

  // const examData = {
  //   course: "CSC 401 - Algorithms",
  //   department: "Computer Science",
  //   duration: "1 hour 30 minutes",
  //   unit: "3",
  //   submittedAt: "2025-07-17 10:32 AM",
  //   questions: [
  //     {
  //       id: 1,
  //       question: "What is the time complexity of binary search?",
  //       options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
  //       selectedAnswer: "O(log n)",
  //     },
  //     {
  //       id: 2,
  //       question: "Which data structure uses FIFO?",
  //       options: ["Stack", "Queue", "Tree", "Graph"],
  //       selectedAnswer: "Queue",
  //     },
  //   ],
  // };

  if (loading) return <Loading />

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg md:text-3xl font-bold mb-2 text-primary">{course?.code} - {course?.title}</h1>
        <p className="text-sm text-gray-500">Department: {department?.name}</p>
        <p className="text-sm text-gray-500">Duration: {(examDuration.find(time => time.value == Number(submission?.exam?.time)))?.name}</p>
        <p className="text-sm text-gray-500">Unit: {course?.unit}</p>
        <p className="text-sm text-gray-500">Score: {submission?.score} / {submission?.exam?.totalMark}</p>
        <p className="text-sm text-gray-500">Percentage: {submission?.percentage}%</p>
        <p className="text-sm text-green-600 font-semibold">
          Submitted on: {new Date(submission?.submittedAt).toDateString()}
        </p>
      </div>

      <div className="space-y-6">
        {submission?.exam?.questions.map((q, index) => (
          <div key={q._id} className="card shadow-lg bg-base-100 p-4">
            <h2 className="text-lg font-semibold mb-2">
              Q{index + 1}. {q.question}
            </h2>
            <div className="form-control space-y-1">
              {q.options.map((option, i) => (
                <label key={i} className="label cursor-pointer m-2">
                  <input
                    type="radio"
                    name={q._id}
                    className="radio radio-sm mr-2"
                    checked={q.correctAnswer === option}
                    readOnly
                    disabled
                  />
                  <span className="label-text">{option}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-primary font-semibold">
              Your Answer: {submission.answers[index].selectedOption}
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
