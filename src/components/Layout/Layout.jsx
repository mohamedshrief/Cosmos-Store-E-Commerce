import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="outlet-style min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
