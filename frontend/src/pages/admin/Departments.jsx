import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, LayoutGrid, Info, X } from "lucide-react"; // npm install lucide-react

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../../services/departmentService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDepartment(editingId, { name, description });
      setEditingId(null);
    } else {
      await createDepartment({ name, description });
    }
    setName("");
    setDescription("");
    fetchDepartments();
  };

  const handleEdit = (dept) => {
    setEditingId(dept.id);
    setName(dept.name);
    setDescription(dept.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(id);
      fetchDepartments();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Departments</h1>
          <p className="text-slate-500">Manage academic departments and their descriptions.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
          {departments.length} Total Departments
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2">
            {editingId ? <Pencil size={18} /> : <Plus size={18} />}
            {editingId ? "Update Department" : "Add New Department"}
          </h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Dept Name</label>
              <input
                className="w-full border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. Computer Science"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-[2]">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Description</label>
              <input
                className="w-full border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="Brief overview of the department..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex items-end">
              <button
                className={`w-full md:w-auto px-8 py-2.5 rounded-xl font-semibold text-white transition-all shadow-md active:scale-95 ${
                  editingId ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-slate-400 font-mono text-sm">#{dept.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <LayoutGrid size={18} />
                      </div>
                      <span className="font-semibold text-slate-700">{dept.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-slate-500 text-sm truncate" title={dept.description}>
                      {dept.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center text-slate-400">
                      <Info size={48} strokeWidth={1} className="mb-2" />
                      <p>No departments found. Start by adding one above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Departments;