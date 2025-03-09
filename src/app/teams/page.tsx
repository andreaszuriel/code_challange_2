"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import Head from "next/head";

// Tetradic colors for #1c2a50 (dark blue)
const tetradicColors = [
  "#1c2a50", // Base color (dark blue)
  "#e3d9c6", // Complementary color (light yellowish beige)
  "#501c2a", // Analogous color 1 (deep red)
  "#2a501c", // Analogous color 2 (dark green)
];

// Function to calculate brightness of a hex color
const isLightColor = (hex: string): boolean => {
  const color = hex.replace("#", "");
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // Using the luminance formula to determine brightness
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return brightness > 127.5; // Threshold to determine light or dark color
};

export default function TeamsPage() {
  const router = useRouter();
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const team = useMemo(
    () => [
      {
        id: 1,
        name: "Azriel Schwarz",
        position: "Chief Executive Officer (CEO)",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        email: "azriel.schwarz@solterragreentech.com",
        phone: "+1 (555) 123-4567",
      },
      {
        id: 2,
        name: "Emma Fischer",
        position: "Chief Operating Officer (COO)",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        email: "emma.fischer@solterragreentech.com",
        phone: "+1 (555) 234-5678",
      },
      {
        id: 3,
        name: "Lukas Schneider",
        position: "Chief Technology Officer (CTO)",
        image: "https://randomuser.me/api/portraits/men/25.jpg",
        email: "lukas.schneider@solterragreentech.com",
        phone: "+1 (555) 345-6789",
      },
      {
        id: 4,
        name: "Sophia Wagner",
        position: "Chief Marketing Officer (CMO)",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        email: "sophia.wagner@solterragreentech.com",
        phone: "+1 (555) 456-7890",
      },
      {
        id: 5,
        name: "Maximilian Becker",
        position: "Chief Financial Officer (CFO)",
        image: "https://randomuser.me/api/portraits/men/18.jpg",
        email: "maximilian.becker@solterragreentech.com",
        phone: "+1 (555) 567-8901",
      },
      {
        id: 6,
        name: "Hannah Braun",
        position: "Head of Sales",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        email: "hannah.braun@solterra.com",
        phone: "+1 (555) 678-9012",
      },
    ],
    []
  );

  // Function to toggle the flip state
  const handleFlip = (index: number) => {
    setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Meet Our Team - Solterra GreenTech</title>
        <meta
          name="description"
          content="Meet the passionate leaders driving innovation and success at Solterra GreenTech."
        />
      </Head>

      <div className="w-full p-8 min-h-screen flex flex-col justify-between">
        {/* Title Section */}
        <div className="text-center mt-16">
          <h1 className="text-5xl font-extrabold text-accent">Meet Our Team</h1>
          <p className="text-lg text-muted max-w-3xl mx-auto mt-4">
            At Solterra GreenTech, our success comes from our team of passionate
            leaders. Get to know the people driving our innovation and success.
          </p>
        </div>

        {/* Team Members */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {team.map((member, index) => {
            const backgroundColor =
              tetradicColors[index % tetradicColors.length];
            const textColorClass = isLightColor(backgroundColor)
              ? "text-black"
              : "text-white";

            return (
              <motion.div
                key={member.id}
                className="relative w-full h-80 cursor-pointer perspective text-center flex flex-col items-center justify-center rounded-xl shadow-lg p-6"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleFlip(index)}
                style={{ backgroundColor }}
              >
                <div
                  className={`flip-card-inner relative w-full h-full transition-transform duration-500 transform ${
                    flippedIndex === index ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of the Card */}
                  <div
                    className={`flip-card-front p-6 bg-white/10 backdrop-blur-md border border-accent rounded-xl shadow-lg flex flex-col items-center justify-center space-y-4 ${textColorClass}`}
                  >
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      width={128}
                      height={128}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-accent object-cover"
                      loading="lazy"
                    />
                    <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-center">
                      {member.name}
                    </h2>
                    <p className="font-medium text-center text-sm sm:text-base">
                      {member.position}
                    </p>
                  </div>

                  {/* Back of the Card */}
                  <div className="flip-card-back absolute inset-0 bg-black/80 text-white flex items-center justify-center p-6 space-y-4 rounded-xl">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
                      <p className="text-lg font-semibold">{member.email}</p>
                      <p className="text-lg font-semibold">{member.phone}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Values & Culture Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-accent">
            Our Values & Culture
          </h2>
          <p className="text-muted mt-4">
            At Solterra GreenTech, we foster a culture of visionary leadership
            and continuous learning. We believe in streamlined workflows,
            creativity, and financial responsibility while always prioritizing
            customer satisfaction and sustainable growth.
          </p>
        </div>

        {/* Join Our Team Button */}
        <div className="mt-8 mb-16 text-center">
          <button
            className="button button-primary button-lg"
            onClick={() => router.push("/careers")}
          >
            Join Our Team
          </button>
        </div>
      </div>
    </>
  );
}
