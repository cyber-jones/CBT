import { useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useStudent from "../../hooks/useStudent";
import Loading from "../../components/Loading";

// const students = [
//   {
//     id: 1,
//     firstName: "James",
//     lastName: "Simon",
//     middleName: "Samuel",
//     email: "samuel@gmail.com",
//     level: "100",
//   },
//   {
//     id: 2,
//     firstName: "Kemi",
//     lastName: "Leonard",
//     middleName: "Okiki",
//     email: "kemi@gmail.com",
//     level: "300",
//   },
//   {
//     id: 3,
//     firstName: "Richard",
//     lastName: "Kenedy",
//     middleName: "James",
//     email: "richard@gmail.com",
//     level: "200",
//   },
//   {
//     id: 4,
//     firstName: "John",
//     lastName: "Segun",
//     middleName: "Daniel",
//     email: "john@gmail.com",
//     level: "500",
//   },
// ];

const Students = () => {
  const navigate = useNavigate();
  const { loading, students } = useStudent();
  return (
    <div className="p-6 font-sans h-full bg-base-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg text-stone-400 lg:text-3xl font-bold">
          Students
        </h1>
        <button
          onClick={() => navigate(cbt_url.studentRegistration)}
          className="btn btn-success"
        >
          + Register student
        </button>
      </div>

      <div className="bg-base-100 rounded-lg shadow overflow-scroll max-h-11/12">
        {!loading ? (
          <table className="w-full text-center text-[10px] md:text-sm">
            <thead className="bg-green-400">
              <tr>
                <th className="p-3">First Name</th>
                <th className="p-3 ">Last Name</th>
                <th className="p-3 hidden lg:block">Middle Name</th>
                <th className="p-3">Level</th>
                <th className="p-3 hidden lg:block">Email</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student) => (
                  <tr
                    onClick={() =>
                      navigate(cbt_url.student + "/" + student._id)
                    }
                    key={student._id}
                    className="border-b hover:cursor-pointer hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">
                      {student.firstName}
                    </td>
                    <td className="p-3">{student.lastName}</td>
                    <td className="p-3 hidden lg:block">
                      {student.middleName}
                    </td>

                    <td className="p-3">{student.level}</td>
                    <td className="p-3 hidden lg:block">
                      {student.email}
                    </td>
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

export default Students;
