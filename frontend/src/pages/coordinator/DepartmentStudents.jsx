

import { useEffect, useState } from "react";
import { Search, Edit3, CheckCircle, X, User, GraduationCap, DollarSign, Briefcase } from "lucide-react";
import { getDepartmentStudents, updateStudent } from "../../services/departmentCoordinatorService";
import { addPlacement } from "../../services/placementService";

function DepartmentStudents() {
  const coordinatorId = localStorage.getItem("userId");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [placementStudent, setPlacementStudent] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [packageOffered, setPackageOffered] = useState("");

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = () => {
    getDepartmentStudents(coordinatorId)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  const handleUpdate = () => {
    updateStudent(selectedStudent.id, selectedStudent)
      .then(() => {
        alert("Student updated successfully");
        setSelectedStudent(null);
        loadStudents();
      }).catch((err) => console.error(err));
  };

  const handlePlacementSubmit = async () => {
    try {
      await addPlacement(placementStudent.id, companyName, packageOffered);
      alert("Placement recorded successfully");
      setPlacementStudent(null); setCompanyName(""); setPackageOffered("");
      loadStudents();
    } catch (error) { alert("Failed to record placement"); }
  };

  const filteredStudents = students.filter((s) => 
    s.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.registerNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Student Directory</h1>
            <p className="text-slate-500 font-medium">Manage and track department student placements</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full md:w-80 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-8">Student Info</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Academic Stats</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Backlogs</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        {student.user?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-none">{student.user?.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{student.registerNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-300 uppercase">CGPA</p>
                        <p className="text-sm font-bold text-slate-700">{student.cgpa}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-300 uppercase">10th %</p>
                        <p className="text-sm font-bold text-slate-700">{student.tenthPercentage}%</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`text-sm font-bold ${student.backlogs > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                      {student.backlogs ?? 0}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                      student.overallStatus === "PLACED" 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>
                      {student.overallStatus}
                    </span>
                  </td>
                  <td className="p-5 pr-8">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Edit Student"
                      >
                        <Edit3 size={18} />
                      </button>
                      {student.overallStatus !== "PLACED" && (
                        <button 
                          onClick={() => setPlacementStudent(student)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-emerald-200"
                        >
                          <CheckCircle size={14} /> Mark Placed
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODERN MODAL WRAPPER */}
      {(selectedStudent || placementStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* EDIT MODAL */}
            {selectedStudent && (
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Update Student</h3>
                  <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100 mb-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm"><User size={20}/></div>
                    <div><p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Student Name</p><p className="font-bold text-slate-700">{selectedStudent.user?.name}</p></div>
                  </div>
                  {[
                    { label: "Current CGPA", name: "cgpa", icon: GraduationCap },
                    { label: "10th Percentage", name: "tenthPercentage", icon: GraduationCap },
                    { label: "12th Percentage", name: "twelfthPercentage", icon: GraduationCap },
                    { label: "Active Backlogs", name: "backlogs", icon: Briefcase },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 mb-1 block">{field.label}</label>
                      <div className="relative">
                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                          type="number"
                          step="0.01"
                          value={selectedStudent[field.name] ?? ""}
                          onChange={(e) => setSelectedStudent({...selectedStudent, [field.name]: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={handleUpdate} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl mt-4 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* PLACEMENT MODAL */}
            {placementStudent && (
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Record Placement</h3>
                  <button onClick={() => setPlacementStudent(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                </div>
                <p className="text-slate-500 mb-6 font-medium">Recording placement for <span className="text-indigo-600 font-bold">{placementStudent.user?.name}</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Hiring Company</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input
                        type="text"
                        placeholder="e.g. Google, Microsoft"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Package (LPA)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input
                        type="number"
                        placeholder="e.g. 12.5"
                        value={packageOffered}
                        onChange={(e) => setPackageOffered(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700"
                      />
                    </div>
                  </div>
                  <button onClick={handlePlacementSubmit} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl mt-4 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]">
                    Confirm Selection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentStudents;