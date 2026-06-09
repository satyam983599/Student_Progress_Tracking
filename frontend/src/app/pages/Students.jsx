import { useState } from "react";
import {
  Search,
  User,
  FileText,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Students() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");

  // ==========================
  // SEARCH STUDENT
  // ==========================
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      setStudentData(null);
      setMarks([]);

      const res = await fetch(
        `http://localhost:5000/api/students/roll/${rollNumber}`
      );

      const data = await res.json();

      if (!data.success) {
        setError("Student not found");
        return;
      }

      setStudentData(data.student);
      setMarks(data.marks || []);
    } catch (err) {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // CALCULATE PERCENTAGE
  // ==========================
  const calculatePercent = () => {
    if (!marks.length) return 0;

    let obtained = 0;
    let total = 0;

    marks.forEach((record) => {
      Object.values(record.exams || {}).forEach((exam) => {
        exam?.subjects?.forEach((sub) => {
          obtained += Number(sub.marksObtained || 0);
          total += Number(sub.totalMarks || 0);
        });
      });
    });

    return total
      ? Math.round((obtained / total) * 100)
      : 0;
  };

  const percentage = calculatePercent();

  const performanceColor =
    percentage >= 80
      ? "text-green-600"
      : percentage >= 60
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white p-8 rounded-3xl shadow-lg">
          <h1 className="text-4xl font-bold">
            Student Search Portal
          </h1>

          <p className="mt-2 opacity-90">
            Search Student Using Roll Number
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex gap-3">

            <input
              type="number"
              value={rollNumber}
              onChange={(e) =>
                setRollNumber(e.target.value)
              }
              placeholder="Enter Roll Number"
              className="border p-4 rounded-xl w-full outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-xl"
            >
              <Search />
            </button>

          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-6 rounded-xl shadow">
            Loading Student...
          </div>
        )}

        {/* STUDENT DATA */}
        {studentData && (
          <>
            {/* PROFILE */}
            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <User size={30} />
                    {studentData.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Class {studentData.class}
                    {" • "}
                    Section {studentData.section}
                  </p>

                  <p className="text-gray-500">
                    Roll Number :
                    {" "}
                    {studentData.rollNumber}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className={`text-5xl font-bold ${performanceColor}`}
                  >
                    {percentage}%
                  </div>

                  <p className="text-gray-500 mt-2">
                    Overall Performance
                  </p>
                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white rounded-3xl p-6 shadow">
                <BookOpen
                  className="text-blue-600"
                  size={30}
                />

                <p className="text-gray-500 mt-3">
                  Academic Year
                </p>

                <h2 className="text-3xl font-bold">
                  {studentData.academicYear}
                </h2>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow">
                <FileText
                  className="text-green-600"
                  size={30}
                />

                <p className="text-gray-500 mt-3">
                  Reports Available
                </p>

                <h2 className="text-3xl font-bold">
                  {marks.length}
                </h2>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow">
                <CheckCircle
                  className="text-violet-600"
                  size={30}
                />

                <p className="text-gray-500 mt-3">
                  Status
                </p>

                <h2
                  className={`text-3xl font-bold ${
                    percentage >= 40
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {percentage >= 40
                    ? "PASS"
                    : "FAIL"}
                </h2>
              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="grid md:grid-cols-3 gap-4">

              <button
                onClick={() =>
                  navigate(
                    `/report/${studentData._id}`
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl"
              >
                📊 Full Report
              </button>

              <button
                onClick={() =>
                  navigate("/marks-entry")
                }
                className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl"
              >
                📝 Add Marks
              </button>

              <button
                onClick={() =>
                  navigate("/analytics")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl"
              >
                📈 Analytics
              </button>

            </div>

            {/* RECENT RECORDS */}
            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-2xl font-bold mb-5">
                Academic Records
              </h2>

              {marks.length === 0 ? (
                <p className="text-gray-500">
                  No records found
                </p>
              ) : (
                marks.map((record, i) => (
                  <div
                    key={i}
                    className="border rounded-2xl p-4 mb-4"
                  >
                    <p className="font-semibold">
                      Teacher :
                      {" "}
                      {record.teacherName}
                    </p>

                    <div className="mt-3 space-y-2">

                      {Object.entries(
                        record.exams || {}
                      ).map(
                        ([examName, exam]) => {

                          if (
                            !exam?.subjects ||
                            exam.subjects.length === 0
                          )
                            return null;

                          return (
                            <div
                              key={examName}
                              className="flex justify-between bg-gray-50 p-3 rounded-xl"
                            >
                              <span className="capitalize font-medium">
                                {examName}
                              </span>

                              <span>
                                {
                                  exam.subjects.length
                                }
                                {" "}
                                Subjects
                              </span>
                            </div>
                          );
                        }
                      )}

                    </div>
                  </div>
                ))
              )}

            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Students;