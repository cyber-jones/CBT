import { useState } from "react";
import StudentLogin from "../components/login/StudentLogin";
import StaffLogin from "../components/login/staffLogin";

const Login = () => {
  const [user, setUser] = useState("student");
  
  const handleChangeUserToStaff = () => {
    setUser("staff");
  }
  
  const handleChangeUserToStudent = () => {
    setUser("student");
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-6/12 h-full lg:block hidden">
        <img
          className="h-screen w-full object-cover"
          src="/Images/MacBook Air - 4.png"
          alt="login image"
        />
      </div>
      <div className="w-full lg:w-6/12 h-full flex justify-center items-center">
        <div className="w-11/12 h-11/12 flex justify-around items-center flex-col">
          <h1 className="uppercase text-2xl">
            Welcome to <span className="text-green-400">fuo cbt</span> portal
          </h1>
          <img className="w-xs rounded-2xl" src="/Images/osogboM.jpg" alt="fuo logo" />
          <div className="w-xs flex justify-between">
            <button onClick={handleChangeUserToStudent} className={`btn ${user == "staff" ? "btn-soft": ""} btn-success w-24`}>Student</button>
            <button onClick={handleChangeUserToStaff} className={`btn ${user == "student" ? "btn-soft": ""} btn-success w-24`}>Staff</button>
          </div>
          { user == "student" ? <StudentLogin /> : <StaffLogin /> }
        </div>
      </div>
    </div>
  );
};

export default Login;
