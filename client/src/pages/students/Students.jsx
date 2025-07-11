import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";

const students = [
  {
    id: 1,
    firstName: "James",
    lastName: "Simon",
    middleName: "Samuel",
    email: "samuel@gmail.com",
    level: "100",
  },
  {
    id: 2,
    firstName: "Kemi",
    lastName: "Leonard",
    middleName: "Okiki",
    email: "kemi@gmail.com",
    level: "300",
  },
  {
    id: 3,
    firstName: "Richard",
    lastName: "Kenedy",
    middleName: "James",
    email: "richard@gmail.com",
    level: "200",
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Segun",
    middleName: "Daniel",
    email: "john@gmail.com",
    level: "500",
  },
];

const Students = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 font-sans h-full bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm lg:text-3xl font-bold text-gray-800">
          Students
        </h1>
        <button
          onClick={() => navigate(cbt_url.studentRegistration)}
          className="btn btn-success"
        >
          + Register student
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-scroll h-11/12">
        <table className="w-full text-left text-[10px] md:text-sm">
          <thead className="bg-green-400 text-gray-700">
            <tr>
              <th className="p-3">First Name</th>
              <th className="p-3 ">Last Name</th>
              <th className="p-3 hidden lg:block">Middle Name</th>
              <th className="p-3">Level</th>
              <th className="p-3 hidden lg:block">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                onClick={() => navigate(cbt_url.students + "/" + student.id)}
                key={student.id}
                className="border-b hover:cursor-pointer hover:bg-gray-50"
              >
                <td className="p-3 font-medium text-gray-800">
                  {student.firstName}
                </td>
                <td className="p-3 text-gray-800">{student.lastName}</td>
                <td className="p-3 text-gray-800 hidden lg:block">
                  {student.middleName}
                </td>

                <td className="p-3 text-gray-800">{student.level}</td>
                <td className="p-3 text-gray-800 hidden lg:block">
                  {student.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
