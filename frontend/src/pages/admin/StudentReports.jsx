


import api from "../../api/axios";
import { 
  FileText, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Download, 
  BarChart3,
  ChevronRight
} from "lucide-react"; // npm install lucide-react

function StudentReports() {

  const downloadFile = async (url, filename) => {
    try {
      const response = await api.get(url, {
        responseType: "blob"
      });
      const file = new Blob([response.data]);
      const fileURL = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const reports = [
    {
      title: "Students Report",
      description: "Complete student profiles including CGPA, department metrics, and placement status.",
      icon: <Users className="text-blue-600" size={24} />,
      color: "bg-blue-50",
      borderColor: "hover:border-blue-400",
      action: () => downloadFile("/coordinators/reports/students", "students_report.xlsx"),
      stats: "Academic focus"
    },
    {
      title: "Placement Report",
      description: "Comprehensive data on placed students, average packages, and total selections.",
      icon: <BarChart3 className="text-emerald-600" size={24} />,
      color: "bg-emerald-50",
      borderColor: "hover:border-emerald-400",
      action: () => downloadFile("/coordinators/reports/placements", "placements_report.xlsx"),
      stats: "Success metrics"
    },
    {
      title: "Company Drives Report",
      description: "Historical data of all recruitment drives, package offerings, and eligibility criteria.",
      icon: <Briefcase className="text-purple-600" size={24} />,
      color: "bg-purple-50",
      borderColor: "hover:border-purple-400",
      action: () => downloadFile("/coordinators/reports/drives", "drives_report.xlsx"),
      stats: "Corporate data"
    },
    {
      title: "Interview Feedback Report",
      description: "Qualitative data from student interview experiences and company-wise feedback.",
      icon: <MessageSquare className="text-orange-600" size={24} />,
      color: "bg-orange-50",
      borderColor: "hover:border-orange-400",
      action: () => downloadFile("/coordinators/reports/feedback", "feedback_report.xlsx"),
      stats: "Student insights"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100 text-white">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
              <p className="text-slate-500 font-medium">Generate and export Excel reports for your department.</p>
            </div>
          </div>
          
          <div className="hidden md:block px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest">
            Export Format: .XLSX
          </div>
        </div>

        {/* REPORTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <div 
              key={index}
              className={`group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 ${report.borderColor}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${report.color} transition-transform group-hover:scale-110 duration-300`}>
                  {report.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  {report.stats}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-3">{report.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[48px]">
                {report.description}
              </p>

              <button
                onClick={report.action}
                className="w-full flex items-center justify-between bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <Download size={18} />
                  Download Report
                </span>
                <ChevronRight size={18} className="opacity-50" />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-xs flex items-center justify-center gap-2 italic">
             All reports are generated in real-time based on the latest database records.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentReports;