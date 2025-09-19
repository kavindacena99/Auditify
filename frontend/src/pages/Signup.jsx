import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Brandname from "../components/Brandname";
import API from '../services/api';

function Signup(){
    const [ firstname, setFirstname] = useState("");
    const [ lastname, setLastname] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmpassword, setConfirmpassword] = useState("");
    const [ error, setError] = useState("");

    const Navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if(password !== confirmpassword){
            setError("Password do not match!");
            return;
        }

        try{
            await API.post("/auth/register",{ firstname, lastname, email, password });
            Navigate("/login");
        }catch(error){
            setError("Registration failed!");
        }
    };


    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <Brandname />
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;