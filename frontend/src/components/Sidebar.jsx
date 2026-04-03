// // // import { NavLink } from "react-router-dom";

// // // function Sidebar() {

// // //   const role = localStorage.getItem("role");

// // //   const linkClass = ({ isActive }) =>
// // //     `block px-3 py-2 rounded transition ${
// // //       isActive
// // //         ? "bg-blue-600 text-white"
// // //         : "text-gray-300 hover:bg-gray-700 hover:text-white"
// // //     }`;

// // //   return (

// // //     <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

// // //       <h2 className="text-xl font-bold mb-8">
// // //         Placement Portal
// // //       </h2>

// // //       <ul className="space-y-3">

// // //         {/* ================= ADMIN SIDEBAR ================= */}

// // //         {role === "PLACEMENT_COORDINATOR" && (
// // //           <>
// // //             <li>
// // //               <NavLink to="/admin" className={linkClass}>
// // //                 Dashboard
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/departments" className={linkClass}>
// // //                 Departments
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/users" className={linkClass}>
// // //                 Users
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/coordinators" className={linkClass}>
// // //                 Coordinators
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/drives" className={linkClass}>
// // //                 Company Drives
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/students" className={linkClass}>
// // //                 Students
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/bulk-upload" className={linkClass}>
// // //                 Bulk Upload
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/admin/student-reports" className={linkClass}>
// // //                 Student Reports
// // //               </NavLink>
// // //             </li>
// // //           </>
// // //         )}

// // //         {/* ================= COORDINATOR SIDEBAR ================= */}

// // //         {role === "DEPT_COORDINATOR" && (
// // //           <>
// // //             <li>
// // //               <NavLink to="/coordinator/dashboard" className={linkClass}>
// // //                 Dashboard
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/coordinator/students" className={linkClass}>
// // //                 Department Students
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/coordinator/upload" className={linkClass}>
// // //                 Upload Students
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/coordinator/filter" className={linkClass}>
// // //                 Student Filter
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/coordinator/reports" className={linkClass}>
// // //                 Department Reports
// // //               </NavLink>
// // //             </li>
// // //           </>
// // //         )}

// // //         {/* ================= STUDENT SIDEBAR ================= */}

// // //         {role === "STUDENT" && (
// // //           <>
// // //             <li>
// // //               <NavLink to="/student/dashboard" className={linkClass}>
// // //                 Dashboard
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/student/profile" className={linkClass}>
// // //                 My Profile
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/student/drives" className={linkClass}>
// // //                 Available Drives
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/student/applications" className={linkClass}>
// // //                 Application Status
// // //               </NavLink>
// // //             </li>

// // //             <li>
// // //               <NavLink to="/student/feedback" className={linkClass}>
// // //                 Interview Feedback
// // //               </NavLink>
// // //             </li>
// // //           </>
// // //         )}

// // //       </ul>

// // //     </div>

// // //   );

// // // }

// // // export default Sidebar;


// // import { NavLink } from "react-router-dom";

// // function Sidebar() {

// //   const role = localStorage.getItem("role");

// //   const linkClass = ({ isActive }) =>
// //     `block px-3 py-2 rounded transition ${
// //       isActive
// //         ? "bg-blue-600 text-white"
// //         : "text-gray-300 hover:bg-gray-700 hover:text-white"
// //     }`;

// //   return (

// //     <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

// //       <h2 className="text-xl font-bold mb-8">
// //         Placement Portal
// //       </h2>

// //       <ul className="space-y-3">

// //         {/* ================= ADMIN SIDEBAR ================= */}

// //         {role === "PLACEMENT_COORDINATOR" && (
// //           <>
// //             <li>
// //               <NavLink to="/admin" className={linkClass}>
// //                 Dashboard
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/departments" className={linkClass}>
// //                 Departments
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/users" className={linkClass}>
// //                 Users
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/coordinators" className={linkClass}>
// //                 Coordinators
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/drives" className={linkClass}>
// //                 Company Drives
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/students" className={linkClass}>
// //                 Students
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/bulk-upload" className={linkClass}>
// //                 Bulk Upload
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/admin/student-reports" className={linkClass}>
// //                 Student Reports
// //               </NavLink>
// //             </li>
// //           </>
// //         )}

// //         {/* ================= COORDINATOR SIDEBAR ================= */}

