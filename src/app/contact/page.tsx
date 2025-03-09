"use client";

import { useState } from "react";
import Backendless from "@/lib/backendless";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaTelegram,
  FaGoogle,
} from "react-icons/fa6";
import { SiSignal } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Backendless.Data.of("messages").save(formData);
      toast.success("We received your message! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <ToastContainer />

      {/* Contact Form Box */}
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-accent p-8 mt-12 sm:mt-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-foreground">Contact Us</h1>
        <p className="text-center text-gray-300 mt-2 text-sm sm:text-base lg:text-lg">
          We’d love to hear from you! Fill out the form below.
        </p>

        <div className="bg-white/5 p-6 rounded-lg shadow-lg mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label className="block text-foreground font-semibold capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-accent text-foreground text-sm sm:text-base"
                />
              </div>
            ))}

            <div>
              <label className="block text-foreground font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-accent text-foreground text-sm sm:text-base"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7c8a5a] text-white py-2 rounded font-semibold hover:bg-[#6a784a] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="text-center mt-12 sm:mt-16 mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-semibold">Connect With Us</h2>
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#0A66C2] transition-colors duration-300"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#1877F2] transition-colors duration-300"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#C13584] transition-colors duration-300"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#1DA1F2] transition-colors duration-300"
          >
            <FaXTwitter size={28} />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#25D366] transition-colors duration-300"
          >
            <FaWhatsapp size={28} />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#0088CC] transition-colors duration-300"
          >
            <FaTelegram size={28} />
          </a>
          <a
            href="https://signal.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#3A9E9F] transition-colors duration-300"
          >
            <SiSignal size={28} />
          </a>
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#DB4437] transition-colors duration-300"
          >
            <FaGoogle size={28} />
          </a>
        </div>
      </div>
    </main>
  );
}