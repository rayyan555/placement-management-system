import { useEffect, useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  Plus, 
  GraduationCap, 
  BadgeCheck, 
  X 
} from "lucide-react";

import {
  getDrives,
  createDrive,
  deleteDrive,
  updateDrive
} from "../../services/driveService";

function CompanyDrives() {
  const [drives, setDrives] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [packageOffered, setPackageOffered] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("UPCOMING");
  const [interviewDate, setInterviewDate] = useState("");
  const [minCgpa, setMinCgpa] = useState("");
  const [minTenth, setMinTenth] = useState("");
  const [minTwelfth, setMinTwelfth] = useState("");
  const [maxBacklogs, setMaxBacklogs] = useState("");
  const [applicationLink, setApplicationLink] = useState("");

  const fetchDrives = async () => {
    const data = await getDrives();
    setDrives(data || []);
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const resetForm = () => {
    setCompanyName("");
    setRole("");
    setPackageOffered("");
    setLocation("");
    setInterviewDate("");
    setMinCgpa("");
    setMinTenth("");
    setMinTwelfth("");
    setMaxBacklogs("");
    setApplicationLink("");
    setStatus("UPCOMING");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const driveData = {
      companyName,
      role,
      packageOffered: parseFloat(packageOffered),
      location,
      status,
      interviewDate,
      minCgpa: parseFloat(minCgpa),
      minTenth: parseFloat(minTenth),
      minTwelfth: parseFloat(minTwelfth),
      maxBacklogs: parseInt(maxBacklogs),
      applicationLink
    };

    if (editingId) {
      await updateDrive(editingId, driveData);
    } else {
      await createDrive(driveData);
    }
    resetForm();
    fetchDrives();
  };

  const handleEdit = (drive) => {
    setEditingId(drive.id);
    setCompanyName(drive.companyName);
    setRole(drive.role);
    setPackageOffered(drive.packageOffered);
    setLocation(drive.location);
    setInterviewDate(drive.interviewDate);
    setStatus(drive.status);
    setMinCgpa(drive.minCgpa);
    setMinTenth(drive.minTenth);
    setMinTwelfth(drive.minTwelfth);
    setMaxBacklogs(drive.maxBacklogs);
    setApplicationLink(drive.applicationLink || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (s) => {
    switch (s) {
      case "UPCOMING": return "bg-blue-50 text-blue-700 border-blue-100";
      case "ONGOING": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "COMPLETED": return "bg-slate-100 text-slate-600 border-slate-200";
      case "CANCELLED": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Placement Drives</h1>
            <p className="text-slate-500 mt-1">Schedule and manage upcoming recruitment events.</p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              {editingId ? <Pencil size={16} className="text-amber-500" /> : <Plus size={16} className="text-indigo-600" />}
              {editingId ? "Edit Placement Drive" : "Create New Drive"}
            </h2>
            {editingId && (
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* General Info Section */}
              <div className="md:col-span-3">
                <h3 className="text-xs font-bold text-indigo-600 uppercase mb-4 flex items-center gap-2">
                  <Briefcase size={14} /> General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input className="input-style" placeholder="Company Name" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required />
                  <input className="input-style" placeholder="Role (e.g. SDE-1)" value={role} onChange={(e)=>setRole(e.target.value)} required />
                  <input className="input-style" type="number" step="0.1" placeholder="Package (LPA)" value={packageOffered} onChange={(e)=>setPackageOffered(e.target.value)} required />
                  <input className="input-style" placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} required />
                  <input className="input-style" type="date" value={interviewDate} onChange={(e)=>setInterviewDate(e.target.value)} />
                  <select className="input-style" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Eligibility Section */}
              <div className="md:col-span-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-amber-600 uppercase mb-4 flex items-center gap-2">
                  <GraduationCap size={14} /> Eligibility Criteria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input className="input-style" type="number" step="0.1" placeholder="Min CGPA" value={minCgpa} onChange={(e)=>setMinCgpa(e.target.value)} />
                  <input className="input-style" type="number" placeholder="Min 10th %" value={minTenth} onChange={(e)=>setMinTenth(e.target.value)} />
                  <input className="input-style" type="number" placeholder="Min 12th %" value={minTwelfth} onChange={(e)=>setMinTwelfth(e.target.value)} />
                  <input className="input-style" type="number" placeholder="Max Backlogs" value={maxBacklogs} onChange={(e)=>setMaxBacklogs(e.target.value)} />
                </div>
              </div>

              <div className="md:col-span-3">
                <input className="input-style w-full" placeholder="Company Application Link (https://...)" value={applicationLink} onChange={(e)=>setApplicationLink(e.target.value)} />
              </div>
            </div>

            <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98] ${editingId ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
              {editingId ? "Update Placement Drive" : "Launch Placement Drive"}
            </button>
          </form>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Company & Role</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Eligibility</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {drives.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{d.companyName}</div>
                      <div className="text-sm text-slate-500">{d.role}</div>
                    </td>
                    <td className="px-6 py-5 space-y-1">
                      <div className="text-sm flex items-center gap-1.5 text-slate-600">
                        <BadgeCheck size={14} className="text-indigo-500" /> {d.packageOffered} LPA
                      </div>
                      <div className="text-xs flex items-center gap-1.5 text-slate-400">
                        <MapPin size={12} /> {d.location}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs space-y-1">
                      <div className="text-slate-600 font-medium">Min CGPA: {d.minCgpa || "N/A"}</div>
                      <div className="text-slate-400 text-[10px]">Backlogs: {d.maxBacklogs ?? "N/A"}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(d.status)}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        {d.applicationLink && (
                          <a href={d.applicationLink} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        )}
                        <button onClick={() => handleEdit(d)} className="p-2 text-slate-400 hover:text-amber-500 transition-colors">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => deleteDrive(d.id).then(fetchDrives)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .input-style {
          @apply border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all;
          width: 100%;
        }
      `}} />
    </div>
  );
}

export default CompanyDrives;