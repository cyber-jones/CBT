import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { cbt_url } from "../../utils/SD";

const courseDetails = {
  code: "BIO101",
  title: "Introduction to Anatomy",
  lecturer: "Dr. Jane Smith",
  department: "Biological Sciences",
  credits: 3,
  description:
    "This course provides an overview of the human body's structure and function. Topics include cell biology, tissues, and organ systems.",
  schedule: "Mon & Wed 9:00 AM - 10:30 AM",
  location: "Lecture Hall B2",
};

const DetailedCourse = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    alert("Done!");
  };
  return (
    <div className="p-6 h-full bg-green-100 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-lg lg:text-3xl font-bold mb-4 text-gray-800">
          {courseDetails.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Course Code: {courseDetails.code}
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Lecturer</h2>
            <p className="text-gray-800">{courseDetails.lecturer}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Department</h2>
            <p className="text-gray-800">{courseDetails.department}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Credits</h2>
            <p className="text-gray-800">{courseDetails.credits}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Description</h2>
            <p className="text-gray-800 leading-relaxed">
              {courseDetails.description}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigate(cbt_url.updateCourse + "/" + courseDetails.id)
              }
              className="btn btn-success"
            >
              Update
            </button>
            <Modal
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
