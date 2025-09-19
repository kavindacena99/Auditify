// src/AdminDashboard.jsx
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";


const nav = [
  { id: "dashboard", label: "Dashboard" },
  { id: "services", label: "Services" },
  { id: "clients", label: "Clients" },
  { id: "blogs", label: "Blogs" },
  { id: "testimonials", label: "Testimonials" },
  { id: "company", label: "Company Info" },
  { id: "settings", label: "Settings" },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (active) {
      case "services":
        return <ServicesManagement />;
      case "clients":
        return <ClientsManagement />;
      case "blogs":
        return <BlogsManagement />;
      case "testimonials":
        return <TestimonialsManagement />;
      case "company":
        return <CompanyInfo />;
      case "settings":
        return <Settings />;
      default:
        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Welcome, Admin</h2>
            <p className="mt-2 text-gray-600">Overview and quick stats appear here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-blue-900 text-white transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          <div className="text-lg font-bold">Audit Admin</div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setActive(n.id);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md mb-1 hover:bg-blue-800 ${
                active === n.id ? "bg-blue-800" : ""
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile) */}
        <header className="md:hidden flex items-center justify-between bg-white p-3 shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="font-semibold">Admin Panel</div>
          <div /> {/* placeholder for avatar/controls */}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
