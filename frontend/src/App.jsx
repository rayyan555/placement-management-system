// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/auth/Login";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
// import StudentDashboard from "./pages/student/StudentDashboard";

// import ProtectedRoute from "./components/ProtectedRoute";
// import DashboardLayout from "./layouts/DashboardLayout";

// import Departments from "./pages/admin/Departments";
// import Users from "./pages/admin/Users";
// import Coordinators from "./pages/admin/Coordinators";
// import CompanyDrives from "./pages/admin/CompanyDrives";
// import Students from "./pages/admin/Students";
// import BulkUpload from "./pages/admin/BulkUpload";
// import StudentReports from "./pages/admin/StudentReports";

// /* ===== COORDINATOR PAGES ===== */

// import DepartmentStudents from "./pages/coordinator/DepartmentStudents";
// import UploadStudents from "./pages/coordinator/UploadStudents";
// import StudentFilter from "./pages/coordinator/StudentFilter";
// import DepartmentReports from "./pages/coordinator/DepartmentReports";

// import StudentProfile from "./pages/student/StudentProfile";
// import StudentDrives from "./pages/student/StudentDrives";
// import ApplicationStatus from "./pages/student/ApplicationStatus";
// import SubmitFeedback from "./pages/student/SubmitFeedback";

// function App() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         {/* Login */}
//         <Route path="/" element={<Login />} />

//         {/* ================= ADMIN ================= */}

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <AdminDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/departments"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Departments />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Users />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/coordinators"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Coordinators />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/drives"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <CompanyDrives />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/students"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Students />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/bulk-upload"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <BulkUpload />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/student-reports"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <StudentReports />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= COORDINATOR ================= */}

//         <Route
//           path="/coordinator"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <CoordinatorDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/dashboard"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <CoordinatorDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/students"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <DepartmentStudents />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/upload"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <UploadStudents />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/filter"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <StudentFilter />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/reports"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <DepartmentReports />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= STUDENT ================= */}

//         <Route
//           path="/student"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <StudentDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/dashboard"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <StudentDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         /* ================= STUDENT ================= */

// <Route
//   path="/student"
//   element={
//     <ProtectedRoute role="STUDENT">
//       <DashboardLayout>
//         <StudentDashboard />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/student/dashboard"
//   element={
//     <ProtectedRoute role="STUDENT">
//       <DashboardLayout>
//         <StudentDashboard />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/student/profile"
//   element={
//     <ProtectedRoute role="STUDENT">
//       <DashboardLayout>
//         <StudentProfile />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/student/drives"
//   element={
//     <ProtectedRoute role="STUDENT">
//       <DashboardLayout>
//         <StudentDrives />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/student/applications"
//   element={
//     <ProtectedRoute role="STUDENT">
//       <DashboardLayout>
//         <ApplicationStatus />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/student/feedback"
//   element={
//     <ProtectedRoute role="STUDENT">
//       <DashboardLayout>
//         <SubmitFeedback />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

//       </Routes>

//     </BrowserRouter>

//   );

// }

// export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/auth/Login";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
// import StudentDashboard from "./pages/student/StudentDashboard";

// import ProtectedRoute from "./components/ProtectedRoute";
// import DashboardLayout from "./layouts/DashboardLayout";

// import Departments from "./pages/admin/Departments";
// import Users from "./pages/admin/Users";
// import Coordinators from "./pages/admin/Coordinators";
// import CompanyDrives from "./pages/admin/CompanyDrives";
// import Students from "./pages/admin/Students";
// import BulkUpload from "./pages/admin/BulkUpload";
// import StudentReports from "./pages/admin/StudentReports";

// /* ===== COORDINATOR PAGES ===== */

// import DepartmentStudents from "./pages/coordinator/DepartmentStudents";
// import UploadStudents from "./pages/coordinator/UploadStudents";
// import StudentFilter from "./pages/coordinator/StudentFilter";
// import DepartmentReports from "./pages/coordinator/DepartmentReports";
// import DriveApplications from "./pages/coordinator/DriveApplications"; // ✅ NEW

