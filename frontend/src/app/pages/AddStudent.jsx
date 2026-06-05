import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AddStudent() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    phone: "",
    address: "",
    class: "",
    section: "",
    rollNumber: "",
    academicYear: "2025-26",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Student name required";
    if (!form.class) return "Class required";
    if (!form.section) return "Section required";
    if (!form.rollNumber) return "Roll number required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        name: form.name.trim(),
        fatherName: form.fatherName.trim(),
        motherName: form.motherName.trim(),
        guardianName: form.guardianName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        class: Number(form.class),
        rollNumber: Number(form.rollNumber),
      };

      const res = await axios.post(
        "http://localhost:5000/api/students/add",
        payload
      );

      console.log("SUCCESS:", res.data);

      alert("Student Added Successfully");

      navigate("/students");
    } catch (err) {
      console.log("ERROR:", err?.response?.data || err.message);

      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Server Error: Student not added"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 space-y-6">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center gap-4">

              <button
                onClick={() => navigate("/students")}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <ArrowLeft />
              </button>

              <div>
                <h1 className="text-3xl font-bold">
                  Add New Student
                </h1>
                <p className="opacity-80">
                  Fill complete student details
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow space-y-6"
          >

            {/* ROW 1 */}
            <div className="grid md:grid-cols-3 gap-4">

              <input
                name="name"
                placeholder="Student Name *"
                value={form.name}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="fatherName"
                placeholder="Father Name"
                value={form.fatherName}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="motherName"
                placeholder="Mother Name"
                value={form.motherName}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

            </div>

            {/* ROW 2 */}
            <div className="grid md:grid-cols-3 gap-4">

              <input
                name="guardianName"
                placeholder="Guardian Name"
                value={form.guardianName}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="rollNumber"
                placeholder="Roll Number *"
                value={form.rollNumber}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

            </div>

            {/* ROW 3 */}
            <div className="grid md:grid-cols-3 gap-4">

              <select
                name="class"
                value={form.class}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              >
                <option value="">Select Class *</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>

              <select
                name="section"
                value={form.section}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              >
                <option value="">Select Section *</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>

              <input
                name="academicYear"
                value={form.academicYear}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

            </div>

            {/* ADDRESS */}
            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
              rows={4}
            />

            {/* SUBMIT */}
            <div className="flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Student"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default AddStudent;