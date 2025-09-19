// src/admin/BlogsManagement.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", date: "", description: "", content: "" });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await api.fetchBlogs();
      setBlogs(res.data || []);
    } catch (e) { console.error(e); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.updateBlog(editing._id, form);
      else await api.createBlog(form);
      setForm({ title: "", author: "", date: "", description: "", content: "" });
      setEditing(null);
      load();
    } catch (err) { console.error(err); }
  };

  const edit = (b) => { setEditing(b); setForm({ title: b.title, author: b.author, date: b.date, description: b.description, content: b.content }); };
  const remove = async (id) => { if (!confirm("Delete blog?")) return; await api.deleteBlog(id); load(); };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Blog Management</h3>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full p-2 border rounded"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input placeholder="Author" value={form.author} onChange={(e)=>setForm({...form,author:e.target.value})} className="p-2 border rounded"/>
            <input placeholder="Date (e.g. Sep 10, 2025)" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} className="p-2 border rounded"/>
          </div>
          <input placeholder="Short description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="w-full p-2 border rounded"/>
          <textarea required placeholder="Content" value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})} className="w-full p-2 border rounded" rows={6}/>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? "Update Post" : "Create Post"}</button>
            {editing && <button type="button" className="px-4 py-2 border rounded" onClick={()=>{setEditing(null); setForm({title:"",author:"",date:"",description:"",content:""})}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div>
        <h4 className="font-medium mb-2">All Posts</h4>
        <div className="space-y-3">
          {blogs.map(b => (
            <div key={b._id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-gray-500">{b.date} • {b.author}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>edit(b)} className="px-3 py-1 border rounded">Edit</button>
                  <button onClick={()=>remove(b._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
