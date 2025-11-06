import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-gray-100">

            <div className="w-64 bg-[#0f172a] text-white flex flex-col">
                <Sidebar />
            </div>


            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
