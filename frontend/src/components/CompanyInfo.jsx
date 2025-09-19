// src/admin/CompanyInfo.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function CompanyInfo() {
  const [info, setInfo] = useState({ name: "", mission: "", vision: "", address: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.fetchCompanyInfo();
        if (res.data) setInfo(res.data);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.updateCompanyInfo(info);
    alert("Company info updated.");
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Company Info</h3>
      <div className="bg-white p-4 rounded shadow">
        {loading ? <div>Loading...</div> : (
          <form onSubmit={save} className="space-y-3">
            <input className="w-full p-2 border rounded" value={info.name} onChange={(e)=>setInfo({...info,name:e.target.value})} placeholder="Company name"/>
            <textarea className="w-full p-2 border rounded" rows={3} value={info.mission} onChange={(e)=>setInfo({...info,mission:e.target.value})} placeholder="Mission"/>
            <textarea className="w-full p-2 border rounded" rows={3} value={info.vision} onChange={(e)=>setInfo({...info,vision:e.target.value})} placeholder="Vision"/>
            <input className="w-full p-2 border rounded" value={info.address} onChange={(e)=>setInfo({...info,address:e.target.value})} placeholder="Address"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input className="p-2 border rounded" value={info.phone} onChange={(e)=>setInfo({...info,phone:e.target.value})} placeholder="Phone"/>
              <input className="p-2 border rounded" value={info.email} onChange={(e)=>setInfo({...info,email:e.target.value})} placeholder="Email"/>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
