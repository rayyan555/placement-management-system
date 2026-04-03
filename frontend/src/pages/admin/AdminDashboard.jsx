// import { useEffect, useState } from "react";
// import { getPlacementAnalytics } from "../../services/analyticsService";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// function AdminDashboard() {

//   const [analytics, setAnalytics] = useState(null);

//   useEffect(() => {

//     const fetchAnalytics = async () => {
//       const data = await getPlacementAnalytics();
//       setAnalytics(data);
//     };

//     fetchAnalytics();

//   }, []);

//   if (!analytics) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   const nonPlacedStudents =
//     analytics.totalStudents - analytics.totalPlacedStudents;

//   /* Pie Chart Data */

//   const placementData = [
//     { name: "Placed", value: analytics.totalPlacedStudents },
//     { name: "Not Placed", value: nonPlacedStudents },
//   ];

//   const COLORS = ["#22c55e", "#ef4444"];

//   /* Bar Chart Data */

//   const packageData = [
//     { name: "Highest", value: analytics.highestPackage },
//     { name: "Average", value: analytics.averagePackage },
//   ];

//   const driveData = [
//     { name: "Drives", value: analytics.totalDrives },
//     { name: "Students", value: analytics.totalStudents },
//   ];

//   return (

//     <div className="p-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 min-h-screen">

//       <h1 className="text-3xl font-bold mb-10">
//         Placement Dashboard
//       </h1>

//       {/* DASHBOARD CARDS */}

//       <div className="grid grid-cols-3 gap-6 mb-10">

//         <div className="backdrop-blur-lg bg-white/40 border border-white/40 p-6 rounded-xl shadow-lg">

//           <h3 className="text-gray-600">Total Students</h3>

//           <p className="text-3xl font-bold mt-2">
//             {analytics.totalStudents}
//           </p>

//         </div>

//         <div className="backdrop-blur-lg bg-white/40 border border-white/40 p-6 rounded-xl shadow-lg">

//           <h3 className="text-gray-600">Placed Students</h3>

//           <p className="text-3xl font-bold text-green-600 mt-2">
//             {analytics.totalPlacedStudents}
//           </p>

//         </div>

//         <div className="backdrop-blur-lg bg-white/40 border border-white/40 p-6 rounded-xl shadow-lg">

//           <h3 className="text-gray-600">Placement %</h3>

//           <p className="text-3xl font-bold text-blue-600 mt-2">
//             {analytics.placementPercentage.toFixed(2)}%
//           </p>

//           {/* Progress Bar */}

//           <div className="w-full bg-gray-200 rounded-full h-2 mt-4">

//             <div
//               className="bg-blue-600 h-2 rounded-full"
//               style={{
//                 width: `${analytics.placementPercentage}%`,
//               }}
//             />

//           </div>

//         </div>

//         <div className="backdrop-blur-lg bg-white/40 border border-white/40 p-6 rounded-xl shadow-lg">

//           <h3 className="text-gray-600">Total Drives</h3>

//           <p className="text-3xl font-bold text-purple-600 mt-2">
//             {analytics.totalDrives}
//           </p>

//         </div>

//         <div className="backdrop-blur-lg bg-white/40 border border-white/40 p-6 rounded-xl shadow-lg">

//           <h3 className="text-gray-600">Highest Package</h3>

//           <p className="text-3xl font-bold text-indigo-600 mt-2">
//             {analytics.highestPackage} LPA
//           </p>

//         </div>

//         <div className="backdrop-blur-lg bg-white/40 border border-white/40 p-6 rounded-xl shadow-lg">

//           <h3 className="text-gray-600">Average Package</h3>

//           <p className="text-3xl font-bold text-gray-700 mt-2">
//             {analytics.averagePackage} LPA
//           </p>

//         </div>

//       </div>

//       {/* CHARTS */}

//       <div className="grid grid-cols-2 gap-8">

//         {/* Placement Pie Chart */}

//         <div className="backdrop-blur-lg bg-white/40 p-6 rounded-xl shadow-lg">

//           <h2 className="text-lg font-semibold mb-4">
//             Placement Distribution
//           </h2>

//           <ResponsiveContainer width="100%" height={300}>

//             <PieChart>

