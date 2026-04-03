// import { useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   const logout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     navigate("/");
//   };

//   return (

//     <div className="bg-white shadow px-6 py-4 flex justify-between">

//       <h1 className="font-semibold text-lg">
//         Placement Management System
//       </h1>

//       <button
//         onClick={logout}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//     </div>

//   );

// }

// export default Navbar;

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Branding Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-slate-900 font-bold text-xl tracking-tight">
              Placement<span className="text-indigo-600">Pro</span>
            </h1>
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;