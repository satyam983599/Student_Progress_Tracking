import { Routes, Route } from "react-router-dom";

/* Pages */
import Dashboard from "./app/pages/Dashboard";
import Students from "./app/pages/Students";
import StudentReport from "./app/pages/StudentReport";
import MarksEntry from "./app/pages/MarksEntry";
import AddStudent from "./app/pages/AddStudent";
import Reports from "./app/pages/Reports";
import Subjects from "./app/pages/Subjects";
import AboutUs from "./app/pages/AboutUs";


function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Students */}
      <Route path="/students" element={<Students />} />

      {/* Student Report */}
      <Route path="/report/:id" element={<StudentReport />} />

      {/* Marks Entry */}
      <Route path="/marks-entry" element={<MarksEntry />} />

      {/* Add Student */}
      <Route path="/add-student" element={<AddStudent />} />
            <Route path="/reports" element={<Reports />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;