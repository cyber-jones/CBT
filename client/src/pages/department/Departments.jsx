import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useDepartment from "../../hooks/useDepartment";

// const departments = [
//   { id: 1, name: "Computer science", code: "CPS", college: "CONAS" },
//   { id: 2, name: "Law", code: "Law", college: "COLAW" },
//   { id: 3, name: "Nursing", code: "Nursing", college: "COBHMES" }
// ];

const Departments = () => {
  const navigate = useNavigate();
  const { loading, departments } = useDepartment();
  return (
    <div className="p-6 font-sans h-full bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm lg:text-3xl font-bold text-gray-800">
          Departments
        </h1>
        <button
          onClick={() => navigate(cbt_url.createDepartment)}
          className="btn btn-success"
        >
          + New Department
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-scroll h-11/12">
        {!loading && departments ? (
          <table className="w-full text-left text-[10px] md:text-sm">
            <thead className="bg-green-400 text-gray-700">
              <tr>
                <th className="p-3 hidden lg:block">Course Code</th>
                <th className="p-3 block lg:hidden">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3">College</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr
                  onClick={() =>
                    navigate(cbt_url.departments + "/" + department._id)
                  }
                  key={department._id}
                  className="border-b hover:cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {department.code}
                  </td>
                  <td className="p-3 text-gray-800">{department.name}</td>
                  <td className="p-3 text-gray-800">{department.college.name}</td>
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

export default Departments;
