import useAppContext from "../hooks/useAppContext";

const Profile = () => {
  const { user, authUser } = useAppContext();
  console.log(user);
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
                {user?.lastName} {user?.firstName}
              </h2>
              <p className="text-sm text-gray-500">ID: {user?.idNumber}</p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Full name:</strong> {user?.title} {user?.lastName}{" "}
                  {user?.firstName} {user?.middleName}
                </p>
                <p>
                  <strong>Gender:</strong> {user?.gender}
                </p>
                {user?.department?.name ? (
                  <p>
                    <strong>Department:</strong> {user?.department?.name}
                  </p>
                ) : null}
                {user?.college?.name ? (
                  <p>
                    <strong>College:</strong> {user?.college?.name}
                  </p>
                ) : null}
                {user?.level ? (
                  <p>
                    <strong>Level:</strong> {user?.level}
                  </p>
                ) : null}
                <p>
                  <strong>User:</strong> {authUser?.role}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(user?.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
