import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cbt_url } from "../../utils/SD";
import useCourse from "../../hooks/useCourse";
import { level, unit } from "../../data/static";
import useStaff from "../../hooks/useStaff";
import useDepartment from "../../hooks/useDepartment";
import useCollege from "../../hooks/useCollege";

const UpdateCourse = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { loading: loadingCourse, courses: course } = useCourse(id);
  const { loading: loadingLecturers, staffs: lecturers } = useStaff(null, true);
  const { loading: loadingDepartment, departments } = useDepartment();
  const { loading: loadingCollege, colleges } = useCollege();

  useEffect(() => {
    if (!loadingCourse && course) setFormData(course);
  }, [loadingCourse, course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.put("/course/" + id, formData);

      if (res.status !== 205)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.courses + "/" + id);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full bg-green-100 font-sans">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow text-gray-800">
        <h1 className="text-lg lg:text-2xl font-bold mb-6 text-gray-800">
          Update Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium">
              Course Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData?.code}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium">
              Unit
            </label>
            <select
              type="text"
              id="unit"
              name="unit"
              value={formData?.unit}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              {unit &&
                unit.map((unit) => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium">
              Level
            </label>
            <select
              type="text"
              id="level"
              name="level"
              value={formData?.level}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              {level &&
                level.map((level) => (
                  <option key={level.name} value={level.name}>
                    {level.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="lecturer" className="block text-sm font-medium">
              Lecturer
            </label>
            <select
              type="text"
              id="lecturer"
              name="lecturer"
              value={formData?.lecturer}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              {!loadingLecturers && lecturers ? (
                lecturers.map((lecturer, index) => (
                  <option key={index} value={lecturer._id}>
                    {lecturer.title} {lecturer.firstName} {lecturer.lastName}{" "}
                    {lecturer.middleName}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium">
              Department
            </label>
            <select
              type="text"
              id="department"
              name="department"
              value={formData?.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option value="General">General</option>
              {!loadingDepartment && departments ? (
                departments.map((department, index) => (
                  <option key={index} value={department._id}>
                    {department.code}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium">
              College
            </label>
            <select
              type="text"
              id="college"
              name="college"
              value={formData?.college}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option value="General">General</option>
              {!loadingCollege && colleges ? (
                colleges.map((college, index) => (
                  <option key={index} value={college._id}>
                    {college.code}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            {loading ? "..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
