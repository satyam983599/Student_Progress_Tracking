import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import AnalyticsCards from "../components/AnalyticsCards";

import {
  Trophy,
  AlertTriangle,
} from "lucide-react";

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
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalReports: 0,
    averagePercentage: 0,
    needsAttention: 0,
    classPerformance: [],
    topStudents: [],
    weakStudents: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/analytics/dashboard"
      );

      const data = await response.json();

      if (data.success) {
        setDashboard(data);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            Student Performance Dashboard
          </h1>

          <p className="mt-2">
            Real-Time Academic Analytics
          </p>

        </div>

        {/* ANALYTICS */}
        <AnalyticsCards
          totalStudents={dashboard.totalStudents}
          examsConducted={dashboard.totalReports}
          averagePercentage={dashboard.averagePercentage}
          needsAttention={dashboard.needsAttention}
          loading={loading}
        />

        {/* GRAPH */}

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Class Wise Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={dashboard.classPerformance}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="class" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="percentage"
                fill="#7c3aed"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* TOP + WEAK */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* TOP STUDENTS */}

          <div className="bg-white rounded-3xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-500" />
              <h2 className="text-2xl font-bold">
                Top Performers
              </h2>
            </div>

            {dashboard.topStudents.length === 0 ? (
              <p>No Data</p>
            ) : (
              dashboard.topStudents.map(
                (student, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-3"
                  >
                    <span>{student.name}</span>

                    <span className="font-bold text-green-600">
                      {student.percentage}%
                    </span>
                  </div>
                )
              )
            )}

          </div>

          {/* WEAK STUDENTS */}

          <div className="bg-white rounded-3xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-500" />
              <h2 className="text-2xl font-bold">
                Needs Attention
              </h2>
            </div>

            {dashboard.weakStudents.length === 0 ? (
              <p>No Data</p>
            ) : (
              dashboard.weakStudents.map(
                (student, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-3"
                  >
                    <span>{student.name}</span>

                    <span className="font-bold text-red-600">
                      {student.percentage}%
                    </span>
                  </div>
                )
              )
            )}

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;