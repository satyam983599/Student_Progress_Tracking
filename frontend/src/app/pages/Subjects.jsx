import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Subjects() {
  const [subjectName, setSubjectName] =
    useState("");

  const [subjectCode, setSubjectCode] =
    useState("");

  const [subjects, setSubjects] =
    useState([]);

  const loadSubjects = async () => {
    const res = await fetch(
      "http://localhost:5000/api/subjects"
    );

    const data = await res.json();

    setSubjects(data.subjects || []);
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const addSubject = async () => {
    if (
      !subjectName ||
      !subjectCode
    )
      return;

    const res = await fetch(
      "http://localhost:5000/api/subjects/add",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          subjectName,
          subjectCode,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSubjectName("");
      setSubjectCode("");
      loadSubjects();
    } else {
      alert(data.message);
    }
  };

  const deleteSubject = async (id) => {
    await fetch(
      `http://localhost:5000/api/subjects/${id}`,
      {
        method: "DELETE",
      }
    );

    loadSubjects();
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white p-8 rounded-3xl">
          <h1 className="text-3xl font-bold">
            Subject Management
          </h1>

          <p>
            Add and Manage School
            Subjects
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Subject Name"
              className="border p-3 rounded-xl"
              value={subjectName}
              onChange={(e) =>
                setSubjectName(
                  e.target.value
                )
              }
            />

            <input
              placeholder="Subject Code"
              className="border p-3 rounded-xl"
              value={subjectCode}
              onChange={(e) =>
                setSubjectCode(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={addSubject}
            className="mt-4 bg-violet-600 text-white px-6 py-3 rounded-xl"
          >
            Add Subject
          </button>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Subject List
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  Subject
                </th>

                <th className="text-left p-3">
                  Code
                </th>

                <th className="text-left p-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {subjects.map(
                (subject) => (
                  <tr
                    key={subject._id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        subject.subjectName
                      }
                    </td>

                    <td className="p-3">
                      {
                        subject.subjectCode
                      }
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteSubject(
                            subject._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
}

export default Subjects;