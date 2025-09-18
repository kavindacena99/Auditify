import Navbar from "../components/Navbar";

const team = [
  { name: "Alice Johnson", role: "Senior Auditor", image: "/team1.jpg" },
  { name: "Bob Smith", role: "Tax Consultant", image: "/team2.jpg" },
  { name: "Cathy Lee", role: "Risk Manager", image: "/team3.jpg" },
];

function About(){
    return(
        <div>
            <Navbar />
            <section className="py-20 bg-gray-50 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">About Auditify</h2>
                    <p className="text-gray-700 mb-12">
                    Auditify is dedicated to providing reliable audit, tax advisory, and compliance services to help your business grow safely. Our experienced team ensures accuracy, transparency, and trust.
                    </p>

                    <h3 className="text-2xl font-semibold mb-6">Meet Our Team</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white rounded shadow p-6">
                        <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-semibold">{member.name}</h4>
                        <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;