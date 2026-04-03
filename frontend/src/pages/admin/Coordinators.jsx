import { useEffect, useState } from "react";
import { 
  UserCog, 
  Link as LinkIcon, 
  UserMinus, 
  Mail, 
  Building2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

import {
  getCoordinators,
  assignCoordinator,
  removeCoordinator
} from "../../services/coordinatorService";

import { getDepartments } from "../../services/departmentService";

function Coordinators() {
  const [coordinators, setCoordinators] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const fetchCoordinators = async () => {
    const data = await getCoordinators();
    setCoordinators(data || []);
  };

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data || []);
  };

  useEffect(() => {
    fetchCoordinators();
    fetchDepartments();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    const alreadyAssigned = coordinators.find(
      (c) => c.department && c.department.id == selectedDepartment
    );

    if (alreadyAssigned) {
      alert("This department already has a coordinator");
      return;
    }

    await assignCoordinator(selectedUser, selectedDepartment);
    setSelectedUser("");
    setSelectedDepartment("");
    fetchCoordinators();
  };

  const handleRemove = async (id) => {
    if (window.confirm("Remove this coordinator from their department?")) {
      await removeCoordinator(id);
      fetchCoordinators();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <UserCog size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Department Coordinators</h1>
              <p className="text-sm text-slate-500">Link staff members to specific academic departments.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ASSIGNMENT FORM CARD */}
          <section className="lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden sticky top-8">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <LinkIcon size={16} /> Assign Coordinator
                </h2>
              </div>
              <form onSubmit={handleAssign} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Staff Member</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                  >
                    <option value="">Choose a coordinator...</option>
                    {coordinators.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Assign to Department</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    required
                  >
                    <option value="">Choose a department...</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm active:scale-[0.98]">
                  Confirm Assignment
                </button>
              </form>
            </div>
          </section>

          {/* TABLE SECTION */}
          <section className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Coordinator Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Department</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coordinators.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-xs border border-slate-200">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <Mail size={12} /> {c.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {c.department ? (
                          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit border border-emerald-100">
                            <CheckCircle2 size={14} />
                            <span className="text-xs font-semibold">{c.department.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-100">
                            <AlertCircle size={14} />
                            <span className="text-xs font-semibold">Unassigned</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {c.department && (
                          <button
                            onClick={() => handleRemove(c.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100"
                          >
                            <UserMinus size={14} />
                            Unlink
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {coordinators.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  <Building2 size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No coordinators found in the system.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Coordinators;