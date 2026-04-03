import { useEffect, useState } from "react";
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Building2, 
  Sparkles
} from "lucide-react";
import { getDashboardSummary } from "../../services/studentService";

function StudentDashboard() {
  const [summary, setSummary] = useState(null);
  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardSummary(studentId);
      setSummary(res.data);
    } catch (error) {
      console.error("Error loading dashboard", error.response?.data || error.message);
    }
  };

  if (!summary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Syncing your career data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* --- WELCOME HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {summary.studentName || "Student"} 
            </h1>
            <Sparkles className="text-yellow-400 fill-yellow-400" size={24} />
          </div>
          <p className="text-slate-500 font-medium">
            Here's your professional placement overview.
          </p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">System Online</span>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-1.5 rounded-3xl shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
          <div className="bg-blue-50 rounded-2xl p-6 flex justify-between items-start">
            <div>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-1">Applied Drives</p>
              <h3 className="text-4xl font-black text-slate-800">{summary.appliedCount}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
              <Briefcase size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white p-1.5 rounded-3xl shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
          <div className="bg-amber-50 rounded-2xl p-6 flex justify-between items-start">
            <div>
              <p className="text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-1">Shortlisted</p>
              <h3 className="text-4xl font-black text-slate-800">{summary.shortlistedCount}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm text-amber-600">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white p-1.5 rounded-3xl shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
          <div className="bg-emerald-50 rounded-2xl p-6 flex justify-between items-start">
            <div>
              <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-1">Selected</p>
              <h3 className="text-4xl font-black text-slate-800">{summary.selectedCount}</h3>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- PLACEMENT STATUS --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-500" />
                Placement Status
              </h2>
            </div>
            <div className="p-8">
              {summary.placementDetails ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md uppercase tracking-wider">Offer Secured</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-3">{summary.placementDetails.company}</h3>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-lg">₹</div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Package Offered</p>
                        <p className="font-extrabold text-slate-800">{summary.placementDetails.packageOffered} LPA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Calendar size={18}/></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Placement Date</p>
                        <p className="font-extrabold text-slate-800">{summary.placementDetails.placementDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <Clock size={40} />
                  </div>
                  <p className="text-slate-400 font-semibold italic">Not placed yet.</p>
                  <p className="text-slate-400 text-sm mt-1">Keep pushing forward! 🚀</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- UPCOMING INTERVIEWS --- */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar size={18} className="text-blue-500" />
                Upcoming Interviews
              </h2>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {summary.upcomingInterviews?.length || 0} Total
              </span>
            </div>
            
            <div className="p-0">
              {!summary.upcomingInterviews || summary.upcomingInterviews.length === 0 ? (
                <div className="p-20 text-center">
                  <p className="text-slate-300 font-medium italic">No scheduled interviews found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-10">Company / Role</th>
                        <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                        <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8 pr-10">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {summary.upcomingInterviews.map((interview, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="p-5 pl-10">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Building2 size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 leading-tight">{interview.companyName}</p>
                                <p className="text-xs font-medium text-slate-400 mt-1">{interview.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-5">
                            <span className="text-sm font-bold text-slate-700">{interview.interviewDate}</span>
                          </td>
                          <td className="p-5 pl-8 pr-10">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                              <MapPin size={14} className="text-slate-300" />
                              {interview.location}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;