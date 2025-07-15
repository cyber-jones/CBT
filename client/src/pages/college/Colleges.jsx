import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useCollege from "../../hooks/useCollege";


const Colleges = () => {
  const navigate = useNavigate();
  const { loading, colleges } = useCollege();

  return (
    <div className="p-6 font-sans h-full bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
          Colleges
        </h1>
        <button
          onClick={() => navigate(cbt_url.createCollege)}
          className="btn btn-success"
        >
          + New College
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-scroll h-11/12">
        {!loading ? (
          <table className="w-full text-left text-[10px] md:text-sm">
            <thead className="bg-green-400 text-gray-700">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {colleges && colleges.map((college) => (
                <tr
                  onClick={() => navigate(cbt_url.colleges + "/" + college._id)}
                  key={college._id}
                  className="border-b hover:cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {college.code}
                  </td>
                  <td className="p-3 text-gray-800">{college.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Colleges;
