import { useState } from "react";
import { Link } from "react-router-dom";
import { cbt_url, Roles } from "../utils/SD";
import Header from "./Header";
import useAppContext from "../hooks/useAppContext";


const NavWrapper = ({ children }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAppContext();

  const navItems = [
  {
    id: cbt_url.dashboard,
    label: "Dashboard",
    icon: <i className="bi bi-houses h-5 w-5"></i>,
    hidden: true
  },
  {
    id: cbt_url.colleges,
    label: "Colleges",
    icon: <i className="bi bi-layout-text-window-reverse h-5 w-5"></i>,
    hidden: authUser.role == Roles.ADMIN
  },
  {
    id: cbt_url.departments,
    label: "Departments",
    icon: <i className="bi bi-layers h-5 w-5"></i>,
    hidden: authUser.role == Roles.ADMIN
  },
  {
    id: cbt_url.students,
    label: "Students",
    icon: <i className="bi bi-people h-5 w-5"></i>,
    hidden: authUser.role == Roles.ADMIN
  },
  {
    id: cbt_url.staffs,
    label: "Staffs",
    icon: <i className="bi bi-people h-5 w-5"></i>,
    hidden: authUser.role == Roles.ADMIN
  },
  {
    id: cbt_url.courses,
    label: "Courses",
    icon: <i className="bi bi-journals h-5 w-5"></i>,
    hidden: authUser.role == Roles.ADMIN
  },
  {
    id: cbt_url.lecturerCourses,
    label: "Courses",
    icon: <i className="bi bi-journals h-5 w-5"></i>,
    hidden: authUser.role == Roles.LECTURER
  },
  {
    id: cbt_url.exams,
    label: "Exams",
    icon: <i className="bi bi-journal-text h-5 w-5"></i>,
    hidden: true
  },
  {
    id: cbt_url.results,
    label: "Results",
    icon: <i className="bi bi-journal-bookmark h-5 w-5"></i>,
    hidden: authUser.role == Roles.STUDENT
  },
  {
    id: cbt_url.profile,
    label: "Profile",
    icon: <i className="bi bi-person h-5 w-5"></i>,
    hidden: true
  },
];


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-green-800 h-full text-white ${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <span className="text-lg font-bold">{isOpen ? authUser?.role : authUser?.role.split("")[0] }</span>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
        <nav className="mt-4">
          {navItems.map((item, index) => (
            <Link
              to={item.id}
              key={index}
              hidden={!item.hidden}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                activePage === item.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <div className="mr-3">{item.icon}</div>
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col flex-1 h-full overflow-auto">
        <Header />
        {/* Main content */}
        <div className="flex-1 p-2 lg:p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default NavWrapper;
