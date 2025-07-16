import { useState } from "react";
import StudentLogin from "../components/login/StudentLogin";
import StaffLogin from "../components/login/StaffLogin";
import useAppContext from "../hooks/useAppContext";
import { toast } from "react-toastify";
import axiosConfig from "../data/axiosConfig";
import { useNavigate } from "react-router-dom";
import { cbt_url } from "../utils/SD";

const Login = () => {
  const { setAuthUser, setUser, setToken } = useAppContext();
  const [selectedUser, setSelectedUser] = useState("student");
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axiosConfig.post("/auth/login", {...formData, selectedUser});

      if (res.status !== 200)
        return toast.error(res.data?.message || res.statusText);

      setAuthUser(res.data?.authUser);
      setUser(res.data?.user);
      setToken(res.data?.accessToken);
      toast.success(res.statusText);
      navigate(cbt_url.dashboard);
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false)
    }
  };

  const handleChangeUserToStaff = () => {
    setSelectedUser("staff");
  };

  const handleChangeUserToStudent = () => {
    setSelectedUser("student");
  };

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
          <img
            className="w-xs rounded-2xl"
            src="/Images/osogboM.jpg"
            alt="fuo logo"
          />
          <div className="w-xs flex justify-between">
            <button
              onClick={handleChangeUserToStudent}
              className={`btn ${
                selectedUser == "staff" ? "btn-soft" : ""
              } btn-success w-24`}
            >
              Student
            </button>
            <button
              onClick={handleChangeUserToStaff}
              className={`btn ${
                selectedUser == "student" ? "btn-soft" : ""
              } btn-success w-24`}
            >
              Staff
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {selectedUser == "student" ? (
              <StudentLogin handleChange={handleChange} loading={loading} />
            ) : (
              <StaffLogin handleChange={handleChange} loading={loading} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
