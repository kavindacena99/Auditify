import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Contact(){
    const [ name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ message, setMessage] = useState("");
    const [ error, setError] = useState("");

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await API.post("/inquiry/client/submit",{ name, email, message });
            Navigate("/");
        }catch(error){
            setError("Registration failed!");
        }
    };

    return(
        <div>
            <Navbar />
            <section id="contact" className="py-20 bg-gray-100">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                    <p className="text-gray-700 mb-12">Send us a message or inquiry, and we will get back to you promptly.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            rows={5}
                            required
                        ></textarea>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Contact;