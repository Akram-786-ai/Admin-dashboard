import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-1 flex flex-col">
                <Navbar setIsOpen={setIsOpen} />
                <main className="p-4 sm:p-6 md:p-8 w-full overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}
