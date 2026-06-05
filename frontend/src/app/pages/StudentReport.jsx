import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCards from "../components/AnalyticsCards";
import ReportPDF from "../components/ReportPDF";

import { fetchStudentReport } from "../features/marksSlice";
import { fetchStudents } from "../features/studentSlice";

function StudentReport() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { report } = useSelector((state) => state.marks);
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentReport(id));
    }
  }, [id, dispatch]);

  const student =
    students?.find((s) => s._id === id) || {};

  const exams = report?.exams || {};

  let totalObtained = 0;
  let totalMarks = 0;
  let subjectsCount = 0;
  let examsConducted = 0;

  Object.values(exams).forEach((exam) => {
    if (exam?.subjects?.length) {
      examsConducted++;

      exam.subjects.forEach((sub) => {
        totalObtained += Number(
          sub.marksObtained || 0
        );

        totalMarks += Number(
          sub.totalMarks || 0
        );

        subjectsCount++;
      });
    }
  });

  const percentage =
    totalMarks > 0
      ? ((totalObtained / totalMarks) * 100).toFixed(2)
      : 0;

  const status =
    percentage >= 75
      ? "Excellent"
      : percentage >= 60
      ? "Good"
      : percentage >= 40
      ? "Average"
      : "Needs Improvement";

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6 space-y-6">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white p-8 rounded-3xl shadow-lg">
            <h1 className="text-3xl font-bold">
              Student Progress Report
            </h1>

            <p className="mt-2">
              Roll No: {report?.rollNumber}
            </p>
          </div>

          {/* ANALYTICS */}

          <AnalyticsCards
            totalStudents={1}
            examsConducted={examsConducted}
            averagePercentage={percentage}
            needsAttention={
              percentage < 40 ? 1 : 0
            }
          />

          {/* STUDENT PROFILE */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-5">
              Student Profile
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              <div>
                <p className="text-gray-500">
                  Student Name
                </p>

                <p className="font-semibold">
                  {student?.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Roll Number
                </p>

                <p className="font-semibold">
                  {student?.rollNumber}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Class
                </p>

                <p className="font-semibold">
                  {student?.class}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Section
                </p>

                <p className="font-semibold">
                  {student?.section}
                </p>
              </div>

            </div>

          </div>

          {/* PARENT DETAILS */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-5">
              Parent Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <p className="text-gray-500">
                  Father Name
                </p>

                <p className="font-semibold">
                  {student?.fatherName || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Mother Name
                </p>

                <p className="font-semibold">
                  {student?.motherName || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Guardian Name
                </p>

                <p className="font-semibold">
                  {student?.guardianName || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Phone
                </p>

                <p className="font-semibold">
                  {student?.phone || "-"}
                </p>
              </div>

            </div>

          </div>

          {/* ACADEMIC SUMMARY */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-5">
              Academic Summary
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              <div>
                <p className="text-gray-500">
                  Subjects
                </p>

                <p className="text-2xl font-bold">
                  {subjectsCount}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Exams Conducted
                </p>

                <p className="text-2xl font-bold">
                  {examsConducted}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Percentage
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {percentage}%
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Status
                </p>

                <p className="text-2xl font-bold text-violet-600">
                  {status}
                </p>
              </div>

            </div>

          </div>

          {/* EXAM WISE REPORT */}

          {Object.entries(exams).map(
            ([examName, exam]) => {
              if (
                !exam?.subjects ||
                exam.subjects.length === 0
              ) {
                return null;
              }

              return (
                <div
                  key={examName}
                  className="bg-white rounded-3xl shadow-sm p-6"
                >

                  <h2 className="text-xl font-bold capitalize mb-4">
                    {examName}
                  </h2>

                  <div className="overflow-x-auto">

                    <table className="w-full">

                      <thead className="bg-gray-50">

                        <tr>
                          <th className="p-3 text-left">
                            Subject
                          </th>

                          <th className="p-3 text-left">
                            Obtained
                          </th>

                          <th className="p-3 text-left">
                            Total
                          </th>

                          <th className="p-3 text-left">
                            Percentage
                          </th>
                        </tr>

                      </thead>

                      <tbody>

                        {exam.subjects.map(
                          (sub, index) => (
                            <tr
                              key={index}
                              className="border-t"
                            >
                              <td className="p-3">
                                {sub.subject}
                              </td>

                              <td className="p-3">
                                {
                                  sub.marksObtained
                                }
                              </td>

                              <td className="p-3">
                                {
                                  sub.totalMarks
                                }
                              </td>

                              <td className="p-3">
                                {(
                                  (sub.marksObtained /
                                    sub.totalMarks) *
                                  100
                                ).toFixed(1)}
                                %
                              </td>
                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>
              );
            }
          )}

          {/* TEACHER REMARKS */}

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-4">
              Teacher Remarks
            </h2>

            <p>
              {report?.remarks ||
                "No Remarks Available"}
            </p>

          </div>

          {/* PDF */}

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <ReportPDF
              student={{
                ...student,
                report,
              }}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentReport;