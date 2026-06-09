// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// function PerformanceLineChart({ chartData = [] }) {
//   return (
//     <div className="bg-white rounded-3xl shadow-sm p-6">
//       <h2 className="text-xl font-bold mb-6">
//         Performance Trend
//       </h2>

//       <div className="h-[350px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />

//             <XAxis dataKey="exam" />

//             <YAxis domain={[0, 100]} />

//             <Tooltip />

//             <Line
//               type="monotone"
//               dataKey="percentage"
//               stroke="#7c3aed"
//               strokeWidth={4}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// export default PerformanceLineChart;