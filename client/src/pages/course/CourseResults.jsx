import useSubmission from "../../hooks/useSubmission";
import Loading from "../../components/Loading";
import useCourse from "../../hooks/useCourse";
import { useNavigate, useParams } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import { toast } from "react-toastify";
import useExam from "../../hooks/useExam";

const CourseResults = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { loading: loadingSubmission, submissions } = useSubmission(
    null,
    null,
    null,
    null,
    id
  );
  const { loading: loadingCourse, courses: course } = useCourse(id);
  const { loading: loadingExam, exams: exam } = useExam(null, null, null, id);
  const navigate = useNavigate();

  if (loadingSubmission) return <Loading />;

  const handleToggleReleaseResult = async () => {
    if (loadingExam || !exam) return;

    setLoading(true);
    try {
      const res = await axiosPrivate.get(
        "/exam/toggle-release-result/" + exam?._id
      );

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

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
                !loadingSubmission &&
                submissions &&
                submissions.map((submission, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      navigate(cbt_url.courseResult + "/" + submission._id)
                    }
                    className="cursor-pointer"
                  >
                    <th>{index + 1}</th>
                    <td>{!loadingCourse && course.code}</td>
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
        <button className={`btn btn-${ exam?.viewResult ? "error" : "success"}`} onClick={handleToggleReleaseResult}>
          { exam?.viewResult ? "Close Result" : "Release Result"}
        </button>
      </div>
    </div>
  );
};

export default CourseResults;
