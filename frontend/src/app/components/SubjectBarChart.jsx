import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function SubjectBarChart({ subjectAnalysis = [] }) {
  const data = subjectAnalysis.map((item) => ({
    subject: item.subject || "Unknown",
    percentage: Number(item.percentage) || 0,
  }));

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">
        Subject Wise Performance
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SubjectBarChart;