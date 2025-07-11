
// const student = {
//   id: "STU-2023-0001",
//   name: "Shekemi Ronald",
//   email: "shekemie@example.com",
//   phone: "+234-701-234-5678",
//   gender: "Female",
//   department: "Computer Science",
//   level: "300 Level",
//   dob: "2002-07-14",
//   avatar: "https://i.pravatar.cc/150?img=47"
// };

const staff = {
  id: "STU-2023-0001",
  name: "Shekemi Ronald",
  email: "shekemie@example.com",
  phone: "+234-701-234-5678",
  gender: "Female",
  user: "Admin",
  dob: "2002-07-14",
  avatar: "https://i.pravatar.cc/150?img=47"
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={staff.avatar} alt="staff Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="card-title text-2xl">{staff.name}</h2>
              <p className="text-sm text-gray-500">ID: {staff.id}</p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> {staff.email}</p>
                <p><strong>Phone:</strong> {staff.phone}</p>
                <p><strong>Gender:</strong> {staff.gender}</p>
                <p><strong>User:</strong> {staff.user}</p>
                <p><strong>Date of Birth:</strong> {staff.dob}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;