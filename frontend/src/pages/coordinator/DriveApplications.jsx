

import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, User, Building2, Hash, RefreshCcw, CheckCircle2 } from "lucide-react";

function DriveApplications() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/drive-status/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
      setFilteredApps(res.data);
    } catch (error) {
      console.error("Error fetching applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;
    if (search) {
      filtered = filtered.filter((app) =>
        app.drive.companyName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }
    setFilteredApps(filtered);
  }, [search, statusFilter, applications]);

  const updateStatus = async (studentId, driveId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/drive-status/update?studentId=${studentId}&driveId=${driveId}&status=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();
    } catch (error) {
      console.error("Error updating status");
    }
  };

  const getBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border";
    switch (status) {
      case "APPLIED":
        return <span className={`${base} bg-blue-50 text-blue-600 border-blue-100`}>Applied</span>;
      case "SHORTLISTED":
        return <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}>Shortlisted</span>;
      case "SELECTED":
        return <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}>Selected</span>;
      case "REJECTED":
        return <span className={`${base} bg-rose-50 text-rose-600 border-rose-100`}>Rejected</span>;
      default:
        return <span className={`${base} bg-slate-50 text-slate-600 border-slate-100`}>Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Drive Applications
            </h1>
            <p className="text-slate-500 font-medium">Manage student progress across active recruitment drives.</p>
          </div>
          <button 
            onClick={fetchApplications}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Company Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-600 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="SELECTED">Selected</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* --- TABLE CARD --- */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-10">
                    <div className="flex items-center gap-2"><User size={14}/> Student Info</div>
                  </th>
                  <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><Hash size={14}/> Roll No</div>
                  </th>
                  <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><Building2 size={14}/> Company</div>
                  </th>
                  <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center pr-10">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-5 pl-10">
                        <p className="font-bold text-slate-800 leading-tight">
                          {app.student?.name || app.student?.user?.name || "N/A"}
                        </p>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                          {app.student?.registerNo || "N/A"}
                        </span>
                      </td>
                      <td className="p-5">
                        <p className="text-sm font-bold text-slate-700">{app.drive.companyName}</p>
                      </td>
                      <td className="p-5 text-center">
                        {getBadge(app.status)}
                      </td>
                      <td className="p-5 text-center pr-10">
                        <div className="inline-block relative">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateStatus(app.student.id, app.drive.id, e.target.value)
                            }
                            className={`text-xs font-bold py-1.5 px-3 rounded-xl border appearance-none transition-all cursor-pointer focus:ring-2 outline-none
                              ${app.status === 'SELECTED' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-slate-200 text-slate-600 bg-white hover:border-indigo-300'}
                            `}
                          >
                            <option value="APPLIED">Applied</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="SELECTED">Selected</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                          <Search size={32} />
                        </div>
                        <p className="text-slate-400 font-semibold italic">No matching applications found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER STATS --- */}
        <div className="mt-6 flex justify-end">
          <div className="bg-indigo-600 text-white px-6 py-2 rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-3">
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold">Total Applications: {filteredApps.length}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DriveApplications;