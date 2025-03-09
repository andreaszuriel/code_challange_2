"use client";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Content {
  quote: string;
  author: string;
}

interface FlipCardProps {
  frontContent: Content;
  backContent: Content;
}

const FlipCard = ({ frontContent, backContent }: FlipCardProps) => {
  return (
    <div className="flip-card w-full h-[200px] sm:w-[400px]">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="text-[#3a4d39] font-semibold text-sm sm:text-base">
            {frontContent.quote} <br />
            <span className="block mt-2 text-xs font-medium">
              {frontContent.author}
            </span>
          </p>
        </div>
        <div className="flip-card-back">
          <p className="text-[#3a4d39] font-semibold text-sm sm:text-base">
            {backContent.quote} <br />
            <span className="block mt-2 text-xs font-medium">
              {backContent.author}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const router = useRouter();
  const services = [
    {
      title: "Smart Green Buildings",
      description: "Energy-efficient designs with intelligent automation to optimize power usage.",
      link: "#smart-green-buildings",
    },
    {
      title: "Solar & Wind Energy",
      description: "High-performance renewable energy systems tailored for residential, commercial, and industrial needs.",
      link: "#solar-wind-energy",
    },
    {
      title: "Sustainable Architecture Consulting",
      description: "Eco-friendly materials and designs that reduce carbon footprints.",
      link: "#sustainable-architecture",
    },
    {
      title: "Energy Storage & Smart Grids",
      description: "Advanced battery storage and grid optimization for maximum efficiency.",
      link: "#energy-storage",
    },
  ];

  const testimonials = [
    {
      front: {
        quote: "The transition to wind and solar energy was seamless with Solterra’s exceptional support.",
        author: "— Oliver B., New York"
      },
      back: {
        quote: "Their team was available 24/7 during implementation. Truly outstanding service!",
        author: "— Oliver B., New York"
      }
    },
    {
      front: {
        quote: "Solterra's green building technologies reduced our energy usage while improving comfort.",
        author: "— Emma W., Sydney"
      },
      back: {
        quote: "We achieved LEED certification thanks to their sustainable architecture expertise.",
        author: "— Emma W., Sydney"
      }
    },
    {
      front: {
        quote: "Thanks to Solterra's energy storage solutions, we now have reliable, clean energy 24/7.",
        author: "— Sophia K., London"
      },
      back: {
        quote: "The smart grid integration has optimized our energy consumption patterns.",
        author: "— Sophia K., London"
      }
    },
  ];

  const images = [
    "/images/services/service1.jpg",
    "/images/services/service2.jpg",
    "/images/services/service3.jpg",
    "/images/services/service4.jpg",
  ];

  return (
    <main className="text-foreground">
      <Head>
        <title>Services - Solterra GreenTech</title>
        <meta
          name="description"
          content="Discover our sustainable energy solutions and green technologies for a better future."
        />
        <meta property="og:title" content="Services - Solterra GreenTech" />
        <meta
          property="og:description"
          content="Explore our eco-friendly energy solutions and sustainable architecture services."
        />
      </Head>

      {/* Services Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center text-white px-6 py-16 sm:px-10 md:px-20 relative mt-16 sm:mt-20">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-xl"
          style={{ backgroundImage: "url('/images/service.jpg')" }}
        ></div>
        <div className="absolute inset-0 w-full h-full bg-black/50 rounded-xl"></div>
        <div className="relative z-10 w-full sm:w-3/4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide neon-text font-orbitron mb-8">
            Our Solutions
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.link}
                className="p-6 bg-white/10 backdrop-blur-md border border-accent rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-green-400/30 flex flex-col items-center text-center"
              >
                <h3 className="text-xl sm:text-2xl font-semibold neon-text">
                  {service.title}
                </h3>
                <p className="mt-3 text-gray-300 font-play text-sm sm:text-base hidden sm:block">
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Video Background Section */}
      <section className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/service-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute w-full text-center bottom-1/4 px-6">
          <h3 className="text-2xl sm:text-3xl font-bold neon-text font-orbitron text-white">
            🌍 Powering a Sustainable Future
          </h3>
          <p className="text-gray-300 font-play mt-4 text-lg sm:text-xl">
            At Solterra GreenTech, we are committed to innovating for a greener
            tomorrow.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative flex flex-col items-center px-6 py-12 sm:px-10 mt-[2.7cm] sm:mt-28 mb-[100px] w-full max-w-[1400px] mx-auto">
        <div className="absolute inset-0 mx-auto w-full max-w-[1300px] bg-gray-400/20 backdrop-blur-md rounded-xl px-6 py-12"></div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold neon-text font-orbitron text-center mb-6">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 w-full max-w-[1300px]">
          <div className="flex justify-center items-center w-full">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={4000}
              className="w-[90%] sm:w-[500px] lg:w-[600px] h-[450px]"
            >
              {images.map((src, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={src}
                    alt={`Green Energy ${index + 1}`}
                    className="object-cover w-full h-[450px] rounded-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full sm:w-[80%] md:w-[400px] p-4 bg-[#a5b49a] border border-accent rounded-lg shadow-lg"
              >
                {/* Mobile Static Content */}
                <div className="sm:hidden">
                  <p className="text-[#3a4d39] font-semibold text-sm">
                    {testimonial.front.quote}
                    <span className="block mt-2 text-xs font-medium">
                      {testimonial.front.author}
                    </span>
                  </p>
                </div>
                
                {/* Desktop Flip Cards */}
                <div className="hidden sm:block">
                  <FlipCard
                    frontContent={testimonial.front}
                    backContent={testimonial.back}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-[75px] hidden sm:flex flex-wrap space-x-8 justify-center w-full">
            <button
              onClick={() => router.push("/contact")}
              className="button button-primary text-lg py-3 px-6 rounded-lg"
            >
              Talk to Our Service Team
            </button>
            <button
              onClick={() => router.push("/service/products")}
              className="button button-outline text-lg py-3 px-6 rounded-lg"
            >
              See Our Products
            </button>
          </div>

          <div className="absolute bottom-[-75px] sm:hidden flex flex-row justify-between w-full max-w-[300px] left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => router.push("/contact")}
              className="button button-primary text-sm py-2 px-4 rounded-md w-[48%] text-center"
            >
              Contact Us
            </button>
            <button
              onClick={() => router.push("/service/products")}
              className="button button-outline text-sm py-2 px-4 rounded-md w-[48%] text-center"
            >
              Products
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  );
}