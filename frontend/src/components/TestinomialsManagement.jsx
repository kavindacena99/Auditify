// src/admin/TestimonialsManagement.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function TestimonialsManagement() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", company: "", feedback: "" });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await api.fetchTestimonials();
      setItems(res.data || []);
    } catch (e) { console.error(e); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.updateTestimonial(editing._id, form);
      else await api.createTestimonial(form);
      setForm({ name: "", company: "", feedback: "" });
      setEditing(null);
      load();
    } catch (err) { console.error(err); }
  };

  const edit = (t) => { setEditing(t); setForm({ name: t.name, company: t.company, feedback: t.feedback }); };
  const remove = async (id) => { if (!confirm("Delete?")) return; await api.deleteTestimonial(id); load(); };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Testimonials</h3>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Client name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded"/>
          <input placeholder="Company" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} className="w-full p-2 border rounded"/>
          <textarea required placeholder="Feedback" value={form.feedback} onChange={(e)=>setForm({...form,feedback:e.target.value})} className="w-full p-2 border rounded" rows={4}/>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? "Update" : "Add"}</button>
            {editing && <button type="button" className="px-4 py-2 border rounded" onClick={()=>{setEditing(null); setForm({name:"",company:"",feedback:""})}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {items.map(t => (
          <div key={t._id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{t.name} <span className="text-sm text-gray-500">({t.company})</span></div>
                <p className="text-gray-700 mt-2">{t.feedback}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(t)} className="px-3 py-1 border rounded">Edit</button>
                <button onClick={() => remove(t._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