// /* ===== STUDENT PAGES ===== */

// import StudentProfile from "./pages/student/StudentProfile";
// import StudentDrives from "./pages/student/StudentDrives";
// import ApplicationStatus from "./pages/student/ApplicationStatus";
// import SubmitFeedback from "./pages/student/SubmitFeedback";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Login */}
//         <Route path="/" element={<Login />} />

//         {/* ================= ADMIN ================= */}

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <AdminDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/departments"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Departments />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Users />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/coordinators"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Coordinators />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/drives"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <CompanyDrives />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/students"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <Students />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/bulk-upload"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <BulkUpload />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/student-reports"
//           element={
//             <ProtectedRoute role="PLACEMENT_COORDINATOR">
//               <DashboardLayout>
//                 <StudentReports />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= COORDINATOR ================= */}

//         <Route
//           path="/coordinator"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <CoordinatorDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/dashboard"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <CoordinatorDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/students"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <DepartmentStudents />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/upload"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <UploadStudents />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/filter"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <StudentFilter />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/coordinator/reports"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <DepartmentReports />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ NEW PAGE FOR STATUS MANAGEMENT */}
//         <Route
//           path="/coordinator/drive-applications"
//           element={
//             <ProtectedRoute role="DEPT_COORDINATOR">
//               <DashboardLayout>
//                 <DriveApplications />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= STUDENT ================= */}

//         <Route
//           path="/student"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <StudentDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/dashboard"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <StudentDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/profile"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <StudentProfile />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/drives"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <StudentDrives />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/applications"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <ApplicationStatus />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/feedback"
//           element={
//             <ProtectedRoute role="STUDENT">
//               <DashboardLayout>
//                 <SubmitFeedback />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
// ✅ NEW

import AdminDashboard from "./pages/admin/AdminDashboard";
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Departments from "./pages/admin/Departments";
import Users from "./pages/admin/Users";
import Coordinators from "./pages/admin/Coordinators";
import CompanyDrives from "./pages/admin/CompanyDrives";
import Students from "./pages/admin/Students";
import BulkUpload from "./pages/admin/BulkUpload";
import StudentReports from "./pages/admin/StudentReports";

/* ===== COORDINATOR PAGES ===== */
import DepartmentStudents from "./pages/coordinator/DepartmentStudents";
import UploadStudents from "./pages/coordinator/UploadStudents";
import StudentFilter from "./pages/coordinator/StudentFilter";
import DepartmentReports from "./pages/coordinator/DepartmentReports";
import DriveApplications from "./pages/coordinator/DriveApplications";

/* ===== STUDENT PAGES ===== */
import StudentProfile from "./pages/student/StudentProfile";
import StudentDrives from "./pages/student/StudentDrives";
import ApplicationStatus from "./pages/student/ApplicationStatus";
import SubmitFeedback from "./pages/student/SubmitFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

      
        

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <Departments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/coordinators"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <Coordinators />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/drives"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <CompanyDrives />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <Students />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bulk-upload"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <BulkUpload />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/student-reports"
          element={
            <ProtectedRoute role="PLACEMENT_COORDINATOR">
              <DashboardLayout>
                <StudentReports />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= COORDINATOR ================= */}

        <Route
          path="/coordinator"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <CoordinatorDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator/dashboard"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <CoordinatorDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator/students"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <DepartmentStudents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator/upload"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <UploadStudents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator/filter"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <StudentFilter />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator/reports"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <DepartmentReports />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator/drive-applications"
          element={
            <ProtectedRoute role="DEPT_COORDINATOR">
              <DashboardLayout>
                <DriveApplications />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="STUDENT">
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="STUDENT">
              <DashboardLayout>
                <StudentProfile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/drives"
          element={
            <ProtectedRoute role="STUDENT">
              <DashboardLayout>
                <StudentDrives />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/applications"
          element={
            <ProtectedRoute role="STUDENT">
              <DashboardLayout>
                <ApplicationStatus />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/feedback"
          element={
            <ProtectedRoute role="STUDENT">
              <DashboardLayout>
                <SubmitFeedback />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;