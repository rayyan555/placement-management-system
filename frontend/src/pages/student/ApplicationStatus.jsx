

import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/driveStatusService";
import { Clock, Building2, Briefcase, ChevronRight, RotateCcw } from "lucide-react";

function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const studentId = localStorage.getItem("userId");
  const studentId = localStorage.getItem("studentProfileId");

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(() => {
      fetchApplications(true); // silent refresh
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const fetchApplications = async (silent = false) => {
  if (!silent) setLoading(true);
  setIsRefreshing(true);

  try {
    const res = await getStudentApplications(studentId); // ✅ // ✅ FIX
    setApplications(res.data);
  } catch (error) {
    console.error("Error fetching applications");
  } finally {
    setLoading(false);
    setTimeout(() => setIsRefreshing(false), 1000);
  }
};

  const getStatusStyle = (status) => {
    const base = "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border";
    switch (status) {
      case "APPLIED":
        return `${base} bg-blue-500/10 text-blue-500 border-blue-500/20`;
      case "SHORTLISTED":
        return `${base} bg-amber-500/10 text-amber-500 border-amber-500/20`;
      case "SELECTED":
        return `${base} bg-emerald-500/10 text-emerald-500 border-emerald-500/20`;
      case "REJECTED":
        return `${base} bg-rose-500/10 text-rose-500 border-rose-500/20`;
      default:
        return `${base} bg-slate-500/10 text-slate-500 border-slate-500/20`;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            My Applications
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Track your progress with various companies in real-time.
          </p>
        </div>
        
        {/* Refresh Indicator */}
        <div className={`flex items-center gap-2 text-xs font-medium transition-opacity duration-300 ${isRefreshing ? "opacity-100" : "opacity-0"}`}>
          <RotateCcw size={14} className="animate-spin text-blue-600" />
          <span className="text-slate-400">Updating...</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="inline-block animate-pulse text-slate-300">
              <Clock size={48} />
            </div>
            <p className="mt-4 text-slate-400 font-medium">Loading your applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-20 text-center">
            <div className="inline-block text-slate-200 mb-4">
              <Briefcase size={64} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No applications yet</h3>
            <p className="text-slate-500 text-sm">Start applying to companies to see them here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Details</th>
                  <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Current Status</th>
                  <th className="p-5 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{app.drive.companyName}</p>
                          <p className="text-xs text-slate-400">Applied recently</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Briefcase size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">{app.drive.role}</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className={getStatusStyle(app.status)}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <p className="mt-6 text-center text-xs text-slate-400">
        Status updates are automated. Contact your coordinator if you notice discrepancies.
      </p>
    </div>
  );
}

export default ApplicationStatus;