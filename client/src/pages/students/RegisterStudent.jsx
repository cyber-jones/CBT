import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import { toast } from "react-toastify";
import { level } from "../../data/static";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post("/student", formData);

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.students);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full bg-green-100 font-sans overflow-y-scroll">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow text-gray-800">
        <h1 className="text-lg lg:text-2xl font-bold mb-6 text-gray-800">
          Register New Student
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium">
              Date Of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium">
              Matric Number
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
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
              <option className="text-black" value={"100"}>
                100
              </option>
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
              <option className="text-black" value={"100"}>
                100
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            {loading ? "..." : "Register Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
