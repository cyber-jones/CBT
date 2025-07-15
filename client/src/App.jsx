import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentExams from "./pages/students/StudentExams";
import StudentResult from "./pages/students/StudentResults";
import Exams from "./pages/exam/Exams";
import ExamDetails from "./pages/exam/ExamDetails";
import RegisterStaff from "./pages/staff/RegisterStaff";
import UpdateStaff from "./pages/staff/UpadateStaff";
import RegisterStudent from "./pages/students/RegisterStudent";
import UpdateStudent from "./pages/students/UpdateStudent";
import ExamResults from "./pages/exam/ExamResults";
import Students from "./pages/students/Students";
import Staffs from "./pages/staff/Staffs";
import Exam from "./pages/exam/Exam";
import ExamSubmitted from "./pages/exam/ExamSubmited";
import NotFound from "./pages/NotFound";
import IsLoggedIn from "./components/middleware/IsLoggedIn";
import IsAuth from "./components/middleware/IsAuth";
import PersistAuth from "./components/middleware/PersistAuth";

function App() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route element={<PersistAuth />}>
          <Route element={<IsAuth roles={[]}/>} >
            <Route path={cbt_url.dashboard} element={<NavWrapper><DashBoard /></NavWrapper>} />
            <Route path={cbt_url.profile} element={<NavWrapper><Profile /></NavWrapper>} />

            <Route path={cbt_url.courses} element={<NavWrapper><Courses /></NavWrapper>} />
            <Route path={cbt_url.createCourse} element={<NavWrapper><RegisterCourse /></NavWrapper>} />
            <Route path={cbt_url.updateCourse+"/:id"} element={<NavWrapper><UpdateCourse /></NavWrapper>} />
            <Route path={cbt_url.courses+"/:id"} element={<NavWrapper><DetailedCourse /></NavWrapper>} />

            <Route path={cbt_url.departments} element={<NavWrapper><Departments /></NavWrapper>} />
            <Route path={cbt_url.createDepartment} element={<NavWrapper><RegisterDepartment /></NavWrapper>} />
            <Route path={cbt_url.updateDepartment+"/:id"} element={<NavWrapper><UpdateDepartment /></NavWrapper>} />
            <Route path={cbt_url.departments+"/:id"} element={<NavWrapper><DetailedDepartment /></NavWrapper>} />

            <Route path={cbt_url.colleges} element={<NavWrapper><Colleges /></NavWrapper>} />
            <Route path={cbt_url.createCollege} element={<NavWrapper><RegisterCollege /></NavWrapper>} />
            <Route path={cbt_url.updateCollege+"/:id"} element={<NavWrapper><UpdateCollege /></NavWrapper>} />
            <Route path={cbt_url.colleges+"/:id"} element={<NavWrapper><DetailedCollege /></NavWrapper>} />

            <Route path={cbt_url.staffRegistration} element={<NavWrapper><RegisterStaff /></NavWrapper>} />
            <Route path={cbt_url.staff+"/:id"} element={<NavWrapper><UpdateStaff /></NavWrapper>} />
            <Route path={cbt_url.staffs} element={<NavWrapper><Staffs /></NavWrapper>} />

            <Route path={cbt_url.studentRegistration} element={<NavWrapper><RegisterStudent /></NavWrapper>} />
            <Route path={cbt_url.student+"/:id"} element={<NavWrapper><UpdateStudent /></NavWrapper>} />
            <Route path={cbt_url.students} element={<NavWrapper><Students /></NavWrapper>} />

            <Route path={cbt_url.examResult} element={<NavWrapper><ExamResults /></NavWrapper>} />
            <Route path={cbt_url.exams} element={<NavWrapper><Exams /></NavWrapper>} />
            <Route path={cbt_url.exam+"/:id"} element={<NavWrapper><ExamDetails /></NavWrapper>} />

            <Route path={cbt_url.studentResult} element={<NavWrapper><StudentResult /></NavWrapper>} />
            <Route path={cbt_url.studentExams} element={<NavWrapper><StudentExams /></NavWrapper>} />

            <Route path={cbt_url.startExam+"/:id"} element={<Exam />} />
            <Route path={cbt_url.submittedExam} element={<ExamSubmitted />} />
          </Route>
        </Route>

        <Route element={<IsLoggedIn />} >
          <Route path={cbt_url.home} element={<Home />} />
        </Route> 

        <Route path={cbt_url.login} element={<Login />} />
    
        <Route path="*" element={<NotFound />} />
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
