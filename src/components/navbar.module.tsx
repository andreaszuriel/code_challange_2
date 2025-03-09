"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/lib/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      auth.refreshUser();
    }
  }, [auth, auth?.userToken]); // Fixed dependency array

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    setShowConfirm(true);
  };

  const confirmSignOut = () => {
    auth?.logout();
    setDropdownOpen(false);
    setShowConfirm(false);
    router.push("/auth/signin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full transition-all duration-300 ${
          scrolling
            ? "bg-black/50 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        } text-white p-4 z-50`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="w-full flex items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/solterra.png"
              alt="Solterra Logo"
              width={120}
              height={40}
              unoptimized
            />
          </Link>

          <div className="md:hidden flex items-center ml-auto space-x-2">
            {auth?.isAuthenticated && (
              <span className="text-xs text-white">
                Hello, {auth.username || "..."}
              </span>
            )}
            <button onClick={toggleMenu} className="text-2xl md:text-3xl">
              &#9776;
            </button>
          </div>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeMenu}
              />
              <div className="md:hidden fixed top-16 inset-x-0 bottom-0 bg-black/90 text-white flex flex-col items-center justify-center z-50">
                <ul className="flex flex-col space-y-6 text-center">
                  <li>
                    <Link
                      href="/about"
                      className="text-2xl hover:text-gray-300"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/service"
                      className="text-2xl hover:text-gray-300"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teams"
                      className="text-2xl hover:text-gray-300"
                    >
                      Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-2xl hover:text-gray-300"
                    >
                      Contact
                    </Link>
                  </li>
                  {auth?.isAuthenticated ? (
                    <>
                      <li>
                        <Link
                          href="/user/dashboard"
                          className="text-2xl hover:text-gray-300"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="text-2xl text-red-500 hover:text-red-700"
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/auth/signin"
                          className="text-2xl hover:text-gray-300"
                        >
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/auth/signup"
                          className="text-2xl hover:text-gray-300"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </>
          )}

          <ul className="hidden md:flex space-x-6 text-lg">
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/service" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/teams" className="hover:text-gray-300">
                Teams
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>

          <div className="relative flex items-center space-x-2 hidden md:flex">
            {auth?.isAuthenticated && (
              <span className="text-lg font-semibold">
                Hello, {auth.username || "..."}
              </span>
            )}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center focus:outline-none border border-gray-600"
            >
              👤
            </button>

            {dropdownOpen && (
              <motion.div
                className="absolute top-[140%] right-0 w-48 bg-black/80 text-white shadow-lg rounded-lg py-2 border border-gray-700 z-50 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {auth?.isAuthenticated ? (
                  <>
                    <Link
                      href="/user/dashboard"
                      className="block px-4 py-2 hover:bg-gray-700 rounded"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-700 rounded"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-2 hover:bg-gray-700 rounded"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2 hover:bg-gray-700 rounded"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-center max-w-xs sm:max-w-sm md:max-w-md w-full">
            <h3 className="text-xl mb-4 text-[#7c8a5a]">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmSignOut}
                className="py-2 px-4 text-sm bg-[#7c8a5a] text-white rounded hover:bg-[#6a7850] transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="py-2 px-4 text-sm bg-[#cf2827] text-white rounded hover:bg-[#b02020] transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label className="label block text-gray-600">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
          disabled ? "cursor-not-allowed opacity-60" : "focus:ring-blue-500"
        }`}
      />
    </div>
  );
}