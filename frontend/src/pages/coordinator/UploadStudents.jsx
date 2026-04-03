


import { useState } from "react";
import { CloudUpload, FileSpreadsheet, X, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadStudents } from "../../services/departmentCoordinatorService";

function UploadStudents() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const coordinatorId = localStorage.getItem("userId");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file first");

    uploadStudents(coordinatorId, file)
      .then(() => {
        alert("Students uploaded successfully");
        setFile(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Upload failed. Please check the file format.");
      });
  };

  // Drag and drop handlers
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls"))) {
      setFile(droppedFile);
    } else {
      alert("Please upload an Excel file (.xlsx or .xls)");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Bulk Student Import
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Upload your department's student roster using our standardized Excel template.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12 transition-all">
          
          <div className="flex flex-col items-center">
            
            {/* DRAG & DROP ZONE */}
            {!file ? (
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`w-full group relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-300 ${
                  isDragging 
                    ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]" 
                    : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="studentUpload"
                />
                
                <label htmlFor="studentUpload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CloudUpload size={40} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Click to upload or drag and drop
                  </h3>
                  <p className="text-slate-400 font-medium text-sm">
                    Microsoft Excel Files (.xlsx, .xls)
                  </p>
                  
                  <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500"/> Max 10MB</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500"/> Multi-sheet support</span>
                  </div>
                </label>
              </div>
            ) : (
              /* SELECTED FILE PREVIEW */
              <div className="w-full animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <FileSpreadsheet size={32} />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg truncate max-w-[200px] md:max-w-sm">
                        {file.name}
                      </p>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">
                        {(file.size / 1024).toFixed(1)} KB • Ready to sync
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setFile(null)}
                    className="p-3 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-2xl transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleUpload}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <CloudUpload size={24} />
                    Process & Import Students
                  </button>
                  <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
                    <AlertCircle size={14} />
                    Data will be automatically mapped to student records
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* UPLOAD INSTRUCTIONS / GUIDELINES */}
          <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4">Required Columns</h4>
              <ul className="space-y-2">
                {['Register Number', 'Full Name', 'Email Address', 'Current CGPA'].map((col) => (
                  <li key={col} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" /> {col}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h4 className="font-black text-amber-800 text-sm uppercase tracking-widest mb-2">Pro Tip</h4>
              <p className="text-amber-700/80 text-xs leading-relaxed font-medium">
                Ensure all percentage values are formatted as numbers (0-100) and email addresses are valid institutional IDs to avoid processing errors.
              </p>
            </div>
          </div>

        </div>

        {/* BACK ACTION */}
        <div className="mt-8 text-center">
          <button className="text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors">
            Download Excel Template (.xlsx)
          </button>
        </div>

      </div>
    </div>
  );
}

export default UploadStudents;