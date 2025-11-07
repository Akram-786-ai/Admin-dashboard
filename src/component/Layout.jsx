import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />


            <div className="flex-1 flex flex-col w-full">

                <Navbar setIsOpen={setIsOpen} />


                <main
                    className="
        flex-1 
        p-3 sm:p-5 md:p-8 
        mt-[60px] md:mt-0   /* mobile pe navbar ke niche space */
        w-full 
        overflow-x-hidden 
        transition-all 
        duration-300
      "
                >
                    {children}
                </main>
            </div>
        </div>

    );
}
