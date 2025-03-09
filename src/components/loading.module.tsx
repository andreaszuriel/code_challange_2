"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function LoadingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(".");
  const pathname = usePathname(); // Track route changes

  useEffect(() => {
    setLoading(true); // Start loading on route change
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulate loading duration

    return () => clearTimeout(timeout);
  }, [pathname]); // Trigger on every route change

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] z-50">
          <div className="relative w-32 h-32">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-full h-full border-2 border-[var(--accent)] rounded-lg shadow-lg transform-gpu"
            />
            <motion.div
              animate={{ rotateX: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-full h-full border-2 border-[var(--highlight)] rounded-lg shadow-lg transform-gpu"
            />
          </div>
          <h1 className="mt-8 text-2xl font-bold font-[Orbitron]">
            Loading{dots}
          </h1>
        </div>
      )}
      {children}
    </>
  );
}
