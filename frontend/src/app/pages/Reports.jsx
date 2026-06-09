import { useState } from "react";
import Layout from "../components/Layout";
import ReportPDF from "../components/ReportPDF";

function Reports() {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchReport = async () => {
    try {
      setLoading(true);

      const studentRes = await fetch(
        `http://localhost:5000/api/students/roll/${rollNumber}`
      );

      const studentData = await studentRes.json();

      if (!studentData.success) {
        alert("Student not found");
        return;
      }

      setStudent(studentData.student);

      const reportRes = await fetch(
        `http://localhost:5000/api/marks/report/${studentData.student._id}`
      );

      const reportData = await reportRes.json();

      if (!reportData.success) {
        alert("Report not found");
        return;
      }

      setReport(reportData.report);
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const calculateOverall = () => {
    if (!report) return 0;

    let obtained = 0;
    let total = 0;

    Object.values(report.exams || {}).forEach((exam) => {
      exam?.subjects?.forEach((sub) => {
        obtained += Number(sub.marksObtained || 0);
        total += Number(sub.totalMarks || 0);
      });
    });

    return total
      ? ((obtained / total) * 100).toFixed(2)
      : 0;
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white p-8 rounded-3xl">
          <h1 className="text-4xl font-bold">
            Student Report Center
          </h1>

          <p className="mt-2">
            Search Report By Roll Number
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) =>
                setRollNumber(e.target.value)
              }
              className="border p-4 rounded-xl w-full"
            />

            <button
              onClick={searchReport}
              className="bg-violet-600 text-white px-8 rounded-xl"
            >
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white p-6 rounded-xl shadow">
            Loading Report...
          </div>
        )}

        {student && report && (
          <>
            {/* Student Info */}
            <div className="bg-white p-8 rounded-3xl shadow">
              <div className="flex justify-between">

                <div>
                  <h2 className="text-3xl font-bold">
                    {student.name}
                  </h2>

                  <p>
                    Roll No : {student.rollNumber}
                  </p>

                  <p>
                    Class : {student.class} - {student.section}
                  </p>

                  <p>
                    Academic Year : {student.academicYear}
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-5xl font-bold text-green-600">
                    {calculateOverall()}%
                  </h2>

                  <p>Overall Percentage</p>
                </div>

              </div>
            </div>

            {/* Exam Wise Marks */}
            {Object.entries(report.exams || {}).map(
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
                    className="bg-white p-6 rounded-3xl shadow"
                  >
                    <h2 className="text-2xl font-bold mb-4 capitalize">
                      {examName}
                    </h2>

                    <table className="w-full border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-3">
                            Subject
                          </th>

                          <th className="border p-3">
                            Obtained
                          </th>

                          <th className="border p-3">
                            Total
                          </th>

                          <th className="border p-3">
                            Percentage
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {exam.subjects.map(
                          (sub, index) => (
                            <tr key={index}>
                              <td className="border p-3">
                                {sub.subject}
                              </td>

                              <td className="border p-3 text-center">
                                {sub.marksObtained}
                              </td>

                              <td className="border p-3 text-center">
                                {sub.totalMarks}
                              </td>

                              <td className="border p-3 text-center">
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
                );
              }
            )}

            {/* Remarks */}
            <div className="bg-white p-6 rounded-3xl shadow">
              <h2 className="text-xl font-bold mb-2">
                Teacher Remarks
              </h2>

              <p>
                {report.remarks ||
                  "No remarks available"}
              </p>
            </div>

            {/* PDF */}
            <ReportPDF
              student={{
                ...student,
                report,
              }}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default Reports;