import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";

const RegisterCollege = () => {
  const [formData, setFormData] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post("/college", formData);

      if (res.status !== 201)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.colleges);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full bg-base-200 font-sans">
      <div className="max-w-xl mx-auto bg-base-100 p-8 rounded-lg shadow">
        <h1 className="text-lg text-stone-400 lg:text-2xl font-bold mb-6">
          Register New College
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium"
            >
              College Code
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
            <label
              htmlFor="name"
              className="block text-sm font-medium"
            >
              College Name
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

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            {loading ? "..." : "Register College"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCollege;
