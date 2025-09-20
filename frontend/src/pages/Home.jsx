import Navbar from "../components/Navbar";
import OurServices from "../components/OurServices";

const testimonials = [
  { name: "John Doe", feedback: "AuditCo helped us streamline our finances and stay compliant." },
  { name: "Jane Smith", feedback: "Professional and reliable audit services!" },
];

function Home(){
    return(
        <div className="font-sans">
            <Navbar />
            <section className="bg-blue-600 text-white py-32 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Building Trust Through Transparency</h1>
                <p className="text-lg md:text-xl mb-6">Auditify provides professional audit and consulting services to help your business grow.</p>
                <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
                Get in Touch
                </a>
            </section>

            <section className="py-20 bg-gray-100 text-center">
                <OurServices />
            </section>

            <section className="py-20 text-center max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
                <div className="space-y-6">
                {testimonials.map((t, index) => (
                    <div key={index} className="bg-white p-6 rounded shadow">
                    <p className="text-gray-700 italic">"{t.feedback}"</p>
                    <p className="mt-4 font-semibold">{t.name}</p>
                    </div>
                ))}
                </div>
            </section>

            <section className="bg-blue-600 text-white py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
                <p className="mb-6">Contact Auditify today and ensure your business stays compliant and secure.</p>
                <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
                Contact Us
                </a>
            </section>
        </div>
    );
}

export default Home;