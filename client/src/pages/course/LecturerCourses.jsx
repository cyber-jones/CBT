import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useCourse from "../../hooks/useCourse";
import useAppContext from "../../hooks/useAppContext";

const LecturerCourses = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { loading, courses } = useCourse(null, user._id);

  return (
    <div className="p-6 font-sans h-full bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg lg:text-3xl font-bold text-gray-800">Courses</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-scroll h-11/12">
        {!loading && courses ? (
          <table className="w-full text-left text-[10px] md:text-sm">
            <thead className="bg-green-400 text-gray-700">
              <tr>
                <th className="p-3 md:block hidden">s/n</th>
                <th className="p-3">Course Code</th>
                <th className="p-3">Title</th>
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

export default LecturerCourses;
