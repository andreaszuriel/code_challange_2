"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Backendless from "@/lib/backendless";

interface Career {
  category: string;
  jobType: string;
  location: string;
  position: string;
  region: string;
  objectId: string;
  created: string;
}

export default function CareersPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", jobType: "", location: "", region: "" });
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Load state from localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("careersState") || "{}");
    setSearch(savedState.search || "");
    setFilters(savedState.filters || { category: "", jobType: "", location: "", region: "" });
    setSortOrder(savedState.sortOrder || "newest");
  }, []);

  // Save state to localStorage
  const saveState = () => {
    localStorage.setItem("careersState", JSON.stringify({
      search,
      filters,
      sortOrder
    }));
  };

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await Backendless.Data.of("Careers").find<Career>();
        setCareers(response);
        setFilteredCareers(response);
      } catch (err: any) {
        setError(`Failed to load careers: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  useEffect(() => {
    let filtered = careers.filter(job =>
      job.position.toLowerCase().includes(search.toLowerCase())
    );

    Object.keys(filters).forEach(key => {
      if (filters[key as keyof typeof filters]) {
        filtered = filtered.filter(
          job => job[key as keyof Career] === filters[key as keyof typeof filters]
        );
      }
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredCareers(filtered);
    saveState();
  }, [search, filters, careers, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setFilters({ category: "", jobType: "", location: "", region: "" });
    setSortOrder("newest");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-error">{error}</p>;

  return (
    <>
      <Head>
        <title>Careers - Join Our Team</title>
      </Head>
      
      <div className="container mx-auto p-6 pb-20">
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full mt-16 mb-12">
          <img
            src="/images/work.jpg"
            alt="Work Environment"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-[#7c8a5a]">
          Join Our Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Filters Section */}
          <div className="md:col-span-1">
            <div className="card p-4 mb-4">
              <h2 className="text-xl font-semibold mb-4 text-[#7c8a5a]">
                Search & Filters
              </h2>
              <input
                type="text"
                placeholder="Search by position..."
                className="input mb-4 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {["category", "jobType", "location", "region"].map((filterKey) => (
                <select
                  key={filterKey}
                  className="input mb-2 w-full"
                  value={filters[filterKey as keyof typeof filters]}
                  onChange={(e) =>
                    setFilters({ ...filters, [filterKey]: e.target.value })
                  }
                >
                  <option value="">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</option>
                  {[...new Set(careers.map((job) => job[filterKey as keyof Career]))].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ))}
              <div className="mt-4">
                <select
                  className="input mb-4 w-full"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                >
                  <option value="newest">Newest to Oldest</option>
                  <option value="oldest">Oldest to Newest</option>
                </select>
              </div>
              <button
                onClick={clearFilters}
                className="button button-secondary w-full mt-2"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-[#7c8a5a]">
              Job Openings
            </h2>
            {filteredCareers.length > 0 ? (
              <ul className="space-y-4">
                {filteredCareers.map((job) => (
                  <li
                    key={job.objectId}
                    className="card p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-[#7c8a5a]">
                        {job.position}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {job.category} • {job.jobType} • {job.location}, {job.region}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Posted on {new Date(job.created).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/careers/${job.objectId}`)}
                      className="button button-primary min-w-[100px]"
                    >
                      Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="card p-4 text-center text-gray-500">
                No job openings match your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}