// //         {role === "DEPT_COORDINATOR" && (
// //           <>
// //             <li>
// //               <NavLink to="/coordinator/dashboard" className={linkClass}>
// //                 Dashboard
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/coordinator/students" className={linkClass}>
// //                 Department Students
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/coordinator/upload" className={linkClass}>
// //                 Upload Students
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/coordinator/filter" className={linkClass}>
// //                 Student Filter
// //               </NavLink>
// //             </li>

// //             {/* 🔥 NEW FEATURE */}
// //             <li>
// //               <NavLink to="/coordinator/drive-applications" className={linkClass}>
// //                 Drive Applications
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/coordinator/reports" className={linkClass}>
// //                 Department Reports
// //               </NavLink>
// //             </li>
// //           </>
// //         )}

// //         {/* ================= STUDENT SIDEBAR ================= */}

// //         {role === "STUDENT" && (
// //           <>
// //             <li>
// //               <NavLink to="/student/dashboard" className={linkClass}>
// //                 Dashboard
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/student/profile" className={linkClass}>
// //                 My Profile
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/student/drives" className={linkClass}>
// //                 Available Drives
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/student/applications" className={linkClass}>
// //                 Application Status
// //               </NavLink>
// //             </li>

// //             <li>
// //               <NavLink to="/student/feedback" className={linkClass}>
// //                 Interview Feedback
// //               </NavLink>
// //             </li>
// //           </>
// //         )}

// //       </ul>

// //     </div>

// //   );

// // }

// // export default Sidebar;

// import { NavLink } from "react-router-dom";

// function Sidebar() {
//   const role = localStorage.getItem("role");

//   // Modernized link styles with a subtle left-border on active
//   const linkClass = ({ isActive }) =>
//     `group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//       isActive
//         ? "bg-blue-600/10 text-blue-400 border-l-4 border-blue-500 font-medium"
//         : "text-gray-400 hover:bg-gray-800 hover:text-white"
//     }`;

//   return (
//     <div className="w-64 bg-[#0f172a] text-white h-screen flex flex-col sticky top-0 border-r border-gray-800">
      
//       {/* Header Section */}
//       <div className="p-6">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">P</div>
//           <h2 className="text-xl font-bold tracking-tight text-white">
//             Portal<span className="text-blue-500">.</span>
//           </h2>
//         </div>
//         <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
//           {role?.replace("_", " ")}
//         </p>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
//         <ul className="space-y-1">

//           {/* ================= ADMIN ================= */}
//           {role === "PLACEMENT_COORDINATOR" && (
//             <>
//               <NavItem to="/admin" label="Dashboard" icon="📊" className={linkClass} />
//               <NavItem to="/admin/departments" label="Departments" icon="🏢" className={linkClass} />
//               <NavItem to="/admin/users" label="Users" icon="👥" className={linkClass} />
//               <NavItem to="/admin/coordinators" label="Coordinators" icon="🎓" className={linkClass} />
//               <NavItem to="/admin/drives" label="Company Drives" icon="💼" className={linkClass} />
//               <NavItem to="/admin/students" label="Students" icon="🧑‍🎓" className={linkClass} />
//               <NavItem to="/admin/bulk-upload" label="Bulk Upload" icon="📤" className={linkClass} />
//               <NavItem to="/admin/student-reports" label="Reports" icon="📑" className={linkClass} />
//             </>
//           )}

//           {/* ================= COORDINATOR ================= */}
//           {role === "DEPT_COORDINATOR" && (
//             <>
//               <NavItem to="/coordinator/dashboard" label="Dashboard" icon="📊" className={linkClass} />
//               <NavItem to="/coordinator/students" label="Dept Students" icon="👥" className={linkClass} />
//               <NavItem to="/coordinator/upload" label="Upload Data" icon="📁" className={linkClass} />
//               <NavItem to="/coordinator/filter" label="Student Filter" icon="🔍" className={linkClass} />
//               <NavItem to="/coordinator/drive-applications" label="Drive Apps" icon="📑" className={linkClass} />
//               <NavItem to="/coordinator/reports" label="Dept Reports" icon="📈" className={linkClass} />
//             </>
//           )}

//           {/* ================= STUDENT ================= */}
//           {role === "STUDENT" && (
//             <>
//               <NavItem to="/student/dashboard" label="Dashboard" icon="🏠" className={linkClass} />
//               <NavItem to="/student/profile" label="My Profile" icon="👤" className={linkClass} />
//               <NavItem to="/student/drives" label="Available Drives" icon="🚀" className={linkClass} />
//               <NavItem to="/student/applications" label="App Status" icon="📝" className={linkClass} />
//               <NavItem to="/student/feedback" label="Feedback" icon="💬" className={linkClass} />
//             </>
//           )}
//         </ul>
//       </nav>

