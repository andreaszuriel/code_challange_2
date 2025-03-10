"use client";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TeamMember = {
  name: string;
  role: string;
  img: string;
  bio: string;
  slug: string;
};

export default function AboutPage() {
  const tetradicColors = [
    "#233564",
    "#f1e5c9",
    "#642335",
    "#356423",
  ];
  const router = useRouter();

  const handleMemberClick = (slug: string) => {
    router.push(`/team/${slug}`);
  };

  return (
    <>
      <Head>
        <title>About Us - Solterra GreenTech</title>
        <meta
          name="description"
          content="Learn more about Solterra GreenTech, our team, and our mission to build a sustainable future through innovative renewable energy solutions."
        />
        <meta
          name="keywords"
          content="renewable energy, sustainability, green tech, Solterra GreenTech"
        />
        <meta property="og:title" content="About Us - Solterra GreenTech" />
        <meta
          property="og:description"
          content="Learn more about Solterra GreenTech, our team, and our mission to build a sustainable future through innovative renewable energy solutions."
        />
        <meta property="og:image" content="/images/logo2.png" />
        <meta
          property="og:url"
          content="https://www.solterragreentech.com/about"
        />
        <link rel="canonical" href="https://www.solterragreentech.com/about" />
      </Head>

      <main className="bg-primary text-foreground min-h-screen">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-extrabold tracking-wide font-orbitron">
            About Us
          </h1>
          <p className="text-lg max-w-3xl mx-auto mt-4 opacity-80 font-play">
            At Solterra GreenTech, we are committed to building a sustainable
            future through innovative renewable energy solutions.
          </p>
        </section>

        {/* Video Section */}
        <section className="relative w-full h-[60vh] -mt-8 mb-8 mx-auto max-w-[calc(100%-64px)]">
          <video
            src="/videos/service-video.mp4"
            muted
            loop
            className="w-full h-full object-cover"
            style={{ pointerEvents: "none" }}
            aria-label="Background video"
          />
        </section>

        {/* Company Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 pb-12">
          {[
            {
              title: "Our History",
              content: [
                "Founded in 2015, Solterra GreenTech started as a small initiative to promote clean energy.",
                "Today, we are a global leader in solar, wind, and hybrid renewable solutions, helping communities transition to sustainable energy.",
              ],
            },
            {
              title: "Our Core Values",
              content: [
                "Innovation – Pioneering solutions in renewable energy.",
                "Sustainability – Committed to reducing environmental impact.",
                "Integrity – Ethical business practices at the core of our mission.",
              ],
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border-l-4 border-accent hover:scale-105 transition-all"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="text-lg text-gray-300 font-play space-y-3">
                {section.content.map((text, idx) => (
                  <p key={idx} className="font-normal opacity-90">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Meet the Team */}
        <section className="text-center px-8 pb-12">
          <h2 className="text-3xl font-bold font-orbitron">Meet Our Team</h2>
          <p className="mb-6 text-lg text-gray-300 font-play">
            Our leadership is dedicated to driving sustainable innovation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Azriel Schwarz",
                role: "Founder & CEO",
                img: "https://randomuser.me/api/portraits/men/1.jpg",
                bio: "Azriel has over 15 years of experience in renewable energy and is passionate about creating sustainable solutions for the future.",
                slug: "azriel-schwarz"
              },
              {
                name: "Jane Smith",
                role: "Head of Engineering",
                img: "https://randomuser.me/api/portraits/women/1.jpg",
                bio: "Jane is an expert in renewable energy systems and has led multiple large-scale solar and wind projects.",
                slug: "jane-smith"
              },
              {
                name: "Michael Brown",
                role: "Sustainability Director",
                img: "https://randomuser.me/api/portraits/men/2.jpg",
                bio: "Michael is dedicated to reducing environmental impact and has implemented innovative sustainability initiatives across the company.",
                slug: "michael-brown"
              },
            ].map((person, index) => {
              const backgroundColor =
                tetradicColors[index % tetradicColors.length];
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center shadow-lg hover:scale-105 transition-all border border-gray-600 cursor-pointer"
                  style={{ backgroundColor }}
                  onClick={() => handleMemberClick(person.slug)}
                >
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 mx-auto rounded-full border-4 border-accent mb-3"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-sm text-gray-400">{person.role}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              href="/teams"
              className="inline-block px-8 py-3 bg-[#233564] text-white rounded-lg hover:bg-[#642335] transition-colors duration-300"
            >
              Discover More About Our Team
            </Link>
          </div>
        </section>

        {/* Company Culture Section */}
        <section className="py-12 px-8 mt-12 relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3 bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg border-r-4 border-[#7c8a5a] hover:scale-105 transition-all min-h-[250px]">
              <div className="flex flex-col h-full justify-between">
                <h2
                  className="text-3xl font-extrabold font-orbitron mb-4 text-center md:text-left"
                  style={{ color: "#7c8a5a" }}
                >
                  Our Culture
                </h2>
                <div className="text-lg opacity-80 font-play text-white space-y-3 text-center sm:text-left md:text-right">
                  <p className="leading-snug">
                    At Solterra GreenTech, we foster a culture of sustainable
                    innovation and collaborative problem-solving. Our teams work
                    in cross-functional units where engineers, environmental
                    scientists, and community experts collaborate daily.
                  </p>
                  <p className="leading-snug">
                    Employee empowerment is key - every team member gets 20%
                    time for green passion projects and a yearly sustainability
                    stipend for personal environmental initiatives.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 h-[250px] md:h-auto">
              <div className="border-4 border-[#7c8a5a] rounded-lg h-full overflow-hidden">
                <Image
                  src="/images/work.jpg"
                  alt="Our Culture"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-800 text-white py-12 px-8 mt-12 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <Image
                src="/images/logo2.png"
                alt="Solterra GreenTech Logo"
                width={256}
                height={128}
                className="w-48 h-24 sm:w-64 sm:h-32 object-contain"
                loading="lazy"
              />
            </div>

            <div className="text-center sm:text-right">
              <Link href="/contact">
                <h2
                  className="text-3xl font-extrabold font-orbitron mb-4 hover:underline cursor-pointer"
                  style={{ color: "#7c8a5a" }}
                >
                  Contact Us
                </h2>
              </Link>
              <div className="space-y-2">
                <p className="text-sm sm:text-base">
                  <strong>Address:</strong> 124 Solar St, Renewable City, CA 94043
                </p>
                <p className="text-sm sm:text-base">
                  <strong>Phone:</strong> +1 (800) 555-1234
                </p>
                <p className="text-sm sm:text-base">
                  <strong>Email:</strong> info@solterragreentech.com
                </p>
                <p className="text-sm sm:text-base">
                  <strong>Hours:</strong> Mon-Fri 9AM-5PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}