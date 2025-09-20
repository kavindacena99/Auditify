import { useState, useEffect } from "react";
import Brandname from "./Brandname";
import AuthButton from "./AuthButton";

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="bg-white shadow-md border-b-2 border-blue-800">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Brandname />

                <div className="flex items-center">
                    <div className="hidden md:flex space-x-6 mr-4">
                        <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
                        <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
                        <a href="/services" className="text-gray-700 hover:text-blue-600">Services</a>
                        <a href="/blog" className="text-gray-700 hover:text-blue-600">Blog</a>
                    </div>
                    <AuthButton />

                    <div className="md:hidden ml-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 focus:outline-none"
                            >
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16 M4 12h16 M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-2">
                    <a href="/contact" className="block text-gray-700 hover:text-blue-600">Contact</a>
                    <a href="/about" className="block text-gray-700 hover:text-blue-600">About</a>
                    <a href="/services" className="block text-gray-700 hover:text-blue-600">Services</a>
                    <a href="/blog" className="text-gray-700 hover:text-blue-600">Blog</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;