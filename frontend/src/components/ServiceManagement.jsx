import React, { useEffect, useState } from "react";
import API from '../services/api';
import { useNavigate } from "react-router-dom";

function ServiceManagement(){
  const [ title, setTitle] = useState("");
  const [ description, setDescription] = useState("");
  const [ error, setError] = useState("");
  const [ services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        await API.post("/service/admin/add",{ title, description });
        Navigate("/admin/dashboard");
        fetchServices();
    }catch(error){
        setError("Registration failed!");
    }
  };

  const fetchServices = async () => {
    try{
      const service = await API.get("/service/admin/load");
      setServices(service.data);
    }catch(error){
      console.error("Erorr loading services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try{
      const service = await API.delete(`/service/admin/delete/${id}`);
      fetchServices();
    }catch(error){
      console.error("Delete error");
    }
  };


  return(
    <div>
      <h3 className="text-xl font-semibold mb-4">Services Management</h3>
      <div className="bg-white p-4 rounded-md shadow">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Add a Service
            </button>
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

export default ServiceManagement;