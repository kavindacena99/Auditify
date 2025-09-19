import { useState } from "react";
import Brandname from "../components/Brandname";
import { useNavigate } from "react-router-dom";
import API from "../services/api"

function Login(){
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await API.post("/auth/login",{ email, password});
            const { token, user} = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if(user["role"] === "admin"){
                navigate();
            }else{
                navigate();    
            }
        }catch(error){
            setError("Login Failed!");
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <Brandname />
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
                    Login
                </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;