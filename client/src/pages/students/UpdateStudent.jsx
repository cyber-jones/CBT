import { useState } from "react";
import { level } from "../../data/static";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useDepartment from "../../hooks/useDepartment";
import useCollege from "../../hooks/useCollege";
import { cbt_url } from "../../utils/SD";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useStudent from "../../hooks/useStudent";

const UpdateStudent = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const { loading: loadingStudent, students: student } = useStudent(id);
  const { loading: loadingDepartment, departments } = useDepartment();
  const { loading: loadingCollege, colleges } = useCollege();

    useEffect(() => {
      if (!loadingStudent && student) setFormData(student);
    }, [loadingStudent, student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.put("/student", formData);

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.student+"/"+ id);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full bg-base-200 font-sans overflow-y-scroll">
      <div className="max-w-xl mx-auto bg-base-100 p-8 rounded-lg shadow">
        <h1 className="text-lg text-stone-400 lg:text-2xl font-bold mb-6">
          Update Student
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="middleName"
              className="block text-sm font-medium"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData?.middleName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData?.dateOfBirth}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="idNumber"
              className="block text-sm font-medium"
            >
              Matric Number
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData?.idNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              type="text"
              id="gender"
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option className="dark:text-black" value="Male">Male</option>
              <option className="dark:text-black" value="Female">Female</option>
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
                  <option className="dark:text-black" key={level.name} value={level.name}>
                    {level.name}
                  </option>
                ))}
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
              value={formData?.department?._id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option className="dark:text-black" value="General">General</option>
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
              value={formData?.college?._id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option className="dark:text-black" value="General">General</option>
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
            { loading ? "..." : "Update Student" }
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
