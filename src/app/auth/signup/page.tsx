"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Backendless from "@/lib/backendless";
import { AuthContext } from "@/lib/context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { signUpSchema, SignUpForm } from "@/lib/validator/signup.schema";
import Link from "next/link";

// Fix: Extend Backendless User Type
type BackendlessUser = {
    objectId: string;
    "user-token": string;
} & Backendless.User;

export default function SignUp() {
    const router = useRouter();
    const auth = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpForm) => {
        try {
            const newUser = await Backendless.UserService.register(data);
            console.log("User registered:", newUser);

            // Fix: Ensure correct typing for Backendless login response
            const loginResponse = await Backendless.UserService.login(
                data.email,
                data.password,
                true
            ) as BackendlessUser;

            console.log("Login Response:", loginResponse);

            if (!loginResponse["user-token"] || !loginResponse.objectId) {
                throw new Error("Login after sign-up failed");
            }

            auth?.login(loginResponse["user-token"], loginResponse.objectId);

            toast.success("Sign-up successful! Redirecting...");
            router.push("/user/dashboard");
        } catch (error: any) {
            console.error("Signup Error:", error);
            const errorMessage = error?.message || "Failed to sign up. Please try again.";

            if (errorMessage.includes("User already exists")) {
                toast.error("Email is already in use. Please use a different email.");
            } else {
                toast.error(errorMessage);
            }
        }
    };

    const openNewTab = (url: string) => window.open(url, "_blank");

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background px-4 sm:px-6 md:px-8 space-y-6 mt-12 sm:mt-16 md:mt-24">
            <div className="w-full sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-xl shadow-lg bg-gray-800 border border-gray-600">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#7c8a5a] mb-6">
                    Create Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Username */}
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username")}
                        className="input"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                    {/* First Name */}
                    <input
                        type="text"
                        placeholder="First Name"
                        {...register("firstname")}
                        className="input"
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}

                    {/* Last Name */}
                    <input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastname")}
                        className="input"
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="input"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="input"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
                        className="input"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`button button-primary ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Already Have an Account? */}
                <p className="text-center text-[#f5f5dc] text-lg sm:text-base font-medium mt-4">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-[#7c8a5a] hover:underline font-semibold">
                        Sign In
                    </Link>
                </p>
            </div>

            {/* Social Sign-Up Buttons */}
            <div className="space-y-4 w-full sm:max-w-md md:max-w-lg">
                <button
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-white bg-[#0a66c2]/80 text-lg font-semibold hover:bg-[#7c8a5a] transition cursor-pointer"
                    onClick={() => openNewTab("https://www.linkedin.com/login")}
                >
                    <FaLinkedin size={24} /> Sign Up with LinkedIn
                </button>

                <button
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-black bg-[#f1f1f1]/80 text-lg font-semibold hover:bg-[#7c8a5a] transition cursor-pointer"
                    onClick={() => openNewTab("https://accounts.google.com/")}
                >
                    <FcGoogle size={24} /> Sign Up with Google
                </button>
            </div>
        </div>
    );
}
