import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;