
import { useState } from "react";
import Layout from "../components/Layout";
import {
  CalendarCheck,
  Search,
  Save,
} from "lucide-react";

function Attendance() {
  const [selectedClass, setSelectedClass] =
    useState("");

  const [selectedSection, setSelectedSection] =
    useState("");

  const [month, setMonth] =
    useState(new Date().getMonth() + 1);

  const [year, setYear] =
    useState(new Date().getFullYear());

  const [totalDays, setTotalDays] =
    useState("");

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // SEARCH STUDENTS
  // =========================

  const searchStudents = async () => {
    try {
      if (
        !selectedClass ||
        !selectedSection
      ) {
        alert(
          "Select Class and Section"
        );
        return;
      }

      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/students/class/${selectedClass}/section/${selectedSection}`
      );

      const data = await res.json();

      if (!data.success) {
        alert("Students not found");
        return;
      }

      const updatedStudents =
        data.students.map(
          (student) => ({
            ...student,
            presentDays: "",
          })
        );

      setStudents(updatedStudents);
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE PRESENT DAYS
  // =========================

  const handlePresentChange = (
    index,
    value
  ) => {
    const updated = [...students];

    updated[index].presentDays = value;

    setStudents(updated);
  };

  // =========================
  // SAVE ATTENDANCE
  // =========================

  const saveAttendance = async () => {
    try {
      if (!totalDays) {
        alert("Enter Total Days");
        return;
      }

      const records = students.map(
        (student) => ({
          studentId: student._id,
          studentName: student.name,
          rollNumber:
            student.rollNumber,

          class: student.class,
          section: student.section,

          month: Number(month),
          year: Number(year),

          totalDays:
            Number(totalDays),

          presentDays: Number(
            student.presentDays || 0
          ),

          absentDays:
            Number(totalDays) -
            Number(
              student.presentDays || 0
            ),
        })
      );

      const res = await fetch(
        "http://localhost:5000/api/attendance/save",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            records,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Attendance Saved Successfully"
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-3xl shadow-lg">
          <div className="flex items-center gap-4">
            <CalendarCheck size={40} />

            <div>
              <h1 className="text-4xl font-bold">
                Attendance Management
              </h1>

              <p>
                Monthly Attendance
                Entry
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS */}

        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="grid md:grid-cols-5 gap-4">

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            >
              <option value="">
                Select Class
              </option>

              {[1,2,3,4,5,6,7,8,9,10,11,12].map(
                (cls) => (
                  <option
                    key={cls}
                    value={cls}
                  >
                    Class {cls}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedSection}
              onChange={(e) =>
                setSelectedSection(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            >
              <option value="">
                Section
              </option>

              <option value="A">
                A
              </option>

              <option value="B">
                B
              </option>

              <option value="C">
                C
              </option>
              
            </select>

            <select
              value={month}
              onChange={(e) =>
                setMonth(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            >
              <option value="1">
                January
              </option>
              <option value="2">
                February
              </option>
              <option value="3">
                March
              </option>
              <option value="4">
                April
              </option>
              <option value="5">
                May
              </option>
              <option value="6">
                June
              </option>
              <option value="7">
                July
              </option>
              <option value="8">
                August
              </option>
              <option value="9">
                September
              </option>
              <option value="10">
                October
              </option>
              <option value="11">
                November
              </option>
              <option value="12">
                December
              </option>
            </select>

            <input
              type="number"
              placeholder="Total Days"
              value={totalDays}
              onChange={(e) =>
                setTotalDays(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <button
              onClick={searchStudents}
              className="bg-violet-600 text-white rounded-xl flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Search
            </button>

          </div>

        </div>

        {/* STUDENTS TABLE */}

        <div className="bg-white p-6 rounded-3xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Student Attendance
          </h2>

          {loading ? (
            <div>
              Loading Students...
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full border">

                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">
                      Roll No
                    </th>

                    <th className="border p-3">
                      Student Name
                    </th>

                    <th className="border p-3">
                      Present Days
                    </th>

                    <th className="border p-3">
                      Absent Days
                    </th>

                    <th className="border p-3">
                      Attendance %
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {students.length > 0 ? (
                    students.map(
                      (
                        student,
                        index
                      ) => {
                        const present =
                          Number(
                            student.presentDays ||
                              0
                          );

                        const absent =
                          Number(
                            totalDays || 0
                          ) - present;

                        const percentage =
                          totalDays > 0
                            ? (
                                (present /
                                  totalDays) *
                                100
                              ).toFixed(1)
                            : 0;

                        return (
                          <tr
                            key={
                              student._id
                            }
                          >
                            <td className="border p-3">
                              {
                                student.rollNumber
                              }
                            </td>

                            <td className="border p-3">
                              {
                                student.name
                              }
                            </td>

                            <td className="border p-3">
                              <input
                                type="number"
                                min="0"
                                max={
                                  totalDays
                                }
                                value={
                                  student.presentDays
                                }
                                onChange={(
                                  e
                                ) =>
                                  handlePresentChange(
                                    index,
                                    e.target
                                      .value
                                  )
                                }
                                className="border rounded-lg p-2 w-24"
                              />
                            </td>

                            <td className="border p-3 text-center">
                              {absent >= 0
                                ? absent
                                : 0}
                            </td>

                            <td className="border p-3 text-center font-semibold">
                              {
                                percentage
                              }
                              %
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center p-6"
                      >
                        Search students
                        to enter
                        attendance
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* SAVE */}

        {students.length > 0 && (
          <div className="bg-white p-6 rounded-3xl shadow">

            <button
              onClick={saveAttendance}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
            >
              <Save size={18} />
              Save Attendance
            </button>

          </div>
        )}

      </div>
    </Layout>
  );
}

export default Attendance;

