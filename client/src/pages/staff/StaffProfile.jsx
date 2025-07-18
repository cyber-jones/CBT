import { useNavigate, useParams } from "react-router-dom";
import useStaff from "../../hooks/useStaff";
import { cbt_url } from "../../utils/SD";

const StaffProfile = () => {
  const { id } = useParams();
  const { staffs: staff } = useStaff(id);
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
                {staff?.lastName} {staff?.firstName}
              </h2>
              <p className="text-sm text-gray-500">ID: {staff?.idNumber}</p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> {staff?.email}
                </p>
                <p>
                  <strong>Full name:</strong> {staff?.lastName}{" "}
                  {staff?.firstName} {staff?.middleName}
                </p>
                <p>
                  <strong>Gender:</strong> {staff?.gender}
                </p>
                <p>
                  <strong>User:</strong> Staff
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(staff?.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => navigate(cbt_url.updateStaff + "/" + id)}
                  className="btn btn-primary"
                >
                  Update
                </button>
                <button className="btn btn-success ml-4">Allow Exam</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
