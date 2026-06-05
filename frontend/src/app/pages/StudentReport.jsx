import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCards from "../components/AnalyticsCards";
import PerformanceLineChart from "../components/PerformanceLineChart";
import SubjectBarChart from "../components/SubjectBarChart";

import { fetchStudentReport } from "../features/marksSlice";
import { fetchStudents } from "../features/studentSlice";

function StudentReport() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { report = null, subjectAnalysis = [] } = useSelector(
    (state) => state.marks
  );

  const { students = [] } = useSelector((state) => state.students);

  // ✅ FIX: fetchStudents USED HERE → no ESLint error
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentReport(id));
    }
  }, [id, dispatch]);

  const student = students.find((s) => s._id === id);

  // STATUS LOGIC
  const getStatus = (percent) => {
    if (!percent) return "No Data";
    if (percent >= 75) return "Excellent 🔥";
    if (percent >= 60) return "Good 👍";
    if (percent >= 40) return "Average ⚠️";
    return "Needs Improvement ❌";
  };

  // SAFE MARKS
  const allMarks = [
    report?.internalTest1,
    report?.internalTest2,
    report?.project1,
    report?.halfYearly,
    report?.internalTest3,
    report?.internalTest4,
    report?.project2,
    report?.finalExam,
  ].filter((m) => typeof m === "number");

  const totalMarks = allMarks.reduce((acc, val) => acc + val, 0);

  const percent =
    allMarks.length > 0
      ? Math.round((totalMarks / (allMarks.length * 100)) * 100)
      : 0;

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6 space-y-6">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 text-white p-8 rounded-3xl shadow-lg">
            <h1 className="text-3xl font-bold">
              {student?.name || "Student Report"}
            </h1>

            <p className="mt-2">
              Roll No: {student?.rollNumber || "-"} | Class:{" "}
              {student?.class || "-"}
            </p>

            <p className="mt-3 text-lg font-semibold">
              Status: {getStatus(percent)}
            </p>
          </div>

          {/* CARDS */}
          <AnalyticsCards
            totalStudents={1}
            examsConducted={8}
            averagePercentage={percent}
            needsAttention={percent < 50 ? 1 : 0}
          />

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6">

            <PerformanceLineChart report={report} />

            <SubjectBarChart subjectAnalysis={subjectAnalysis} />

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-4">
              Exam Performance Summary
            </h2>

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Exam</th>
                  <th className="p-3 text-left">Marks</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>

                {[
                  ["Internal Test 1", report?.internalTest1],
                  ["Internal Test 2", report?.internalTest2],
                  ["Project 1", report?.project1],
                  ["Half Yearly", report?.halfYearly],
                  ["Internal Test 3", report?.internalTest3],
                  ["Internal Test 4", report?.internalTest4],
                  ["Project 2", report?.project2],
                  ["Final Exam", report?.finalExam],
                ].map(([exam, marks], i) => (
                  <tr key={i} className="border-t">

                    <td className="p-3">{exam}</td>

                    <td className="p-3">
                      {marks !== undefined && marks !== null
                        ? marks
                        : "Pending"}
                    </td>

                    <td className="p-3">
                      {marks === undefined || marks === null
                        ? "Pending"
                        : marks >= 40
                        ? "Pass"
                        : "Fail"}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentReport;