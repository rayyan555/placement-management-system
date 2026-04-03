import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, Eye, EyeOff, Briefcase } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUser({ email, password });


    console.log("LOGIN RESPONSE:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("studentProfileId", data.studentProfileId); // ✅ ADD THIS

      const role = data.role;

      if (role.includes("PLACEMENT_COORDINATOR")) navigate("/admin");
      else if (role.includes("DEPT_COORDINATOR")) navigate("/coordinator");
      else if (role.includes("STUDENT")) navigate("/student");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased">
      {/* Left Side: Branding / Visual (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-700 items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600 rounded-full opacity-50 blur-3xl"></div>
        <div className="z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-xl">
              <Briefcase className="text-indigo-700" size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">CareerGate</h1>
          </div>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Connecting Talent <br />with Opportunity.
          </h2>
          <p className="text-indigo-100 text-lg leading-relaxed">
            The official portal for campus recruitment, scheduling, and career development.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden flex flex-col items-center">
             <Briefcase className="text-indigo-600 mb-2" size={40} />
             <h1 className="text-2xl font-bold text-slate-900">CareerGate</h1>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-500">Enter your university credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">University Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="john.doe@university.edu"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Branding */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs">© 2026 University Placement Cell</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 font-medium">Privacy Policy</a>
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 font-medium">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;