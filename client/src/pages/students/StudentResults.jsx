import useSubmission from "../../hooks/useSubmission";
import useAppContext from "../../hooks/useAppContext";
import Loading from "../../components/Loading";
import useCourse from "../../hooks/useCourse";
import { useEffect, useState } from "react";

// const exams = [
//   {
//     subject: "Mathematics",
//     date: "2025-06-12",
//     score: 85,
//     status: "Passed",
//   },
//   {
//     subject: "English Language",
//     date: "2025-06-14",
//     score: 72,
//     status: "Passed",
//   },
//   {
//     subject: "Biology",
//     date: "2025-06-16",
//     score: 58,
//     status: "Failed",
//   },
//   {
//     subject: "Computer Science",
//     date: "2025-06-18",
//     score: 90,
//     status: "Passed",
//   },
// ];

const StudentResult = () => {
  const [results, setResults] = useState(null);
  const { user } = useAppContext();
  const { loading, submissions } = useSubmission(null, null, user._id);
  const { loading: loadingCourse, courses } = useCourse();
  

  useEffect(() => {
    if (!loading && submissions) {
      const filtered = submissions.filter(submission => submission.exam.viewResult === true);
      setResults(filtered);
    }
  }, [loading, submissions]);
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl font-bold mb-4 text-center">
          📚 Exam Results
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Date</th>
                <th>Percentage (%)</th>
                <th>Score </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                results &&
                results.map((submission, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      {!loadingCourse &&
                        courses &&
                        courses.find(
                          (course) => course._id === submission.exam.course
                        ).code}
                    </td>
                    <td>{new Date(submission.submittedAt).toDateString()}</td>
                    <td>{submission.percentage}</td>
                    <td>{submission.score}</td>
                    <td>
                      <span
                        className={`badge ${
                          submission.percentage > 40
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {submission.percentage > 40 ? "Passed" : "Failed"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
