import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 relative">
            {/* Overlay for mobile sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col transition-all duration-300">
                <Navbar setIsOpen={setIsOpen} />
                <main className="p-4 sm:p-6 md:p-8 w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
