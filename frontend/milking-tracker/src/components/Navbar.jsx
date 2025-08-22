import { useNavigate } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <nav className="bg-white/20 backdrop-blur-md p-4 shadow-md flex items-center justify-between">
    <div></div>

    <div className="flex-1 flex justify-center">
      <h1 className="text-white font-bold text-xl">MilkTracker</h1>
    </div>
  
   
  </nav>
  
  );
}
