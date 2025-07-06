import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import "./App.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import NavWrapper from "./components/NavWrapper";
import DashBoard from "./pages/DashBoard";
import { cbt_url } from "./utils/SD";
import Courses from "./pages/course/Courses";
import RegisterCourse from "./pages/course/RegisterCourse";
import UpdateCourse from "./pages/course/UpdateCourse";
import DetailedCourse from "./pages/course/DetailedCourse";
import Departments from "./pages/department/Departments";
import Colleges from "./pages/college/Colleges";
import Profile from "./pages/Profile";
import RegisterDepartment from "./pages/department/RegisterDepartment";
import UpdateDepartment from "./pages/department/UpdateDepartment";
import DetailedDepartment from "./pages/department/DetailedDepartment";
import RegisterCollege from "./pages/college/RegisterCollege";
import UpdateCollege from "./pages/college/UpdateCollege";
import DetailedCollege from "./pages/college/DetailedCollege";

function App() {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path={cbt_url.dashboard} element={<NavWrapper><DashBoard /></NavWrapper>} />
        <Route path={cbt_url.colleges} element={<NavWrapper><Colleges /></NavWrapper>} />
        <Route path={cbt_url.departments} element={<NavWrapper><Departments /></NavWrapper>} />
        <Route path={cbt_url.courses} element={<NavWrapper><Courses /></NavWrapper>} />
        <Route path={cbt_url.profile} element={<NavWrapper><Profile /></NavWrapper>} />


        <Route path={cbt_url.createCourse} element={<NavWrapper><RegisterCourse /></NavWrapper>} />
        <Route path={cbt_url.updateCourse+"/:id"} element={<NavWrapper><UpdateCourse /></NavWrapper>} />
        <Route path={cbt_url.courses+"/:id"} element={<NavWrapper><DetailedCourse /></NavWrapper>} />

        <Route path={cbt_url.createDepartment} element={<NavWrapper><RegisterDepartment /></NavWrapper>} />
        <Route path={cbt_url.updateDepartment+"/:id"} element={<NavWrapper><UpdateDepartment /></NavWrapper>} />
        <Route path={cbt_url.departments+"/:id"} element={<NavWrapper><DetailedDepartment /></NavWrapper>} />

        <Route path={cbt_url.createCollege} element={<NavWrapper><RegisterCollege /></NavWrapper>} />
        <Route path={cbt_url.updateCollege+"/:id"} element={<NavWrapper><UpdateCollege /></NavWrapper>} />
        <Route path={cbt_url.colleges+"/:id"} element={<NavWrapper><DetailedCollege /></NavWrapper>} />


        <Route path={cbt_url.Login} element={<Login />} />
      </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    //   <div className="App">
    //     <h1>Computer-Based Testing System</h1>
    //     {user && (
    //       <button onClick={handleLogout} className="logout-button">
    //         Logout
    //       </button>
    //     )}
    //     <ToastContainer />
    //     <Routes>
    //       <Route
    //         path="/login"
    //         element={
    //           user ? (
    //             <Navigate to={`/${user.role.toLowerCase()}`} />
    //           ) : (
    //             <Login onLogin={handleLogin} />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/student"
    //         element={
    //           user?.role === "Student" ? (
    //             <StudentDashboard />
    //           ) : (
    //             <Navigate to="/login" />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/lecturer"
    //         element={
    //           user?.role === "Lecturer" ? (
    //             <LecturerDashboard />
    //           ) : (
    //             <Navigate to="/login" />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/admin"
    //         element={
    //           user?.role === "Admin" ? (
    //             <AdminDashboard />
    //           ) : (
    //             <Navigate to="/login" />
    //           )
    //         }
    //       />
    //       <Route path="/" element={<Navigate to="/login" />} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
