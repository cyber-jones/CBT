import { useState } from "react";

const UpdateCollege = () => {
  const [formData, setFormData] = useState({
    code: "",
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College Updateed:", formData);
    // Add your submission logic here (API call, reset form, etc.)
  };

  return (
    <div className="p-6 h-full bg-green-100 font-sans">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-lg lg:text-2xl font-bold mb-6 text-gray-800">
          Update College
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              College Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              College Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
          >
            Update College
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCollege;
