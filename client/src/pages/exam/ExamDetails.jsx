import { useNavigate, useParams } from "react-router-dom"; // Optional if using React Router
import { cbt_url, Roles } from "../../utils/SD";
import useExam from "../../hooks/useExam";
import useAppContext from "../../hooks/useAppContext";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { examDuration } from "../../data/static";
import useSubmission from "../../hooks/useSubmission";

// const exam = {
//   courseCode: "CSC101",
//   courseTitle: "Introduction to Computer Science",
//   duration: "1 hour 30 minutes",
//   questions: 50,
//   totalMarks: 100,
//   instructions:
//     "Read each question carefully. You must attempt all questions. Do not refresh the page during the exam or attempt to navigate away with the url this will trigger automatic submission. Time will start as soon as you click the 'Start Exam' button.",
// };

const ExamDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { submissions: submission } = useSubmission(null, id);
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const { authUser } = useAppContext();
  const { exams: exam } = useExam(id);
  const axiosPrivate = useAxiosPrivate();
  const isStudent = authUser.role === Roles.STUDENT;
  const isLecturer = authUser.role === Roles.LECTURER;

  const handleStart = () => {
    alert("Exam started!");
    localStorage.setItem("time", exam.time);
    navigate(cbt_url.startExam + "/" + id);
  };

  const handleToggleStart = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/exam/toggle-start/" + id);

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      window.location.reload();
      toast.success(res.data?.message || res.statusText);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {};

  return (
    <div className="min-h-full bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6 border border-base-300">
          <h1 className="text-lg md:text-2xl font-bold text-primary mb-2">
            {exam?.course?.code} - {exam?.course?.title}
          </h1>
          <div className="text-white space-y-2">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${exam?.start ? "text-green-600" : "text-red-600"}`}
              >
                {exam?.start ? "Started" : "Ended"}
              </span>
            </p>
            <p hidden={!isStudent}>
              <strong>Submitted:</strong>{" "}
              <span
                className={`${submission?.student?._id === user._id ? "text-green-600" : "text-red-600"}`}
              >
                {submission?.student?._id === user._id ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {
                examDuration.find(
                  (ex) => Number(ex.value) === Number(exam?.time)
                )?.name
              }
            </p>
            <p>
              <strong>Total Questions:</strong> {exam?.questions.length}
            </p>
            <p>
              <strong>Total Marks:</strong> {exam?.totalMark}
            </p>
            <p className="mt-4">
              <strong>Instructions:</strong>{" "}
              <span className="text-sm text-blue-300">{exam?.instruction}</span>
            </p>
            <p className="text-sm text-red-600">
              NOTE: Do not refresh the page during the exam or attempt to
              navigate away with the url this will trigger automatic submission.
              Time will start as soon as you click the 'Start Exam' button
            </p>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
            <button
              hidden={!isLecturer}
              className="btn btn-default"
              onClick={() => navigate(cbt_url.exams)}
            >
              Attendance
            </button>

            <button
              hidden={!isStudent || submission?.student?._id === user._id || !exam?.start}
              className="btn btn-success"
              onClick={handleStart}
            >
              Start Exam
            </button>
            <button
              hidden={!isLecturer}
              className="btn btn-default"
              onClick={handleToggleStart}
            >
              {loading ? "..." : exam?.start ? "End exam" : "Start Exam"}
            </button>
            <button
              hidden={!isLecturer || exam?.written}
              className="btn btn-default"
              onClick={() => navigate(cbt_url.exam + "/" + exam?._id)}
            >
              Update Exam
            </button>
            <button
              hidden={!isStudent || !exam?.viewResult}
              className="btn btn-success"
              onClick={() => navigate(cbt_url.courseResult+"/"+exam?.course?._id)}
            >
              View Result
             </button> 
            <button
              hidden={!isLecturer || !exam?.written || exam?.start}
              className="btn btn-success"
              onClick={() => navigate(cbt_url.courseResults+"/"+exam?.course?._id)}
            >
              View Results
            </button>
            <button
              hidden={!isLecturer || exam?.written}
              className="btn btn-error"
              onClick={handleDelete}
            >
              Delete Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
