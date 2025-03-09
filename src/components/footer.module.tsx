"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect mouse hover at the bottom of the screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY >= window.innerHeight - 50) {
        setIsVisible(true); // Show footer 
      } else {
        setIsVisible(false); // Hide footer 
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <footer
        className={`fixed bottom-0 left-0 w-full text-white p-4 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } md:block`} 
        style={{
          backgroundColor: "#811f34", 
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="flex justify-between items-center px-6">
          <p className="text-md">
            {" "}
            This website is for learning purposes only, I don't have the right
            for the images or videos that I use.
          </p>
          <div>
            <Image
              src="/images/solterra.png"
              alt="Logo"
              width={80}  
              height={80} 
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
