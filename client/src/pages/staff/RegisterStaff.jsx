import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { cbt_url } from "../../utils/SD";
import useCollege from "../../hooks/useCollege";
import { title } from "../../data/static";

const RegisterStaff = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const { loading: loadingCollege, colleges } = useCollege();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post("/staff", formData);

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.staffs);
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
          Register New Staff
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
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <select
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              {title &&
                title.map((title) => (
                  <option key={title.id} value={title.name}>
                    {title.name}
                  </option>
                ))}
            </select>
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
              ID Number
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

          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              type="text"
              id="gender"
              name="gender"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option className="Male">Male</option>
              <option className="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              type="text"
              id="role"
              name="role"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option className="Admin">Admin</option>
              <option className="Lecturer">Lecturer</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            {loading ? "..." : "Register Staff"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStaff;
