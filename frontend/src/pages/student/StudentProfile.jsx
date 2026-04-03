import { useEffect, useState, useCallback, memo } from "react";
import { Camera, FileText, GraduationCap, MapPin, Phone, User, Calendar, Award, Upload, X } from "lucide-react";
import { getStudentProfile, updateStudentProfile } from "../../services/studentService";

/**
 * ✅ FIX 1: Move FormField OUTSIDE the main component.
 * This prevents the component from being "re-created" on every keystroke.
 * Using memo prevents the input from re-rendering unless its specific props change.
 */
const FormField = memo(({ label, name, value, type = "text", disabled = false, icon: Icon, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {Icon && <Icon size={14} className="text-gray-400" />}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={`px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
        ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white hover:border-gray-300"}`}
    />
  </div>
));

function StudentProfile() {
  const [profile, setProfile] = useState({});
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getStudentProfile(userId);
    setProfile(res.data);
    if (res.data.photoPath) {
      setPhotoPreview(`http://localhost:8080/uploads/${res.data.photoPath}`);
    }
  };

  /**
   * ✅ FIX 2: Use useCallback for the change handler.
   * This ensures the function reference stays the same across renders.
   */
  const handleChange = useCallback((e) => {
    const { name, value: rawValue } = e.target;
    let finalValue = rawValue;

    if (["cgpa", "tenthPercentage", "twelfthPercentage", "diplomaPercentage", "backlogs", "batchYear"].includes(name)) {
      finalValue = rawValue === "" ? null : Number(rawValue);
    }

    setProfile(prev => ({ ...prev, [name]: finalValue }));
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateStudentProfile(userId, profile, resume, photo);
      alert("Profile Updated Successfully");
      setPhoto(null);
      setResume(null);
      loadProfile();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-400" />
        
        <div className="px-8 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12">
            <div className="relative group">
              <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src={photoPreview || (profile.photoPath ? `http://localhost:8080/uploads/${profile.photoPath}` : "https://via.placeholder.com/160")}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
              <label htmlFor="photoUpload" className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera size={18} />
                <input type="file" id="photoUpload" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>

            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">{profile.registerNo || "N/A"}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500">
                <span className="flex items-center gap-1.5"><GraduationCap size={16}/> {profile.degree}</span>
                <span className="flex items-center gap-1.5"><MapPin size={16}/> {profile.city || "Location not set"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <div className="bg-blue-50 border border-blue-100 px-6 py-2 rounded-xl text-center">
              <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600">Current CGPA</p>
              <p className="text-2xl font-black text-blue-700">{profile.cgpa ?? "0.0"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* PERSONAL DETAILS */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={20}/></div>
              <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Register Number" name="registerNo" value={profile.registerNo ?? ""} onChange={handleChange} />
              <FormField label="Phone Number" name="phoneNumber" value={profile.phoneNumber ?? ""} icon={Phone} onChange={handleChange} />
              <FormField label="City" name="city" value={profile.city ?? ""} icon={MapPin} onChange={handleChange} />
              <FormField label="Degree" name="degree" value={profile.degree ?? ""} onChange={handleChange} />
              <FormField label="College" name="college" value={profile.college ?? ""} onChange={handleChange} />
              <FormField label="Batch Year" name="batchYear" value={profile.batchYear ?? ""} onChange={handleChange} />
              <FormField label="Gender" name="gender" value={profile.gender ?? ""} onChange={handleChange} />
              <div className="md:col-span-2">
                <FormField label="Branch / Department" value={profile.department?.name ?? ""} disabled icon={GraduationCap} />
              </div>
            </div>
          </section>

          {/* ACADEMIC DETAILS */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Award size={20}/></div>
              <h3 className="text-xl font-bold text-gray-800">Academic Records</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField label="10th Percentage" name="tenthPercentage" value={profile.tenthPercentage ?? ""} onChange={handleChange} />
              <FormField label="12th Percentage" name="twelfthPercentage" value={profile.twelfthPercentage ?? ""} onChange={handleChange} />
              <FormField label="Diploma %" name="diplomaPercentage" value={profile.diplomaPercentage ?? ""} onChange={handleChange} />
              <FormField label="Current CGPA" name="cgpa" value={profile.cgpa ?? ""} onChange={handleChange} />
              <FormField label="Active Backlogs" name="backlogs" value={profile.backlogs ?? ""} onChange={handleChange} />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FileText size={20}/></div>
              <h3 className="text-xl font-bold text-gray-800">Documents</h3>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowResumePopup(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 p-4 rounded-xl transition-all group"
              >
                <Upload size={20} className="text-gray-400 group-hover:text-blue-500" />
                <span className="font-semibold text-gray-600">{profile.resumePath ? "Update Resume" : "Upload Resume"}</span>
              </button>

              {profile.resumePath && (
                <a
                  href={`http://localhost:8080/uploads/${profile.resumePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-blue-600 bg-blue-50 rounded-xl font-bold hover:bg-blue-100 transition-colors"
                >
                  <FileText size={18} />
                  View Current Resume
                </a>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* POPUP MODAL */}
      {showResumePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowResumePopup(false)} />
          <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowResumePopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Upload size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-500 mb-6 text-sm">Select your latest resume in PDF format.</p>
              <input
                type="file"
                accept="application/pdf"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-8"
                onChange={(e) => setResume(e.target.files[0])}
              />
              <div className="flex gap-3">
                <button onClick={() => setShowResumePopup(false)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Cancel</button>
                <button
                  onClick={async () => {
                    await updateStudentProfile(userId, profile, resume, photo);
                    alert("Resume Updated");
                    setShowResumePopup(false);
                    loadProfile();
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;