


import { useState } from "react";
import { 
  FileSpreadsheet, 
  Users, 
  Briefcase, 
  Download, 
  ChevronRight, 
  Info 
} from "lucide-react";
import {
  downloadStudentReport,
  downloadPlacementReport,
} from "../../services/departmentCoordinatorService";

function DepartmentReports() {
  const coordinatorId = localStorage.getItem("userId");
  const [loading, setLoading] = useState({ students: false, placements: false });

  const downloadFile = async (apiCall, filename, type) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    try {
      const res = await apiCall(coordinatorId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Report download failed", error);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FileSpreadsheet className="text-indigo-600" size={32} />
            Report Center
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Generate and export department-wide data for administrative review and documentation.
          </p>
        </div>

        {/* REPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* STUDENT REPORT CARD */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Student Directory</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Export a comprehensive list of all students including CGPA, backlogs, and academic percentages in .xlsx format.
            </p>
            <button
              onClick={() => downloadFile(downloadStudentReport, "students_report.xlsx", "students")}
              disabled={loading.students}
              className="w-full flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                {loading.students ? <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <Download size={18} />}
                <span>{loading.students ? "Generating..." : "Download Excel"}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* PLACEMENT REPORT CARD */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Placement Summary</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Detailed report of placed students, hiring companies, and package distributions for the current academic year.
            </p>
            <button
              onClick={() => downloadFile(downloadPlacementReport, "placements_report.xlsx", "placements")}
              disabled={loading.placements}
              className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                {loading.placements ? <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <Download size={18} />}
                <span>{loading.placements ? "Generating..." : "Download Excel"}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

        {/* INFO FOOTER */}
        <div className="mt-12 bg-indigo-50/50 border border-indigo-100 p-6 rounded-2xl flex gap-4">
          <div className="text-indigo-600 shrink-0">
            <Info size={20} />
          </div>
          <div className="text-sm text-indigo-900/70 leading-relaxed">
            <b>Note:</b> These reports are generated in real-time. Large datasets may take a few seconds to compile. Please do not refresh the page while the download is in progress.
          </div>
        </div>

      </div>
    </div>
  );
}

export default DepartmentReports;