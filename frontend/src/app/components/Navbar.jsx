import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  Sun,
  Moon,
  ChevronDown,
  UserCircle,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ✅ DARK MODE SYNC FIX
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
    }
  }, [darkMode]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40">

      {/* TOP ROW */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div>
          <p className="text-sm text-violet-600 font-semibold">
            School ERP
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-80">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search student..."
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* MESSAGES */}
          <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
            <MessageSquare size={20} />
            <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] px-1 rounded-full">
              2
            </span>
          </button>

          {/* NOTIFICATIONS */}
          <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              5
            </span>
          </button>

          {/* ADD STUDENT */}
          <button
            onClick={() => navigate("/add-student")}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition"
          >
            <Plus size={18} />
            Add Student
          </button>

          {/* PROFILE */}
          <div className="relative">

            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              <UserCircle size={32} className="text-violet-600" />

              <div className="hidden md:block text-left">
                <h4 className="font-semibold text-sm">
                  Admin User
                </h4>
                <p className="text-xs text-gray-500">
                  School Administrator
                </p>
              </div>

              <ChevronDown size={18} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                  My Profile
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                  Settings
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                  Change Password
                </button>

                <hr />

                <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50">
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* BOTTOM MARQUEE FIX */}
      <div className="mt-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50  rounded-xl px-4 py-3 overflow-hidden">

        <div className="flex gap-10 whitespace-nowrap text-sm font-medium text-violet-600 animate-marquee">
          <span>🎓 Manage student performance efficiently</span>
          <span>📊 Track academic growth in real-time</span>
          <span>🏆 Generate instant progress reports</span>
          <span>📈 Analyze subject-wise performance</span>
        </div>

      </div>

      {/* MARQUEE ANIMATION STYLE */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 12s linear infinite;
          }
        `}
      </style>

    </header>
  );
}

export default Navbar;