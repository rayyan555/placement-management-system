
import { useState } from "react";
import api from "../../api/axios";
import { 
  CloudUpload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  X 
} from "lucide-react";

function BulkUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await api.post("/coordinators/upload/students", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Students uploaded successfully");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bulk Student Onboarding</h1>
          <p className="text-slate-500 mt-2">Upload your department spreadsheet to register multiple students at once.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* UPLOAD CARD */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-10 transition-all text-center ${
                  dragActive ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200 bg-slate-50/30"
                } ${file ? "border-emerald-500 bg-emerald-50/10" : ""}`}
              >
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="fileUpload"
                />
                
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-full mb-4 ${file ? "bg-emerald-100 text-emerald-600" : "bg-indigo-100 text-indigo-600"}`}>
                    <CloudUpload size={32} />
                  </div>
                  <h2 className="text-sm font-bold text-slate-700">
                    {file ? "File Selected!" : "Drop your Excel file here"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports .xlsx and .xls formats
                  </p>
                  <button className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>

              {/* SELECTED FILE INFO */}
              {file && (
                <div className="mt-6 flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="text-emerald-500" size={20} />
                    <div>
                      <div className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{file.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setFile(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className={`w-full mt-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-[0.98] ${
                  loading || !file 
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing File...
                  </span>
                ) : "Confirm & Upload"}
              </button>
            </div>
          </div>

          {/* INSTRUCTIONS / GUIDELINES */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Info size={16} className="text-indigo-500" />
                Upload Guidelines
              </h3>
              <ul className="space-y-4">
                <GuidelineItem text="Ensure column headers match: Name, RegisterNo, Email, Department." />
                <GuidelineItem text="Check for duplicate Register Numbers before uploading." />
                <GuidelineItem text="CGPA values should be numerical (e.g., 8.5)." />
                <GuidelineItem text="Maximum file size limit is 10MB." />
              </ul>
            </div>

            <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                <CheckCircle2 size={16} />
                Pro-Tip
              </div>
              <p className="text-indigo-100 text-xs leading-relaxed">
                Download the <span className="underline cursor-pointer font-bold">Standard Template</span> to ensure your data is processed without errors.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function GuidelineItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 bg-emerald-50 text-emerald-500 rounded-full">
        <CheckCircle2 size={14} />
      </div>
      <span className="text-xs text-slate-600 leading-normal">{text}</span>
    </li>
  );
}

export default BulkUpload;