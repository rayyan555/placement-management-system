

import { useState, useEffect } from "react";
import { submitFeedback } from "../../services/studentService";
import axios from "axios";
import { Send, Building2, HelpCircle, Layers, Star, Lightbulb, MessageSquare } from "lucide-react";

function SubmitFeedback() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState({
    studentId: localStorage.getItem("userId"),
    driveId: "",
    companyName: "",
    rounds: "",
    questions: "",
    difficulty: "",
    experience: "",
    tips: ""
  });

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/student/drives", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDrives(res.data);
    } catch (err) {
      console.error("Failed to fetch drives", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-fill company name if a drive is selected
    if (name === "driveId") {
      const selectedDrive = drives.find(d => d.id.toString() === value);
      setFeedback(prev => ({
        ...prev,
        driveId: value,
        companyName: selectedDrive ? selectedDrive.companyName : ""
      }));
    } else {
      setFeedback(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!feedback.driveId || !feedback.experience) {
      alert("Please fill in the essential fields.");
      return;
    }

    setLoading(true);
    try {
      await submitFeedback(feedback);
      alert("✅ Feedback submitted successfully!");
      setFeedback({
        studentId: localStorage.getItem("userId"),
        driveId: "",
        companyName: "",
        rounds: "",
        questions: "",
        difficulty: "",
        experience: "",
        tips: ""
      });
    } catch (err) {
      alert("❌ Error submitting feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Share Your <span className="text-blue-600">Interview Experience</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your insights help the junior batch prepare better. Let's build a helpful community!
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Drive Selection */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 size={16} className="text-blue-500" /> Placement Drive
                </label>
                <select
                  name="driveId"
                  value={feedback.driveId}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                >
                  <option value="">Select a Drive</option>
                  {drives.map(d => (
                    <option key={d.id} value={d.id}>{d.companyName}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Star size={16} className="text-blue-500" /> Overall Difficulty
                </label>
                <select
                  name="difficulty"
                  value={feedback.difficulty}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                >
                  <option value="">Choose Level</option>
                  <option value="Easy">🟢 Easy</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Hard">🔴 Hard</option>
                </select>
              </div>

              {/* Rounds Info */}
              <div className="col-span-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Layers size={16} className="text-blue-500" /> Interview Rounds
                </label>
                <input
                  name="rounds"
                  value={feedback.rounds}
                  onChange={handleChange}
                  placeholder="e.g. Aptitude > Technical > HR"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                />
              </div>

              {/* Questions Area */}
              <div className="col-span-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <HelpCircle size={16} className="text-blue-500" /> Key Questions
                </label>
                <textarea
                  name="questions"
                  rows="3"
                  value={feedback.questions}
                  onChange={handleChange}
                  placeholder="What specific questions were you asked?"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                />
              </div>

              {/* Experience */}
              <div className="col-span-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare size={16} className="text-blue-500" /> Detailed Experience
                </label>
                <textarea
                  name="experience"
                  rows="4"
                  value={feedback.experience}
                  onChange={handleChange}
                  placeholder="How was the environment? Any specific advice on the flow?"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                />
              </div>

              {/* Tips */}
              <div className="col-span-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lightbulb size={16} className="text-blue-500" /> Tips for Success
                </label>
                <textarea
                  name="tips"
                  rows="2"
                  value={feedback.tips}
                  onChange={handleChange}
                  placeholder="Any resources or specific topics to focus on?"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? "Submitting..." : <><Send size={20} /> Submit Feedback</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitFeedback;