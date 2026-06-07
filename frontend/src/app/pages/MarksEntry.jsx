import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/Layout";
import { fetchStudents } from "../features/studentSlice";
import api from "../services/api";

function MarksEntry() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { students = [] } = useSelector((state) => state.students);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [teacherName, setTeacherName] = useState("");
  const [remarks, setRemarks] = useState("");

  const [subjectMarks, setSubjectMarks] = useState([]);

  const [subjectData, setSubjectData] = useState({
    subject: "",
    marksObtained: "",
    totalMarks: "",
    examName: "",
    resultDate: "",
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // =========================
  // EXAM OPTIONS (FIXED)
  // =========================
  const examOptions = [
    { label: "Unit Test 1", value: "Unit Test 1" },
    { label: "Unit Test 2", value: "Unit Test 2" },
    { label: "Project 1", value: "Project 1" },
    { label: "Half Yearly", value: "Half Yearly" },
    { label: "Unit Test 3", value: "Unit Test 3" },
    { label: "Unit Test 4", value: "Unit Test 4" },
    { label: "Project 2", value: "Project 2" },
    { label: "Final Exam", value: "Final Exam" },
  ];

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Science",
    "Computer",
    "Physics",
    "Chemistry",
    "Biology",
  ];

  const availableSubjects = subjects.filter(
  (subject) =>
    !subjectMarks.some(
      (item) =>
        item.examName === subjectData.examName &&
        item.subject === subject
    )
);

  // =========================
  // FILTER STUDENTS
  // =========================
  const filteredStudents = (students || []).filter((student) => {
    if (!student) return false;

    return (
      (!selectedClass || String(student.class) === String(selectedClass)) &&
      (!selectedSection ||
        student.section?.toUpperCase() === selectedSection.toUpperCase())
    );
  });

  // =========================
  // ADD SUBJECT MARKS
  // =========================
const addSubjectMarks = () => {
  if (
    !subjectData.subject ||
    !subjectData.marksObtained ||
    !subjectData.totalMarks ||
    !subjectData.examName ||
    !subjectData.resultDate
  ) {
    alert("Fill all fields");
    return;
  }

  const alreadyExists = subjectMarks.some(
    (item) =>
      item.examName === subjectData.examName &&
      item.subject === subjectData.subject
  );

  if (alreadyExists) {
    alert(
      `${subjectData.subject} already added in ${subjectData.examName}`
    );
    return;
  }

  setSubjectMarks([
    ...subjectMarks,
    {
      ...subjectData,
      marksObtained: Number(subjectData.marksObtained),
      totalMarks: Number(subjectData.totalMarks),
    },
  ]);

  setSubjectData({
    subject: "",
    marksObtained: "",
    totalMarks: "",
    examName: subjectData.examName,
    resultDate: "",
  });
};

  const removeSubject = (index) => {
    setSubjectMarks(subjectMarks.filter((_, i) => i !== index));
  };

  // =========================
  // SAVE MARKS
  // =========================
  const handleSave = async () => {
    if (!selectedStudent) {
      alert("Select Student");
      return;
    }

    if (subjectMarks.length === 0) {
      alert("Add subject marks");
      return;
    }

    try {
      const payload = {
        studentId: selectedStudent._id,
        studentName: selectedStudent.name,
        rollNumber: selectedStudent.rollNumber,
        class: selectedStudent.class,
        section: selectedStudent.section,
        academicYear: selectedStudent.academicYear || "2025-26",

        teacherName,
        remarks,

        // ⚠️ IMPORTANT: examName comes from subjectData (ALL SUBJECTS MUST MATCH SAME EXAM)
        examName: subjectMarks[0]?.examName,

        subjects: subjectMarks,
      };

      const res = await api.post("/marks/upload", payload);

      console.log("SAVED:", res.data);

      alert("Marks Saved Successfully");

      setSubjectMarks([]);
      setTeacherName("");
      setRemarks("");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Error saving marks");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-white/20 p-3 rounded-full"
            >
              <ArrowLeft />
            </button>

            <div>
              <h1 className="text-4xl font-bold">Marks Entry Portal</h1>
              <p className="opacity-90">ERP Exam Wise System</p>
            </div>
          </div>
        </div>

        {/* STUDENT FILTER */}
        <div className="bg-white p-6 rounded-3xl shadow grid md:grid-cols-3 gap-4">

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">Class</option>
            {[6,7,8,9,10,11,12].map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <select
            value={selectedStudent?._id || ""}
            onChange={(e) => {
              const st = filteredStudents.find(
                (s) => s._id === e.target.value
              );
              setSelectedStudent(st || null);
            }}
            className="border p-3 rounded-xl"
          >
            <option>Select Student (Roll No)</option>
            {filteredStudents.map((s) => (
              <option key={s._id} value={s._id}>
                Roll {s.rollNumber} - {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBJECT ENTRY */}
        {selectedStudent && (
          <div className="bg-white p-6 rounded-3xl shadow">

            <div className="grid md:grid-cols-5 gap-4">

           <select
                value={subjectData.subject}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    subject: e.target.value,
                  })
                }
                className="border p-3 rounded-xl"
              >
                <option value="">Select Subject</option>

                {availableSubjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                placeholder="Marks"
                value={subjectData.marksObtained}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    marksObtained: e.target.value,
                  })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Total"
                value={subjectData.totalMarks}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    totalMarks: e.target.value,
                  })
                }
                className="border p-3 rounded-xl"
              />

              {/* ✅ FIXED EXAM DROPDOWN */}
              <select
                value={subjectData.examName}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    examName: e.target.value,
                  })
                }
                className="border p-3 rounded-xl"
              >
                <option value="">Select Exam</option>
                {examOptions.map((ex) => (
                  <option key={ex.value} value={ex.value}>
                    {ex.label}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={subjectData.resultDate}
                onChange={(e) =>
                  setSubjectData({
                    ...subjectData,
                    resultDate: e.target.value,
                  })
                }
                className="border p-3 rounded-xl"
              />
            </div>

            <button
              onClick={addSubjectMarks}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl flex gap-2"
            >
              <Plus size={18} />
              Add Subject
            </button>
            {subjectMarks.length > 0 && (
  <div className="mt-6 overflow-x-auto">
    <table className="w-full border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Exam</th>
          <th className="border p-2">Subject</th>
          <th className="border p-2">Marks</th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {subjectMarks.map((item, index) => (
          <tr key={index}>
            <td className="border p-2">{item.examName}</td>
            <td className="border p-2">{item.subject}</td>
            <td className="border p-2">{item.marksObtained}</td>
            <td className="border p-2">{item.totalMarks}</td>
            <td className="border p-2">
              <button
                onClick={() => removeSubject(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
          </div>
        )}

        {/* SAVE */}
        {selectedStudent && (
          <div className="bg-white p-6 rounded-3xl shadow">

            <input
              placeholder="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <textarea
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />

            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              <Save size={18} /> Save Marks
            </button>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default MarksEntry;