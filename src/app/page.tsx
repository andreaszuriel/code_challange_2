import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const impactStats = [
  { value: "10M+", label: "Trees Planted" },
  { value: "5GW", label: "Clean Energy" },
  { value: "1M+", label: "Homes Powered" },
  { value: "95%", label: "Carbon Reduction" },
];

const coreValues = [
  { 
    title: "Innovation First",
    description: "Pushing boundaries in renewable tech"
  },
  { 
    title: "Eco Integrity",
    description: "Sustainability in every decision"
  },
  { 
    title: "Community Focus",
    description: "Empowering local solutions"
  },
  { 
    title: "Global Impact",
    description: "Worldwide sustainability network"
  }
];

const teamMembers = [
  { 
    name: "Azriel Schwarz",
    role: "CEO & Founder",
    photo: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  { 
    name: "Jane Smith",
    role: "Head Engineer",
    photo: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  { 
    name: "Michael Brown",
    role: "Sustainability Lead",
    photo: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  { 
    name: "Sarah Lee",
    role: "Community Director",
    photo: "https://randomuser.me/api/portraits/women/30.jpg"
  }
];

export const metadata: Metadata = {
  title: "Solterra GreenTech | Sustainable Energy Solutions",
  description: "Pioneering renewable energy technologies for a greener tomorrow. Explore our innovative solutions and join the sustainability revolution.",
  keywords: ["solar energy", "wind power", "renewable tech", "sustainable solutions"],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-gradient-to-b from-[#0a192f] to-[#102a44]">
        <div className="absolute inset-0 z-0 opacity-30">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label="Sustainable energy solutions in action"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-4 text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-[#8d9c6a]">
              Powering Tomorrow <br className="hidden md:block" />
              <span className="text-[#76c7c0]">With Today's Green Tech</span>
            </h1>
            <div className="mt-12 space-x-6">
              <Link href="/service" className="button button-primary py-4 px-8 text-lg">
                🚀 Explore Solutions
              </Link>
              <Link href="/about" className="button button-outline py-4 px-8 text-lg">
                🌱 Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Services */}
      <section className="min-h-screen bg-[#102a44] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#8d9c6a]">
            Our Sustainable Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="card hover:transform hover:scale-105 transition-all">
                <div className="relative h-64 w-full">
                  <Image
                    src={`/images/services/service${num}.jpg`}
                    alt={`Service ${num} Energy Solutions`}
                    fill
                    className="object-cover rounded-t-xl"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-[#76c7c0]">
                    {num === 1 ? 'Solar' : num === 2 ? 'Wind' : 'Hybrid'} Systems
                  </h3>
                  <p className="text-[#8d9c6a]">
                    Next-gen {num === 1 ? 'solar' : num === 2 ? 'wind' : 'hybrid'} energy solutions
                  </p>
                  <Link 
                    href="/service" 
                    className="button button-outline mt-4 w-full text-center py-3"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="min-h-screen bg-gradient-to-br from-[#102a44] to-[#16324f] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#8d9c6a]">
            Global Impact Metrics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold mb-2 text-[#76c7c0]">{stat.value}</div>
                <div className="text-sm md:text-lg text-[#8d9c6a]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative h-96 rounded-2xl overflow-hidden group">
                <Image
                  src={`/images/services/service${num}.jpg`}
                  alt={`Impact ${num}`}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xl font-bold text-center">
                    {num === 1 ? 'Solar Solutions' : num === 2 ? 'Wind Energy' : 'Hybrid Systems'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="min-h-screen bg-[#0a192f] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-[#8d9c6a]">
                Pioneering Green Tech Since 2015
              </h2>
              <p className="text-lg text-[#8d9c6a]/90">
                From humble beginnings to global sustainability leaders, we're committed to 
                revolutionizing energy consumption through innovation and integrity.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {coreValues.map((value, index) => (
                  <div key={index} className="card p-4">
                    <div className="text-[#76c7c0] text-xl mb-2">✦</div>
                    <h3 className="text-lg font-bold text-[#8d9c6a]">{value.title}</h3>
                    <p className="text-sm text-[#8d9c6a]/80">{value.description}</p>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/about" 
                className="button button-primary w-full md:w-auto text-center py-4 px-8"
              >
                🧭 Discover Our Journey →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="card p-4 text-center">
                  <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#8d9c6a]">{member.name}</h3>
                  <p className="text-sm text-[#76c7c0]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}