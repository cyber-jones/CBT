import useSubmission from "../../hooks/useSubmission";
import Loading from "../../components/Loading";
import useCourse from "../../hooks/useCourse";
import { useNavigate, useParams } from "react-router-dom";
import { cbt_url } from "../../utils/SD";


const CourseResults = () => {
  const { id } = useParams();
  const { loading, submissions } = useSubmission(null, null, null, null, id);
  const { loading: loadingCourse, courses: course } = useCourse(id);
  const navigate = useNavigate();
  
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl font-bold mb-4 text-center">
          📚 Exam Results
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Date of submission</th>
                <th>Percentage (%)</th>
                <th>Score </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                submissions &&
                submissions.map((submission, index) => (
                  <tr key={index} onClick={() => navigate(cbt_url.courseResult+"/"+submission._id)} className="cursor-pointer">
                    <th>{index + 1}</th>
                    <td>
                      {!loadingCourse &&
                        course.code}
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
      <div className="mt-5">
        <button className="btn btn-success">Release Result</button>
      </div>
    </div>
  );
};

export default CourseResults;
