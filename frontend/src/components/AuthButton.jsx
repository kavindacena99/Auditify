import { useState, useEffect } from "react";

function AuthButton(){
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setLoggedIn(true);
    }, []);

    return(
        <div>
            <a href="/login" 
            onClick={() => {if (loggedIn) {localStorage.removeItem("token"); setLoggedIn(false);}}}
            className={`px-4 py-2 rounded ${ loggedIn? "bg-red-600 text-white hover:bg-red-700 transition" : "bg-blue-600 text-white hover:bg-blue-700 transition" }`}>
                {`${ loggedIn? "Logout" : "Login"}`}
            </a>
        </div>
    );
}

export default AuthButton;