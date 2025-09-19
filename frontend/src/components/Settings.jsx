import React, { useEffect, useState } from "react";
import api from "../api";

export default function Settings() {
  const [admin, setAdmin] = useState({ name: "", email: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.fetchAdmin();
        if (res.data) setAdmin(res.data);
      } catch (e) { console.error(e); }
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.updateAdmin(admin);
    alert("Settings updated");
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Settings</h3>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={save} className="space-y-3">
          <input className="w-full p-2 border rounded" value={admin.name} onChange={(e)=>setAdmin({...admin,name:e.target.value})} placeholder="Name"/>
          <input className="w-full p-2 border rounded" value={admin.email} onChange={(e)=>setAdmin({...admin,email:e.target.value})} placeholder="Email"/>
          <input type="password" className="w-full p-2 border rounded" placeholder="New password (optional)"/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </div>
    </div>
  );
}
