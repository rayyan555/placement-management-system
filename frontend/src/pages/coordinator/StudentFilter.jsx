

import { useState } from "react";
import { 
  Filter, 
  Download, 
  Search, 
  GraduationCap, 
  Award, 
  FileText, 
  AlertCircle, 
  Calendar 
} from "lucide-react";
import { filterStudents } from "../../services/departmentCoordinatorService";

function StudentFilter() {
  const coordinatorId = localStorage.getItem("userId");

  const [filters, setFilters] = useState({
    cgpa: "",
    tenth: "",
    twelfth: "",
    backlogs: "",
    batch: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    const params = {
      coordinatorId,
      ...filters,
    };

    filterStudents(params)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Register No",
      "CGPA",
      "10th %",
      "12th %",
      "Backlogs",
      "Batch"
    ];

    const rows = students.map(s => [
      s.user?.name,
      s.registerNo,
      s.cgpa,
      s.tenthPercentage,
      s.twelfthPercentage,
      s.backlogs ?? 0,
      s.batchYear
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,"
      + [headers, ...rows]
          .map(e => e.join(","))
          .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "filtered_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Filter className="text-indigo-600" size={28} />
            Smart Eligibility Filter
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Define criteria to shortlist students for upcoming placement drives.
          </p>
        </div>

        {/* FILTER PANEL */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Min CGPA</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  name="cgpa"
                  type="number"
                  placeholder="e.g. 7.5"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Min 10th %</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  name="tenth"
                  type="number"
                  placeholder="e.g. 80"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Min 12th %</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  name="twelfth"
                  type="number"
                  placeholder="e.g. 80"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Max Backlogs</label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  name="backlogs"
                  type="number"
                  placeholder="e.g. 0"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Batch Year</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  name="batch"
                  type="number"
                  placeholder="e.g. 2024"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <p className="text-slate-400 text-sm italic">
              {students.length > 0 ? `Found ${students.length} eligible candidates` : "No results to display"}
            </p>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={handleFilter}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                <Search size={18} /> Apply Criteria
              </button>

              {students.length > 0 && (
                <button
                  onClick={downloadCSV}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-8 py-3 rounded-2xl font-bold hover:bg-emerald-100 transition-all active:scale-95"
                >
                  <Download size={18} /> Export CSV
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS TABLE */}
        {students.length > 0 && (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-10">Candidate</th>
                    <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Register No</th>
                    <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">CGPA</th>
                    <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Academic %</th>
                    <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Backlogs</th>
                    <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center pr-10">Batch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5 pl-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                            {student.user?.name?.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-700">{student.user?.name}</span>
                        </div>
                      </td>
                      <td className="p-5 text-center text-sm font-medium text-slate-500 font-mono">
                        {student.registerNo}
                      </td>
                      <td className="p-5 text-center">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold text-sm">
                          {student.cgpa}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">10: {student.tenthPercentage}%</span>
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">12: {student.twelfthPercentage}%</span>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <span className={`text-sm font-bold ${student.backlogs > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                          {student.backlogs ?? 0}
                        </span>
                      </td>
                      <td className="p-5 text-center pr-10">
                        <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                          {student.batchYear}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {students.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-300">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <GraduationCap size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No candidates matched</h3>
            <p className="text-slate-400 mt-2">Try adjusting the filter criteria above to see results.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentFilter;