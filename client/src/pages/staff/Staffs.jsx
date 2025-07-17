import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useStaff from "../../hooks/useStaff";

// const staffs = [
//   { id: 1, firstName: "James", lastName: "Simon", middletName: "Samuel", email: "samuel@gmail.com" },
//   { id: 2, firstName: "Kemi", lastName: "Leonard", middletName: "Okiki", email: "kemi@gmail.com" },
//   { id: 3, firstName: "Richard", lastName: "Kenedy", middletName: "James", email: "richard@gmail.com" },
//   { id: 4, firstName: "John", lastName: "Segun", middletName: "Daniel", email: "john@gmail.com" },
// ];

const Staffs = () => {
  const navigate = useNavigate();
  const { loading, staffs } = useStaff();
  return (
    <div className="p-6 font-sans h-full bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm lg:text-3xl font-bold text-gray-800">Staffs</h1>
        <button
          onClick={() => navigate(cbt_url.staffRegistration)}
          className="btn btn-success"
        >
          + Register Staff
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-scroll h-11/12">
        {!loading && staffs ? (
          <table className="w-full text-left text-[10px] md:text-sm">
            <thead className="bg-green-400 text-gray-700">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">First Name</th>
                <th className="p-3 ">Last Name</th>
                <th className="p-3 hidden lg:block">Middle Name</th>
                <th className="p-3">ID</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr
                  onClick={() => navigate(cbt_url.staff+"/"+staff._id)}
                  key={staff._id}
                  className="border-b hover:cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {staff.title}
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {staff.firstName}
                  </td>
                  <td className="p-3 text-gray-800">{staff.lastName}</td>
                  <td className="p-3 text-gray-800 hidden lg:block">
                    {staff.middletName}
                  </td>
                  <td className="p-3 text-gray-800">{staff.idNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default Staffs;
