import React, { useEffect, useState } from "react";
import API from "../services/api";

function ClientManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    try{
      const inquiry = await API.get("/inquiry/client/inquiries");
      setInquiries(inquiry.data);
    }catch(error){
      console.error("Erorr loading sinquiries");
    }
  };

  const fetchClients = async () => {
    try{
      const client = await API.get("/inquiry/clients");
      setClients(client.data);
    }catch(error){
      console.error("Erorr loading clients");
    }
  };

  const resolve = async (id) => {
    try{
      const res = await API.put(`/inquiry/clients/inquiries/${id}`);
      setInquiries(inquiries.map(iq => iq._id === id ? res.data : iq));
    }catch(error){
      console.error("Error marking inquiry resolved");
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchClients();
  }, []);

  return(
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
                      </div>
                      <div className="text-sm">
                        <div className={`px-2 py-1 rounded text-xs ${iq.clicked ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {iq.clicked ? "Resolved" : "Pending"}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{iq.message}</p>
                    <div className="mt-2 flex gap-2">
                      {!iq.clicked && <button onClick={() => resolve(iq._id)} className="px-3 py-1 bg-blue-600 text-white rounded">Mark Resolved</button>}
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
                    <div className="font-semibold">{c.firstname} {c.lastname}</div>
                    <div className="text-sm text-gray-600">Joined at {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}</div>
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

export default ClientManagement;