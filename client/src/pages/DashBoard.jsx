const appointments = [
  { id: 1, patient: "John Doe" },
  { id: 2, patient: "Jane Smith" },
  { id: 3, patient: "Michael Scott" },
];

const patients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Scott" },
];

const logs = [
  { time: "09:00 AM", activity: "Checked in patient John Doe" },
  { time: "10:15 AM", activity: "Updated prescription for Jane Smith" },
  { time: "12:00 PM", activity: "Logged out" },
];

const DashBoard = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 capitalize">DashBoard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-blue-600 text-xl font-semibold">
            Total Students
          </h2>
          <p className="text-4xl font-bold">{patients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-green-600 text-xl font-semibold">Total Lecturers</h2>
          <p className="text-4xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-purple-600 text-xl font-semibold">
            Total Exams
          </h2>
          <p className="text-4xl font-bold">{logs.length}</p>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