//               <Pie
//                 data={placementData}
//                 dataKey="value"
//                 outerRadius={100}
//                 label
//               >

//                 {placementData.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}

//               </Pie>

//               <Tooltip />

//             </PieChart>

//           </ResponsiveContainer>

//         </div>

//         {/* Package Chart */}

//         <div className="backdrop-blur-lg bg-white/40 p-6 rounded-xl shadow-lg">

//           <h2 className="text-lg font-semibold mb-4">
//             Package Analytics
//           </h2>

//           <ResponsiveContainer width="100%" height={300}>

//             <BarChart data={packageData}>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />

//               <YAxis />

//               <Tooltip />

//               <Bar dataKey="value" fill="#6366f1" />

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div>

//       {/* Drives vs Students */}

//       <div className="mt-10 backdrop-blur-lg bg-white/40 p-6 rounded-xl shadow-lg">

//         <h2 className="text-lg font-semibold mb-4">
//           Drives vs Students
//         </h2>

//         <ResponsiveContainer width="100%" height={300}>

//           <BarChart data={driveData}>

//             <CartesianGrid strokeDasharray="3 3" />

//             <XAxis dataKey="name" />

//             <YAxis />

//             <Tooltip />

//             <Bar dataKey="value" fill="#10b981" />

//           </BarChart>

//         </ResponsiveContainer>

//       </div>

//     </div>

//   );
// }

// export default AdminDashboard;

import { useEffect, useState } from "react";
import { getPlacementAnalytics } from "../../services/analyticsService";
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Briefcase, 
  Award, 
  BarChart3 
} from "lucide-react"; // Optional: npm install lucide-react

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
} from "recharts";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await getPlacementAnalytics();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse text-xl font-medium text-slate-500">
          Loading analytics...
        </div>
      </div>
    );
  }

  const nonPlacedStudents = analytics.totalStudents - analytics.totalPlacedStudents;
  const placementData = [
    { name: "Placed", value: analytics.totalPlacedStudents },
    { name: "Not Placed", value: nonPlacedStudents },
  ];

  const COLORS = ["#10b981", "#f43f5e"]; // Refined Emerald and Rose colors

  const packageData = [
    { name: "Highest", value: analytics.highestPackage },
    { name: "Average", value: analytics.averagePackage },
  ];

  const driveData = [
    { name: "Drives", value: analytics.totalDrives },
    { name: "Students", value: analytics.totalStudents },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-slate-900">
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Placement <span className="text-indigo-600">Analytics</span>
          </h1>
          <p className="text-slate-500 mt-1">Real-time overview of recruitment performance.</p>
        </div>
      
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Total Students" 
          value={analytics.totalStudents} 
          icon={<Users className="text-blue-600" size={24} />} 
        />
        <StatCard 
          title="Placed Students" 
          value={analytics.totalPlacedStudents} 
          icon={<UserCheck className="text-emerald-600" size={24} />} 
          color="text-emerald-600"
        />
        <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Placement %</h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {analytics.placementPercentage.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl"><TrendingUp className="text-indigo-600" size={24} /></div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-6">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${analytics.placementPercentage}%` }}
            />
          </div>
        </div>
        <StatCard 
          title="Total Drives" 
          value={analytics.totalDrives} 
          icon={<Briefcase className="text-purple-600" size={24} />} 
          color="text-purple-600"
        />
        <StatCard 
          title="Highest Package" 
          value={`${analytics.highestPackage} LPA`} 
          icon={<Award className="text-amber-500" size={24} />} 
          color="text-amber-600"
        />
        <StatCard 
          title="Average Package" 
          value={`${analytics.averagePackage} LPA`} 
          icon={<BarChart3 className="text-slate-600" size={24} />} 
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ChartContainer title="Placement Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={placementData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                label
              >
                {placementData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Package Analytics (LPA)">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={packageData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                 cursor={{fill: '#f1f5f9'}}
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <ChartContainer title="Drives vs Student Participation">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={driveData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} barSize={80} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

// Reusable UI Components
const StatCard = ({ title, value, icon, color = "text-slate-900" }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold text-slate-800 mb-6">{title}</h2>
    {children}
  </div>
);

export default AdminDashboard;