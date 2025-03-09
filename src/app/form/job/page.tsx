"use client";

import { useState } from "react";
import { useForm, UseFormRegister, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  ApplicationFormValues,
} from "@/lib/validator/application.schema";
import Backendless from "@/lib/backendless";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobApplicationForm() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    shouldUnregister: true,
  });

  const confirmSubmission = async () => {
    if (!formData) return;

    setShowConfirm(false);
    setLoading(true);

    try {
      // Convert form data to Backendless object
      const applicationData = {
        ...formData,
        preferredName: formData.preferredName || null,
      };

      await Backendless.Data.of("Applications").save(applicationData);

      toast.success("Your application has been submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        `Failed to submit application: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-4xl p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-accent flex flex-col justify-between mt-20 sm:mt-24 md:mt-28 lg:mt-32">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-accent">
          Job Application
        </h2>

        <form
          onSubmit={handleSubmit((data) => {
            setFormData(data);
            setShowConfirm(true);
          })}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 flex-grow"
        >
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            required
          />
          <InputField
            label="Preferred Name (Optional)"
            name="preferredName"
            register={register}
            error={errors.preferredName}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            register={register}
            error={errors.phone}
            required
          />
          <InputField
            label="Birth Date"
            name="birthDate"
            type="date"
            register={register}
            error={errors.birthDate}
            required
          />
          <InputField
            label="City"
            name="city"
            register={register}
            error={errors.city}
            required
          />
          <InputField
            label="Address"
            name="address"
            register={register}
            error={errors.address}
            required
          />
          <InputField
            label="Postcode"
            name="postcode"
            register={register}
            error={errors.postcode}
            required
          />
          <InputField
            label="Country"
            name="country"
            register={register}
            error={errors.country}
            required
          />

          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              className="w-full max-w-3xl py-3 text-lg bg-[#7c8a5a] text-white rounded-md font-semibold hover:bg-[#6a784a] transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-8"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="card p-6 text-center max-w-xs sm:max-w-sm md:max-w-md w-full">
            <h3 className="text-xl mb-4 text-primary">
              Are you sure you want to submit your application?
            </h3>
            <div className="flex justify-center space-x-2">
              <button
                onClick={confirmSubmission}
                className="w-1/2 py-2 px-4 text-sm font-semibold text-white bg-[#7c8a5a] rounded-md hover:bg-[#6a784a] transition-all duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-1/2 py-2 px-4 text-sm font-semibold text-white bg-[#cf2727] rounded-md hover:bg-red-700 transition-all duration-300"
              >
                Check Again
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

interface InputFieldProps {
  label: string;
  name: keyof ApplicationFormValues;
  type?: string;
  register: UseFormRegister<ApplicationFormValues>;
  error?: FieldError;
  required?: boolean;
}

function InputField({
  label,
  name,
  type = "text",
  register,
  error,
  required = false,
}: InputFieldProps) {
  return (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-[#7c8a5a]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...register(name, { required })}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-accent focus:border-accent"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}