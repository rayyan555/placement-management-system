

import { useState } from "react";
import api from "../../api/axios";
import { 
  Search, 
  Download, 
  Filter, 
  GraduationCap, 
  Users, 
  FileSpreadsheet, 
  ChevronRight,
  AlertCircle
} from "lucide-react"; // npm install lucide-react

function Students() {
  const [filters, setFilters] = useState({
    department: "",
    cgpa: "",
    tenth: "",
    twelfth: "",
    backlogs: "",
    batch: ""
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.department) params.department = filters.department;
      if (filters.cgpa) params.cgpa = Number(filters.cgpa);
      if (filters.tenth) params.tenth = Number(filters.tenth);
      if (filters.twelfth) params.twelfth = Number(filters.twelfth);
      if (filters.backlogs) params.backlogs = Number(filters.backlogs);
      if (filters.batch) params.batch = Number(filters.batch);

      const response = await api.get("/coordinators/students/filter", { params });
      setStudents(response.data);
    } catch (error) {
      console.error("Filter error:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ["ID", "Register No", "Name", "Department", "CGPA", "10th %", "12th %", "Backlogs"];
    const rows = students.map((s) => [
      s.id,
      s.registerNo,
      s.user?.name,
      s.department?.name,
      s.cgpa,
      s.tenthPercentage,
      s.twelfthPercentage,
      s.backlogs ?? 0
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Students_Batch_${filters.batch || 'All'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
              <p className="text-sm text-slate-500">Filter and export student eligibility lists</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Searching..." : <><Search size={18} /> Search</>}
            </button>
            {students.length > 0 && (
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 bg-white text-emerald-600 border border-emerald-200 px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-sm"
              >
                <Download size={18} /> Export CSV
              </button>
            )}
          </div>
        </div>

        {/* FILTERS CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold text-sm uppercase tracking-wider">
            <Filter size={16} className="text-indigo-500" />
            Eligibility Filters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <FilterInput name="department" placeholder="Department" icon={<GraduationCap size={16}/>} onChange={handleChange} />
            <FilterInput name="cgpa" placeholder="Min CGPA" type="number" onChange={handleChange} />
            <FilterInput name="tenth" placeholder="10th %" type="number" onChange={handleChange} />
            <FilterInput name="twelfth" placeholder="12th %" type="number" onChange={handleChange} />
            <FilterInput name="backlogs" placeholder="Max Backlogs" type="number" onChange={handleChange} />
            <FilterInput name="batch" placeholder="Batch Year" type="number" onChange={handleChange} />
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Student Info</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">CGPA</th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Academics (10/12)</th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Backlogs</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <FileSpreadsheet size={48} className="mb-3 opacity-20" />
                        <p className="text-lg font-medium">No results to display</p>
                        <p className="text-sm">Adjust your filters and click search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                            {s.user?.name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{s.user?.name}</div>
                            <div className="text-xs text-slate-500 font-mono">{s.registerNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-600">{s.department?.name}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                          {s.cgpa}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-xs text-slate-600 font-medium">{s.tenthPercentage}% / {s.twelfthPercentage}%</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-bold ${s.backlogs > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {s.backlogs ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-slate-300 group-hover:text-indigo-500 transition-colors">
                            <ChevronRight size={20} />
                         </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {students.length > 0 && (
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 font-medium uppercase tracking-tight">
              Showing {students.length} students matching criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Sub-component for clean code
const FilterInput = ({ name, placeholder, type = "text", icon, onChange }) => (
  <div className="relative group">
    {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">{icon}</div>}
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full bg-slate-50 border border-slate-200 ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400`}
      onChange={onChange}
    />
  </div>
);

export default Students;