//       {/* Footer / User Section */}
//       <div className="p-4 border-t border-gray-800 bg-gray-900/50">
//         <button 
//           onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
//           className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
//         >
//           <span>🚪</span> Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// // Helper component for cleaner code
// function NavItem({ to, label, icon, className }) {
//   return (
//     <li>
//       <NavLink to={to} className={className}>
//         <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">{icon}</span>
//         <span className="text-sm">{label}</span>
//       </NavLink>
//     </li>
//   );
// }

// export default Sidebar;

import React, { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Building2, Users, GraduationCap, 
  BriefcaseBusiness, UserCircle, UploadCloud, Search, 
  FileText, Rocket, ClipboardCheck, MessageSquare, LogOut 
} from "lucide-react";

// memo prevents the entire sidebar from re-rendering 
// unless the 'role' actually changes.
const Sidebar = memo(() => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // Use navigate for SPA speed, or window.location for a clean state
    navigate("/login");
  };

  // Optimization: We move the logic into a template string to avoid 
  // complex function calls during the render phase.
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
      isActive
        ? "bg-blue-600/10 text-blue-400 border-l-4 border-blue-500 font-medium"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
    }`;

  return (
    <aside className="w-64 bg-[#0f172a] text-white h-screen flex flex-col sticky top-0 border-r border-slate-800 shadow-xl will-change-transform">
      
      {/* Brand Header - Simplified for faster paint */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Rocket size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
              Portal<span className="text-blue-500">.</span>
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              {role?.split('_').join(' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Uses a native scrollbar for performance */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-slate-800">
        <ul className="space-y-1">

          {role === "PLACEMENT_COORDINATOR" && (
            <>
              <NavItem to="/admin" label="Dashboard" icon={<LayoutDashboard size={18} />} className={linkClass} />
              <NavItem to="/admin/departments" label="Departments" icon={<Building2 size={18} />} className={linkClass} />
              <NavItem to="/admin/users" label="Users" icon={<Users size={18} />} className={linkClass} />
              <NavItem to="/admin/coordinators" label="Coordinators" icon={<GraduationCap size={18} />} className={linkClass} />
              <NavItem to="/admin/drives" label="Drives" icon={<BriefcaseBusiness size={18} />} className={linkClass} />
              <NavItem to="/admin/students" label="Students" icon={<UserCircle size={18} />} className={linkClass} />
              <NavItem to="/admin/bulk-upload" label="Bulk Upload" icon={<UploadCloud size={18} />} className={linkClass} />
              <NavItem to="/admin/student-reports" label="Reports" icon={<FileText size={18} />} className={linkClass} />
            </>
          )}

          {role === "DEPT_COORDINATOR" && (
            <>
              <NavItem to="/coordinator/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} className={linkClass} />
              <NavItem to="/coordinator/students" label="Students" icon={<Users size={18} />} className={linkClass} />
              <NavItem to="/coordinator/upload" label="Upload" icon={<UploadCloud size={18} />} className={linkClass} />
              <NavItem to="/coordinator/filter" label="Filter" icon={<Search size={18} />} className={linkClass} />
              <NavItem to="/coordinator/drive-applications" label="Applications" icon={<FileText size={18} />} className={linkClass} />
              <NavItem to="/coordinator/reports" label="Reports" icon={<BriefcaseBusiness size={18} />} className={linkClass} />
            </>
          )}

          {role === "STUDENT" && (
            <>
              <NavItem to="/student/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} className={linkClass} />
              <NavItem to="/student/profile" label="Profile" icon={<UserCircle size={18} />} className={linkClass} />
              <NavItem to="/student/drives" label="Drives" icon={<Rocket size={18} />} className={linkClass} />
              <NavItem to="/student/applications" label="Status" icon={<ClipboardCheck size={18} />} className={linkClass} />
              <NavItem to="/student/feedback" label="Feedback" icon={<MessageSquare size={18} />} className={linkClass} />
            </>
          )}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors rounded-xl"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
});

// Memoize individual items so they don't update unless their 'to' or 'active' state changes
const NavItem = memo(({ to, label, icon, className }) => (
  <li>
    <NavLink to={to} className={className} end={to === "/admin" || to === "/student/dashboard"}>
      <span className="shrink-0">{icon}</span>
      <span className="text-sm truncate">{label}</span>
    </NavLink>
  </li>
));

export default Sidebar;