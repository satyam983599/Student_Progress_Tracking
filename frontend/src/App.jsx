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
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Attendance from "./app/pages/Attendance";

/* Auth */
import ProtectedRoute from "./app/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report/:id"
        element={
          <ProtectedRoute>
            <StudentReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/marks-entry"
        element={
          <ProtectedRoute>
            <MarksEntry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-student"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <Subjects />
          </ProtectedRoute>
        }
      />
      <Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  }
/>

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;