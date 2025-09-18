import Navbar from "../components/Navbar";

const services = [
  {
    title: "Financial Audit",
    description: "Ensure your financial statements are accurate and comply with standards."
  },
  {
    title: "Tax Advisory",
    description: "Get professional guidance on tax planning and compliance."
  },
  {
    title: "Risk Management",
    description: "Identify potential risks and safeguard your business."
  },
  {
    title: "Compliance Audit",
    description: "Verify that your business follows industry regulations."
  },
];

function Service(){
    return(
        <div>
            <Navbar />
            <section className="py-20 bg-white text-center">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-12">Our Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Service;