// src/admin/ServicesManagement.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.fetchServices();
      setServices(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.updateService(editing._id, form);
      } else {
        await api.createService(form);
      }
      setForm({ title: "", description: "" });
      setEditing(null);
      load();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (s) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    await api.deleteService(id);
    load();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Services Management</h3>

      <div className="bg-white p-4 rounded-md shadow">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Service title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {editing ? "Update Service" : "Add Service"}
            </button>
            {editing && (
              <button type="button" className="px-4 py-2 border rounded" onClick={() => { setEditing(null); setForm({ title: "", description: "" }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">All Services</h4>
        {loading ? (
          <div>Loading...</div>
        ) : services.length === 0 ? (
          <div className="text-gray-500">No services yet.</div>
        ) : (
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s._id} className="bg-white p-3 rounded shadow flex justify-between items-start">
                <div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.description}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(s)} className="px-3 py-1 border rounded">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
