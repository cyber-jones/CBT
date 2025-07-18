import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useCollege from "../../hooks/useCollege";
import Loading from "../../components/Loading";


const Colleges = () => {
  const navigate = useNavigate();
  const { loading, colleges } = useCollege();

  return (
    <div className="p-6 font-sans h-full bg-base-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg  text-stone-400 lg:text-3xl font-bold">
          Colleges
        </h1>
        <button
          onClick={() => navigate(cbt_url.createCollege)}
          className="btn btn-success"
        >
          + New College
        </button>
      </div>

      <div className="bg-base-100 rounded-lg shadow overflow-scroll max-h-11/12">
        {!loading && colleges ? (
          <table className="w-full text-center text-[10px] md:text-sm">
            <thead className="bg-green-400">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college) => (
                <tr
                  onClick={() => navigate(cbt_url.colleges + "/" + college._id)}
                  key={college._id}
                  className="border-b hover:cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {college.code}
                  </td>
                  <td className="p-3">{college.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Colleges;
