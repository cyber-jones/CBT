import { useNavigate, useParams } from "react-router-dom";
import useStudent from "../../hooks/useStudent";
import { cbt_url } from "../../utils/SD";

const StudentProfile = () => {
  const { id } = useParams();
  const { students: student } = useStudent(id);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="staff Avatar"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="card-title text-lg md:text-2xl">
                {student?.lastName} {student?.firstName}
              </h2>
              <p className="text-sm text-gray-500">ID: {student?.idNumber}</p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> {student?.email}
                </p>
                <p>
                  <strong>Full name:</strong> {student?.lastName}{" "}
                  {student?.firstName} {student?.middleName}
                </p>
                <p>
                  <strong>Gender:</strong> {student?.gender}
                </p>
                <p>
                  <strong>User:</strong> Student
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(student?.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => navigate(cbt_url.updateStudent + "/" + id)}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
