import API from '../services/api';
import { useEffect, useState } from 'react';

function OurServices(){
    const [ services, setServices] = useState([]);

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

    return(
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
                <div key={service} className="bg-gray-50 p-6 rounded shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default OurServices;