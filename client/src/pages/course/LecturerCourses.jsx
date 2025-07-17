import { cbt_url } from "../../utils/SD";
import useCourse from "../../hooks/useCourse";
import useAppContext from "../../hooks/useAppContext";
import { Link } from "react-router-dom";

const LecturerCourses = () => {
  const { user } = useAppContext();
  const { loading, courses } = useCourse(null, user._id);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg md:text-3xl font-bold text-center mb-8">
          📋 Course List
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 hover:cursor-pointer">
          {!loading && courses ? (
            courses.map((course, index) => (
              <Link
                to={cbt_url.course + "/" + course._id}
                key={index}
                className="card shadow-lg bg-base-100 border border-base-300"
              >
                <div className="card-body">
                  <h2 className="card-title text-primary">{course.code}</h2>
                  <p className="text-[15px] md:text-lg font-semibold">
                    {course.title}
                  </p>
                  <div className="mt-2">
                    <span className="badge badge-info badge-outline">
                      Units: {course.unit}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturerCourses;
