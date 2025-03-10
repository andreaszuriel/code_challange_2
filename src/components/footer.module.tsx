"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const [isHoverFooterVisible, setIsHoverFooterVisible] = useState(false);

  // Detect mouse hover at the bottom of the screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY >= window.innerHeight - 50) {
        setIsHoverFooterVisible(true); // Show hover footer
      } else {
        setIsHoverFooterVisible(false); // Hide hover footer
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Hover Footer (Appears when hovering near bottom) */}
      <footer
        className={`fixed bottom-0 left-0 w-full text-white p-4 transition-opacity duration-300 ${
          isHoverFooterVisible ? "opacity-100" : "opacity-0"
        } md:block`}
        style={{
          backgroundColor: "#811f34",
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="flex justify-between items-center px-6">
          <p className="text-md">
            This website is for learning purposes only, I don&apos;t have the right
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

      {/* Static Minimal Footer (Always visible at the bottom) */}
      <footer
        className="w-full text-white text-center p-4"
        style={{
          backgroundColor: "#8d9c6a",
          position: "static",
          bottom: 0,
          left: 0,
        }}
      >
        &copy; {new Date().getFullYear()} Solterra GreenTech. All rights
        reserved.
      </footer>
    </>
  );
};

export default Footer;
