import { useState } from "react";
import { Search, User} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Students() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");

  // 🔥 PRIMARY SEARCH BY ROLL NUMBER
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
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CALCULATE OVERALL PERCENTAGE
  const calculatePercent = () => {
    if (!marks.length) return 0;

    let total = 0;
    let obtained = 0;

    marks.forEach((record) => {
      record.subjects?.forEach((sub) => {
        obtained += sub.marksObtained || 0;
        total += sub.totalMarks || 0;
      });
    });

    return total ? Math.round((obtained / total) * 100) : 0;
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white p-8 rounded-3xl">
          <h1 className="text-3xl font-bold">
            Roll Number Student Portal
          </h1>
          <p>Search instantly using Roll Number (Primary Key)</p>
        </div>

        {/* SEARCH BOX */}
        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="flex gap-3">

            <input
              className="border p-3 rounded-xl w-full"
              placeholder="Enter Roll Number (e.g. 101)"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-violet-600 text-white px-6 py-3 rounded-xl"
            >
              <Search />
            </button>

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 p-4 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-6 rounded-xl">
            Loading student data...
          </div>
        )}

        {/* STUDENT DASHBOARD */}
        {studentData && (
          <div className="space-y-6">

            {/* PROFILE CARD */}
            <div className="bg-white p-6 rounded-3xl shadow">

              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <User /> {studentData.name}
                  </h2>

                  <p className="text-gray-500">
                    Class {studentData.class} - Section {studentData.section}
                  </p>

                  <p>Roll No: {studentData.rollNumber}</p>
                </div>

                <div className="text-right">
                  <h3 className="text-3xl font-bold text-green-600">
                    {calculatePercent()}%
                  </h3>
                  <p className="text-gray-500">Overall Performance</p>
                </div>
              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="grid md:grid-cols-3 gap-4">

              <button
                onClick={() => navigate(`/report/${studentData._id}`)}
                className="bg-green-600 text-white p-4 rounded-xl"
              >
                📊 Full Report
              </button>

              <button
                onClick={() => navigate("/marks-entry")}
                className="bg-orange-600 text-white p-4 rounded-xl"
              >
                📝 Add Marks
              </button>

              <button
                onClick={() => navigate("/analytics")}
                className="bg-blue-600 text-white p-4 rounded-xl"
              >
                📈 Analytics
              </button>

            </div>

            {/* MARKS PREVIEW */}
            <div className="bg-white p-6 rounded-3xl shadow">

              <h2 className="text-xl font-bold mb-4">
                Recent Academic Records
              </h2>

              {marks.length === 0 ? (
                <p className="text-gray-500">No marks available</p>
              ) : (
                marks.slice(0, 3).map((m, i) => (
                  <div key={i} className="border-b py-3">

                    <p className="font-semibold">
                      Teacher: {m.teacherName}
                    </p>

                    <p className="text-sm text-gray-500">
                      Subjects: {m.subjects?.length || 0}
                    </p>

                  </div>
                ))
              )}

            </div>

          </div>
        )}

      </div>
    </Layout>
  );
}

export default Students;