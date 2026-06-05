import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function PerformanceLineChart({ report }) {
  const data = [
    {
      exam: "IT1",
      marks: Number(report?.internalTest1) || 0,
    },
    {
      exam: "IT2",
      marks: Number(report?.internalTest2) || 0,
    },
    {
      exam: "Project1",
      marks: Number(report?.project1) || 0,
    },
    {
      exam: "Half Yearly",
      marks: Number(report?.halfYearly) || 0,
    },
    {
      exam: "IT3",
      marks: Number(report?.internalTest3) || 0,
    },
    {
      exam: "IT4",
      marks: Number(report?.internalTest4) || 0,
    },
    {
      exam: "Project2",
      marks: Number(report?.project2) || 0,
    },
    {
      exam: "Final",
      marks: Number(report?.finalExam) || 0,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">
        Student Performance Trend
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="exam" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="marks"
              strokeWidth={3}
              stroke="#7c3aed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PerformanceLineChart;