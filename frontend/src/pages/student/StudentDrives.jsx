


import { useEffect, useState } from "react";
import {
  getDrives,
  applyForDrive,
  getAppliedDrives
} from "../../services/studentService";
import { Briefcase, ExternalLink, CheckCircle2, IndianRupee, Globe, Info, Zap } from "lucide-react";

function StudentDrives() {
  const [drives, setDrives] = useState([]);
  const [appliedDrives, setAppliedDrives] = useState([]);

  useEffect(() => {
    fetchDrives();
    fetchAppliedDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await getDrives();
      setDrives(res.data);
    } catch (error) {
      console.error("Error fetching drives", error);
    }
  };

  const fetchAppliedDrives = async () => {
    try {
      const res = await getAppliedDrives();
      const appliedIds = res.data.map((app) => {
        return app.drive ? app.drive.id : null;
      }).filter(id => id !== null);
      setAppliedDrives(appliedIds);
    } catch (error) {
      console.error("Error fetching applied drives", error);
    }
  };

  const handleOpenLink = (link) => {
    window.open(link, "_blank");
  };

  const handleMarkApplied = async (driveId) => {
    try {
      await applyForDrive(driveId);
      alert("Application submitted successfully!");
      setAppliedDrives((prev) => [...prev, driveId]);
    } catch (error) {
      alert("Already applied or error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Placement Drives
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Active opportunities for your career growth.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
          <Zap size={16} fill="currentColor" />
          {drives.length} Drives Available
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drives.map((drive) => {
          const isApplied = appliedDrives.includes(drive.id);

          return (
            <div
              key={drive.id}
              className="group flex flex-col bg-[#111827] border border-slate-800 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Header: Icon & Applied Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                {isApplied && (
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 size={12} /> Applied
                  </span>
                )}
              </div>

              {/* Body: Company & Role */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {drive.companyName}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[11px] font-bold rounded uppercase tracking-tighter border border-slate-700">
                    Role
                  </span>
                  <p className="text-slate-300 font-medium text-sm">
                    {drive.role}
                  </p>
                </div>
              </div>

              {/* Package Details Section */}
              <div className="bg-slate-800/50 rounded-2xl p-5 mb-8 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <IndianRupee size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Annual Package</p>
                      <p className="text-xl font-black text-white">
                        {drive.packageOffered} <span className="text-sm font-normal text-slate-400 ml-1 font-sans">LPA</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                {drive.applicationLink && (
                  <button
                    onClick={() => handleOpenLink(drive.applicationLink)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    <Globe size={18} />
                    Apply on Website
                    <ExternalLink size={14} className="opacity-40" />
                  </button>
                )}

                {isApplied ? (
                  <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">
                    <CheckCircle2 size={18} />
                    Registration Successful
                  </div>
                ) : (
                  <button
                    onClick={() => handleMarkApplied(drive.id)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                  >
                    Mark as Applied
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {drives.length === 0 && (
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Info size={40} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Quiet for now...</h3>
          <p className="text-slate-500 mt-2">We'll notify you as soon as new company drives are posted.</p>
        </div>
      )}
    </div>
  );
}

export default StudentDrives;