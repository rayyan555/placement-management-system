import { useEffect, useState } from "react";
import { 
  Users, 
  UserCheck, 
  BarChart3, 
  PieChart as PieIcon, 
  LayoutDashboard, 
  ArrowUpRight 
} from "lucide-react";
import { getDepartmentAnalytics } from "../../services/departmentCoordinatorService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function CoordinatorDashboard() {
  const coordinatorId = localStorage.getItem("userId");
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getDepartmentAnalytics(coordinatorId)
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error(err));
  }, [coordinatorId]);

  if (!analytics) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="font-medium text-slate-500">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  const pieData = [
    { name: "Placed", value: analytics.placedStudents },
    { name: "Not Placed", value: analytics.notPlacedStudents },
  ];

  const barData = [
    { name: "Total", value: analytics.totalStudents, fill: "#6366f1" },
    { name: "Eligible", value: analytics.eligibleStudents, fill: "#8b5cf6" },
    { name: "Placed", value: analytics.placedStudents, fill: "#10b981" },
  ];

  const PIE_COLORS = ["#10b981", "#f43f5e"];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans text-slate-900">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <LayoutDashboard size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Coordinator Portal</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">
            Department Analytics
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold text-slate-600">Live Department Data</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Students */}
        <div className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Students</p>
              <h3 className="text-4xl font-black mt-2 text-slate-800">{analytics.totalStudents}</h3>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-indigo-500 cursor-pointer">
           
          </div>
        </div>

        {/* Placed Students */}
        <div className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Placed Count</p>
              <h3 className="text-4xl font-black mt-2 text-emerald-600">{analytics.placedStudents}</h3>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
              <UserCheck size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-500">
            Current Batch Progress
          </div>
        </div>

        {/* Placement % */}
        <div className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Success Rate</p>
              <h3 className="text-4xl font-black mt-2 text-indigo-600">
                {analytics.placementPercentage.toFixed(1)}%
              </h3>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
              <BarChart3 size={24} />
            </div>
          </div>
          <div className="mt-6 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${analytics.placementPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PIE CHART */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <PieIcon size={18} className="text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">Placement Distribution</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <BarChart3 size={18} className="text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">Student Funnel Analytics</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[10, 10, 10, 10]} 
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CoordinatorDashboard;