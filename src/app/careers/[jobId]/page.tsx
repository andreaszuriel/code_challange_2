"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Backendless from "@/lib/backendless";

interface Career {
  category: string;
  jobType: string;
  location: string;
  position: string;
  region: string;
  objectId: string;
  created: string;
  expect: string;
  jobdesc: string;
  qualification: string;
  benefit: string;
  compensation: string;
}

interface RandomUser {
  name: string;
  email: string;
  phone: string;
  position: string;
}

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const randomUser: RandomUser = {
    name: "John Doe",
    email: "soltera_recruitment@solterragreentech.com",
    phone: "+1 555-123-4567",
    position: "Hiring Manager",
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await Backendless.Data.of("careers").findById<Career>(
          jobId as string
        );
        setJob(response);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(`Failed to load job details: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-error">{error}</p>;
  if (!job) return <p>Job not found.</p>;

  const splitTextToList = (text: string) => {
    return text.split("\n").map((line, index) => <li key={index}>{line}</li>);
  };

  return (
    <div className="container mx-auto p-6 mt-20 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 card p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {job.position}
          </h1>
          <p className="text-muted">
            <strong>Category:</strong> {job.category}
          </p>
          <p className="text-muted">
            <strong>Location:</strong> {job.location}, {job.region}
          </p>
          <p className="text-muted">
            <strong>Type:</strong> {job.jobType}
          </p>
          <p className="text-sm text-muted">
            Posted on: {new Date(job.created).toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Expect</h2>
          <p className="text-muted">{job.expect}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Job Description</h2>
          <ul className="list-disc pl-6 text-muted">
            {splitTextToList(job.jobdesc)}
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Qualification</h2>
          <ul className="list-disc pl-6 text-muted">
            {splitTextToList(job.qualification)}
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Compensation and Benefits
          </h2>

          <h3 className="text-l font-semibold mb-4">Benefit</h3>
          <p className="text-muted">
            As a full-time employee at Solterra GreenTech, you will receive a
            comprehensive benefits package, including:
          </p>
          <ul className="list-disc pl-6 text-muted">
            {splitTextToList(job.benefit)}
          </ul>

          <h3 className="text-l font-semibold mt-8 mb-4">Compensation</h3>
          <p style={{ color: "#8be98c", fontWeight: "bold" }}>
            {job.compensation}
          </p>

          <p className="text-muted mt-8">
            Pay offered may vary depending on multiple factors, including
            location, experience, job-related knowledge, and skills. The total
            compensation package may also include stock options or other
            incentives based on the position and company policies. More details
            will be provided upon receiving an offer of employment.
          </p>
          <p className="text-muted mt-4">
            Join Solterra GreenTech and help shape the future of sustainable
            energy solutions. Apply now and be part of the movement toward a
            greener tomorrow!
          </p>
        </div>

        <div className="col-span-1 lg:col-span-1 card h-fit p-6">
          <h2 className="text-xl font-semibold mb-6">
            Contact the Hiring Manager
          </h2>
          <div className="text-muted mb-4">
            <p>
              <strong>Name:</strong> {randomUser.name}
            </p>
            <p>
              <strong>Position:</strong> {randomUser.position}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${randomUser.email}`} className="text-blue-600">
                {randomUser.email}
              </a>
            </p>
            <p>
              <strong>Phone:</strong> {randomUser.phone}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-6">Apply for this job</h2>
          <button
            className="button button-primary w-full"
            onClick={() => router.push("/form/job")}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
