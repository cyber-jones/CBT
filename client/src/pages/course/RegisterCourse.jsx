import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { cbt_url } from "../../utils/SD";
import useStaff from "../../hooks/useStaff";
import useDepartment from "../../hooks/useDepartment";
import useCollege from "../../hooks/useCollege";
import { level, unit } from "../../data/static";

const RegisterCourse = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { loading: loadingLecturers, staffs: lecturers } = useStaff(null, true);
  const { loading: loadingDepartment, departments } = useDepartment();
  const { loading: loadingCollege, colleges } = useCollege();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post("/course", formData);

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.courses);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full bg-green-100 font-sans overflow-y-scroll">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow text-gray-800">
        <h1 className="text-lg lg:text-2xl font-bold mb-6 text-gray-800">
          Register New Course
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
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
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
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            {loading ? "..." : "Register Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCourse;
