import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Students", icon: Users, path: "/students" },
  { name: "Marks Entry", icon: ClipboardList, path: "/marks-entry" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Subjects", icon: BookOpen, path: "/subjects" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
];

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 flex flex-col shadow-sm ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* LOGO */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={24} />
            </div>

            {!collapsed && (
              <div>
                <h2 className="font-bold text-xl text-gray-800">
                  School ERP
                </h2>
                <p className="text-sm text-gray-500">
                  Student Analytics
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden md:flex p-2 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-4 py-6">

        <p
          className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ${
            collapsed ? "text-center" : ""
          }`}
        >
          {!collapsed && "Main Menu"}
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300
                  
                  ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100 hover:text-violet-600"
                  }

                  ${collapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={22} />

                {!collapsed && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-100 p-4">

        <NavLink
          to="/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          className="w-full mt-2 flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;