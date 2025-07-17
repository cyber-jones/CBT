import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useCourse from "../../hooks/useCourse";

// const courses = [
//   { id: 1, title: "Introduction to Anatomy", code: "BIO101", lecturer: "Dr. Jane Smith" },
//   { id: 2, title: "Pharmacology Basics", code: "PHAR201", lecturer: "Prof. David Lee" },
//   { id: 3, title: "Medical Ethics", code: "MED301", lecturer: "Dr. Angela White" }
// ];

const Courses = () => {
  const navigate = useNavigate();
  const { loading, courses } = useCourse();
  return (
    <div className="p-6 font-sans h-full bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg lg:text-3xl font-bold text-gray-800">Courses</h1>
        <button
          onClick={() => navigate(cbt_url.createCourse)}
          className="btn btn-success"
        >
          + New Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-scroll max-h-11/12">
        {!loading && courses ? (
          <table className="w-full text-left text-[10px] md:text-sm">
            <thead className="bg-green-400 text-gray-700">
              <tr>
                <th className="p-3 md:block hidden">s/n</th>
                <th className="p-3">Code</th>
                <th className="p-3">Title</th>
                <th className="p-3">Lecturer</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  onClick={() => navigate(cbt_url.course + "/" + course._id)}
                  key={index}
                  className="border-b hover:cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 md:block hidden font-medium text-gray-800">
                    {index+1}
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {course.code}
                  </td>
                  <td className="p-3 text-gray-800">{course.title}</td>
                  <td className="p-3 text-gray-800">{course.lecturer.title} {course.lecturer.firstName} {course.lecturer.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
