
import { useEffect, useState } from "react";
import { 
  UserPlus, 
  Users as UsersIcon, 
  Mail, 
  ShieldCheck, 
  Search, 
  Filter,
  GraduationCap,
  Briefcase
} from "lucide-react"; // npm install lucide-react

import { getUsers, createUser } from "../../services/userService";
import { getDepartments } from "../../services/departmentService";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res || []);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "STUDENT" && !departmentId) {
        alert("Please select department");
        return;
      }

      const newUser = await createUser({
        name,
        email,
        password,
        role,
        departmentId: role === "STUDENT" ? departmentId : null
      });

      setUsers((prev) => [newUser, ...prev]);
      alert("User created successfully");

      setName("");
      setEmail("");
      setPassword("");
      setRole("STUDENT");
      setDepartmentId("");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900">
      {/* PAGE HEADER */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <UsersIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
              <p className="text-sm text-slate-500">Add and manage student and coordinator accounts.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CREATE FORM CARD */}
          <section className="lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden sticky top-8">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <UserPlus size={16} /> Create New Account
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                  <input
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Temporary Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Access Role</label>
                    <select
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                      value={role}
                      onChange={(e)=>setRole(e.target.value)}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="DEPT_COORDINATOR">Coordinator</option>
                    </select>
                  </div>
                  {role === "STUDENT" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                      <select
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={departmentId}
                        onChange={(e)=>setDepartmentId(e.target.value)}
                        required
                      >
                        <option value="">Select...</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors mt-2 shadow-sm">
                  Register User
                </button>
              </form>
            </div>
          </section>

          {/* USERS LIST TABLE */}
          <section className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User Info</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Access Role</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">System ID</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Mail size={12} /> {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {user.role === "STUDENT" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                              <GraduationCap size={14} /> Student
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
                              <Briefcase size={14} /> Coordinator
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-slate-400">
                          #{user.id}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                          <span className="text-xs font-medium text-slate-600 uppercase tracking-tighter">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  <p className="text-sm italic">No users found matching your criteria.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Users;