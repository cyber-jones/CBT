import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cbt_url } from "../../utils/SD";
import useCollege from "../../hooks/useCollege";

const RegisterDepartment = () => {
  const [formData, setFormData] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loading: loadingCollege, colleges } = useCollege();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post("/department", formData);

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.departments);
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
          Register New Department
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium">
              Department Code
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
            <label htmlFor="name" className="block text-sm font-medium">
              Department Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
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

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            {loading ? "..." : "Register Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDepartment;
