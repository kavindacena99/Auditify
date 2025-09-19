// src/admin/ClientsManagement.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function ClientsManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const iq = await api.fetchInquiries();
      setInquiries(iq.data || []);
      const cl = await api.fetchClients();
      setClients(cl.data || []);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resolve = async (id) => {
    await api.markInquiryResolved(id);
    load();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Clients & Inquiries</h3>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium mb-2">Recent Inquiries</h4>
          {loading ? <div>Loading...</div> : inquiries.length === 0 ? <div className="text-gray-500">No inquiries.</div> : (
            <div className="space-y-3">
              {inquiries.map((iq) => (
                <div key={iq._id} className="p-3 border rounded">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{iq.name} <span className="text-sm text-gray-500">({iq.email})</span></div>
                      <div className="text-sm text-gray-600">{iq.subject}</div>
                    </div>
                    <div className="text-sm">
                      <div className={`px-2 py-1 rounded text-xs ${iq.resolved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {iq.resolved ? "Resolved" : "Pending"}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{iq.message}</p>
                  <div className="mt-2 flex gap-2">
                    {!iq.resolved && <button onClick={() => resolve(iq._id)} className="px-3 py-1 bg-blue-600 text-white rounded">Mark Resolved</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium mb-2">Clients</h4>
          {clients.length === 0 ? <div className="text-gray-500">No clients recorded.</div> : (
            <div className="space-y-2">
              {clients.map((c) => (
                <div key={c._id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-600">{c.company || "-"}</div>
                  </div>
                  <div className="text-sm text-gray-500">{c.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
