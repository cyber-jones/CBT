/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { cbt_url, Roles } from "../../utils/SD";
import useExam from "../../hooks/useExam";
import useAppContext from "../../hooks/useAppContext";
import { examDuration } from "../../data/static";
import Loading from "../../components/Loading";

// const courses = [
//   {
//     code: "CSC101",
//     name: "Introduction to Computer Science",
//     unit: 3,
//   },
//   {
//     code: "MTH102",
//     name: "Calculus II",
//     unit: 2,
//   },
//   {
//     code: "PHY103",
//     name: "General Physics I",
//     unit: 3,
//   },
//   {
//     code: "GST104",
//     name: "Use of English",
//     unit: 2,
//   },
// ];

const Exams = () => {
  const { authUser, user } = useAppContext();
  let examList = null;
  if (authUser.role === Roles.LECTURER) 
    examList = useExam(null, user._id);
  else if (authUser.role === Roles.STUDENT)
    examList = useExam(null, null, user?.department._id);
  else examList = useExam();
  const { loading, exams } = examList;

  return (
    <div className="min-h-full bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg md:text-3xl font-bold text-center mb-8">
          📋 Exam List
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 hover:cursor-pointer">
          { !loading && exams ? exams.map((exam, index) => (
            <Link
              to={cbt_url.exam+"/"+exam._id}
              key={index}
              className="card shadow-lg bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">{exam.course.code}</h2>
                <p className="text-[15px] md:text-lg font-semibold">{exam.course.title}</p>
                <div className="mt-2">
                  <span className="badge badge-info badge-outline">
                    Units: {exam.course.unit}
                  </span>
                  <span className="text-red-600 ml-4">
                    {(examDuration.find(ex => Number(ex.value) === Number(exam?.time))?.name )}                 </span>
                </div>
              </div>
            </Link>
          )) : <Loading />}
        </div>
      </div>
    </div>
  );
};

export default Exams;
