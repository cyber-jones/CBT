import React from "react";

const exams = [
  {
    subject: "Mathematics",
    date: "2025-06-12",
    score: 85,
    status: "Passed",
  },
  {
    subject: "English Language",
    date: "2025-06-14",
    score: 72,
    status: "Passed",
  },
  {
    subject: "Biology",
    date: "2025-06-16",
    score: 58,
    status: "Failed",
  },
  {
    subject: "Computer Science",
    date: "2025-06-18",
    score: 90,
    status: "Passed",
  },
];

const StudentResult = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl font-bold mb-4 text-center">📚 Exam Results</div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Score (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>{exam.score}</td>
                  <td>
                    <span
                      className={`badge ${
                        exam.status === "Passed"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentResult;