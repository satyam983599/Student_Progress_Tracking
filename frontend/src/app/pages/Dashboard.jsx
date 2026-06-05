import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  ClipboardList,
  BarChart3,
  Trophy,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCards from "../components/AnalyticsCards";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const chartData = [
    { exam: "IT-1", average: 68 },
    { exam: "IT-2", average: 74 },
    { exam: "Project-1", average: 78 },
    { exam: "Half Yearly", average: 82 },
  ];

  const topStudents = [
    { name: "Rahul Kumar", percentage: 94 },
    { name: "Priya Singh", percentage: 92 },
    { name: "Ankit Verma", percentage: 91 },
    { name: "Sneha Kumari", percentage: 89 },
    { name: "Aman Raj", percentage: 88 },
  ];

  const weakStudents = [
    { name: "Rohan Kumar", percentage: 41 },
    { name: "Sonu Kumar", percentage: 39 },
    { name: "Ravi Kumar", percentage: 35 },
    { name: "Deepak Kumar", percentage: 34 },
  ];

  const exams = [
    { name: "Internal Test 1", status: "Completed" },
    { name: "Internal Test 2", status: "Completed" },
    { name: "Project 1", status: "Completed" },
    { name: "Half Yearly", status: "Completed" },
    { name: "Internal Test 3", status: "Pending" },
    { name: "Internal Test 4", status: "Pending" },
    { name: "Project 2", status: "Pending" },
    { name: "Final Exam", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* MAIN */}
      <div className="flex-1">

        <Navbar />

        <div className="p-6 space-y-6">

          {/* HERO */}
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl">

            <h1 className="text-4xl font-bold">
              Student Performance Analysis System
            </h1>

            <p className="mt-3 text-lg opacity-90">
              Real-Time Student Progress Tracking & Academic Analytics
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

              <div className="bg-white/20 rounded-2xl p-5 backdrop-blur">
                <p className="text-sm opacity-80">Total Students</p>
                <h2 className="text-3xl font-bold mt-2">520</h2>
              </div>

              <div className="bg-white/20 rounded-2xl p-5 backdrop-blur">
                <p className="text-sm opacity-80">Academic Year</p>
                <h2 className="text-3xl font-bold mt-2">2025-26</h2>
              </div>

              <div className="bg-white/20 rounded-2xl p-5 backdrop-blur">
                <p className="text-sm opacity-80">Reports Generated</p>
                <h2 className="text-3xl font-bold mt-2">240</h2>
              </div>

            </div>
          </div>

          {/* ANALYTICS */}
          <AnalyticsCards />

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <button
              onClick={() => navigate("/students")}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
            >
              <Users size={40} className="text-violet-600" />
              <h3 className="font-bold text-xl mt-4">Students</h3>
              <p className="text-gray-500 mt-2">Search Student Records</p>
            </button>

            <button
              onClick={() => navigate("/marks-entry")}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
            >
              <ClipboardList size={40} className="text-green-600" />
              <h3 className="font-bold text-xl mt-4">Marks Entry</h3>
              <p className="text-gray-500 mt-2">Upload Student Marks</p>
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
            >
              <BarChart3 size={40} className="text-blue-600" />
              <h3 className="font-bold text-xl mt-4">Analytics</h3>
              <p className="text-gray-500 mt-2">School Performance</p>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
            >
              <BookOpen size={40} className="text-orange-600" />
              <h3 className="font-bold text-xl mt-4">Subjects</h3>
              <p className="text-gray-500 mt-2">Manage Subjects</p>
            </button>

          </div>

          {/* EXAMS */}
          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">
              Academic Timeline Progress
            </h2>

            <div className="grid md:grid-cols-4 gap-4">

              {exams.map((exam, index) => (
                <div key={index} className="border rounded-xl p-4">
                  <h3 className="font-semibold">{exam.name}</h3>

                  <p
                    className={`mt-3 font-semibold ${
                      exam.status === "Completed"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {exam.status}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* GRAPH */}
          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              School Performance Trend
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="exam" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="average"
                  fill="#7c3aed"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* TOP + WEAK */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-2 mb-5">
                <Trophy className="text-yellow-500" />
                <h2 className="text-2xl font-bold">Top Performers</h2>
              </div>

              {topStudents.map((student, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b"
                >
                  <span>{student.name}</span>
                  <span className="font-bold text-green-600">
                    {student.percentage}%
                  </span>
                </div>
              ))}

            </div>

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="text-red-500" />
                <h2 className="text-2xl font-bold">Needs Attention</h2>
              </div>

              {weakStudents.map((student, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b"
                >
                  <span>{student.name}</span>
                  <span className="font-bold text-red-600">
                    {student.percentage}%
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* FOOTER */}
          <div className="bg-white rounded-3xl p-5 shadow text-center">
            <p className="text-gray-500">
              Student Performance Analysis & Progress Tracking System © 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;