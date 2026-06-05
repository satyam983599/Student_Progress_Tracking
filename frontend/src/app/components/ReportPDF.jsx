import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download } from "lucide-react";

function ReportPDF({ student }) {
  const reportRef = useRef();

  const report = student?.report || {};
  const exams = report?.exams || {};

  let totalObtained = 0;
  let totalMarks = 0;

  Object.values(exams).forEach((exam) => {
    exam?.subjects?.forEach((sub) => {
      totalObtained += Number(sub?.marksObtained || 0);
      totalMarks += Number(sub?.totalMarks || 0);
    });
  });

  const percentage =
    totalMarks > 0
      ? ((totalObtained / totalMarks) * 100).toFixed(2)
      : "0.00";

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `${student?.name || "Student"} Report`,
  });

  return (
    <div className="space-y-6">
      {/* REPORT CONTENT */}
      <div
        ref={reportRef}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        {/* HEADER */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-center">
            Student Progress Report
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Academic Session: {student?.academicYear || "2025-26"}
          </p>
        </div>

        {/* STUDENT DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-xl p-4">
            <h2 className="font-bold text-lg mb-3">
              Student Details
            </h2>

            <p>
              <strong>Name:</strong> {student?.name}
            </p>

            <p>
              <strong>Roll No:</strong>{" "}
              {student?.rollNumber}
            </p>

            <p>
              <strong>Class:</strong> {student?.class}
            </p>

            <p>
              <strong>Section:</strong>{" "}
              {student?.section}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h2 className="font-bold text-lg mb-3">
              Academic Summary
            </h2>

            <p>
              <strong>Total Obtained:</strong>{" "}
              {totalObtained}
            </p>

            <p>
              <strong>Total Marks:</strong>{" "}
              {totalMarks}
            </p>

            <p>
              <strong>Percentage:</strong>{" "}
              {percentage}%
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {Number(percentage) >= 40
                ? "PASS"
                : "FAIL"}
            </p>
          </div>
        </div>

        {/* EXAM WISE MARKS */}
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
                className="mb-8"
              >
                <h2 className="text-xl font-bold mb-3 border-b pb-2 capitalize">
                  {examName}
                </h2>

                <table className="w-full border border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">
                        Subject
                      </th>

                      <th className="border p-2">
                        Obtained
                      </th>

                      <th className="border p-2">
                        Total
                      </th>

                      <th className="border p-2">
                        %
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {exam.subjects.map(
                      (sub, index) => (
                        <tr key={index}>
                          <td className="border p-2">
                            {sub.subject}
                          </td>

                          <td className="border p-2 text-center">
                            {
                              sub.marksObtained
                            }
                          </td>

                          <td className="border p-2 text-center">
                            {sub.totalMarks}
                          </td>

                          <td className="border p-2 text-center">
                            {sub.totalMarks
                              ? (
                                  (sub.marksObtained /
                                    sub.totalMarks) *
                                  100
                                ).toFixed(1)
                              : 0}
                            %
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            );
          }
        )}

        {/* TEACHER REMARKS */}
        <div className="mt-8 border rounded-xl p-4">
          <h2 className="font-bold text-lg mb-2">
            Teacher Remarks
          </h2>

          <p>
            {report?.remarks ||
              "No remarks available"}
          </p>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handlePrint}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            shadow-lg
          "
        >
          <Download size={20} />
          Download / Print Report
        </button>
      </div>
    </div>
  );
}

export default ReportPDF;