import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { cbt_url, Roles } from "../../utils/SD";
import useCourse from "../../hooks/useCourse";
import useAppContext from "../../hooks/useAppContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import useExam from "../../hooks/useExam";

// const course = {
//   code: "BIO101",
//   title: "Introduction to Anatomy",
//   lecturer: "Dr. Jane Smith",
//   department: "Biological Sciences",
//   credits: 3,
//   description:
//     "This course provides an overview of the human body's structure and function. Topics include cell biology, tissues, and organ systems.",
//   schedule: "Mon & Wed 9:00 AM - 10:30 AM",
//   location: "Lecture Hall B2",
// };

const DetailedCourse = () => {
  const navigate = useNavigate();
  const [isTrue, setIsTrue] = useState(false);
  const { authUser } = useAppContext();
  const { id } = useParams();
  const { courses: course } = useCourse(id);
  const { loading: loadingExam, exams: exam } = useExam(null, null, null, id);
  const isLecturer = authUser.role === Roles.LECTURER;
  const isAdmin = authUser.role === Roles.ADMIN;
  console.log(exam);
  useEffect(() => {
    if (!loadingExam && exam) {
      setIsTrue(exam.course._id === id);
    }
  }, [loadingExam, exam, id]);

  const handleAction = () => {
    alert("Done!");
  };
  const handleSetExam = () => {
    if (authUser?.canSetExams) navigate(cbt_url.setEaxm + "/" + course?._id);
    else toast.error("Forbidden: Not permitted to set exams!");
  };

  return (
    <div className="p-6 h-full bg-base-200 font-sans">
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-lg shadow">
        <h1 className="text-lg lg:text-3xl font-bold mb-4 ">
          {course?.title}
        </h1>
        <p className="text-sm mb-6">Code: {course?.code}</p>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold ">Lecturer</h2>
            <p className="">
              {course?.lecturer.title} {course?.lecturer.firstName}{" "}
              {course?.lecturer.lastName} {course?.lecturer.middleName}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold ">Department</h2>
            <p className="">{course?.department.name}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold ">Units</h2>
            <p className="">{course?.unit}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold ">Description</h2>
            <p className=" leading-relaxed">
              {course?.description}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              hidden={!isAdmin}
              onClick={() => navigate(cbt_url.updateCourse+"/"+course?._id)}
              className="btn btn-success"
            >
              Update
            </button>
            <button
              hidden={!isLecturer || isTrue}
              onClick={handleSetExam}
              className="btn btn-success"
            >
              Set Exam
            </button>
            <Modal
              hidden={!isAdmin}
              action={"Delete"}
              type={"error"}
              handleAction={handleAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCourse;
