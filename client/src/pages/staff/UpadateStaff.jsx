import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import useCollege from "../../hooks/useCollege";
import { toast } from "react-toastify";
import { cbt_url } from "../../utils/SD";
import { useEffect } from "react";
import useStaff from "../../hooks/useStaff";

const UpdateStaff = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const { loading: loadingStaff, staffs: staff } = useStaff(id);
  const { loading: loadingCollege, colleges } = useCollege();
  console.log(staff)
    useEffect(() => {
      if (!loadingStaff && staff) setFormData(staff);
    }, [loadingStaff, staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.put("/staff/" + id, formData);

      if (res.status !== 205)
        return toast.error(res.data?.message || res.statusText);

      toast.success(res.data?.message || res.statusText);
      navigate(cbt_url.staff + "/" + id);
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
          Update Staff
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
              ID Number
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
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              type="text"
              id="role"
              name="role"
              value={formData?.user?.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option></option>
              <option className="dark:text-black" value="Admin">Admin</option>
              <option className="dark:text-black" value="Lecturer">Lecturer</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            { loading ? "..." : "Update Staff"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStaff;
