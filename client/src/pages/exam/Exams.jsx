import React from "react";
import { Link } from "react-router-dom";
import { cbt_url } from "../../utils/SD";

const courses = [
  {
    code: "CSC101",
    name: "Introduction to Computer Science",
    unit: 3,
  },
  {
    code: "MTH102",
    name: "Calculus II",
    unit: 2,
  },
  {
    code: "PHY103",
    name: "General Physics I",
    unit: 3,
  },
  {
    code: "GST104",
    name: "Use of English",
    unit: 2,
  },
];

const Exams = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg md:text-3xl font-bold text-center mb-8">📋 Exam Course List</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 hover:cursor-pointer">
          {courses.map((course, idx) => (
            <Link to={cbt_url.exam+"/1"} key={idx} className="card shadow-lg bg-base-100 border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-primary">{course.code}</h2>
                <p className="text-lg font-semibold">{course.name}</p>
                <div className="mt-2">
                  <span className="badge badge-info badge-outline">
                    Units: {course.unit}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Exams