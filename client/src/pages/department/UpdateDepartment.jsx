import { useEffect, useState } from "react";
import useDepartment from "../../hooks/useDepartment";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cbt_url } from "../../utils/SD";
import useCollege from "../../hooks/useCollege";

const UpdateDepartment = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { loading: loadingDepartment, departments: department } =
    useDepartment(id);
      const { loading: loadingCollege, colleges } = useCollege();

  useEffect(() => {
    if (!loadingDepartment && department) setFormData(department);
  }, [loadingDepartment, department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.put("/department/" + id, formData);

      if (res.status !== 205)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.departments + "/" + id);
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
          Update Department
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium"
            >
              Department Code
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
            <label
              htmlFor="name"
              className="block text-sm font-medium"
            >
              Department Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="college"
              className="block text-sm font-medium"
            >
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
                  <option className="dark:text-black" key={index} value={college._id}>
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
            {loading ? "..." : "Update Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDepartment;
