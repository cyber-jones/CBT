import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import LecturerDashboard from "./components/LecturerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ role }));
    setUser({ role });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Computer-Based Testing System</h1>
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        <ToastContainer />
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to={`/${user.role.toLowerCase()}`} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/student"
            element={
              user?.role === "Student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/lecturer"
            element={
              user?.role === "Lecturer" ? (
                <LecturerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              user?.role === "Admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
