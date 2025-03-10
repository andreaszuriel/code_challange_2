"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInForm } from "@/lib/validator/signin.schema";
import Backendless from "@/lib/backendless";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

interface LoginResponse {
  "user-token": string;
  objectId: string;
}

export default function SignIn() {
    const router = useRouter();
    const auth = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
    });

    async function onSubmit(data: SignInForm) {
        try {
            const response = await Backendless.UserService.login<LoginResponse>(
                data.email, 
                data.password, 
                true
            );

            if (!response["user-token"] || !response.objectId) {
                throw new Error("No user token or ID received");
            }

            auth?.login(response["user-token"], response.objectId);
            toast.success("✅ Sign in successful!", { autoClose: 2000 });
            router.push("/user/dashboard");
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? 
                (error.message.includes("3003") ? "❌ Invalid login credentials" : `⚠️ Sign in failed: ${error.message}`) : 
                "⚠️ An unknown error occurred";
            toast.error(errorMessage);
        }
    }

    const openNewTab = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background px-4 sm:px-6 md:px-8 space-y-6 mt-12 sm:mt-16 md:mt-24">
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
            
            <div className="card w-full sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-xl shadow-lg bg-gray-800 border border-gray-600">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#7c8a5a] mb-6">Sign In</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        {...register("email")} 
                        className="input" 
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                    
                    <input 
                        type="password" 
                        placeholder="Password" 
                        {...register("password")} 
                        className="input" 
                    />
                    {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                    
                    <button type="submit" className="button button-primary cursor-pointer">
                        Sign In
                    </button>
                </form>
                
                <p className="text-center text-[#f5f5dc] text-lg sm:text-base font-medium mt-4">
                    Don&apos;t have an account? {" "}
                    <button 
                        onClick={() => router.push("/auth/signup")}
                        className="text-[#7c8a5a] hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
            
            <div className="space-y-4 w-full sm:max-w-md md:max-w-lg">
                <button 
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-white bg-[#0a66c2]/80 text-lg font-semibold hover:bg-[#7c8a5a] transition cursor-pointer"
                    onClick={() => openNewTab("https://www.linkedin.com/login")}
                >
                    <FaLinkedin size={24} /> Sign in with LinkedIn
                </button>

                <button 
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-black bg-[#f1f1f1]/80 text-lg font-semibold hover:bg-[#7c8a5a] transition cursor-pointer"
                    onClick={() => openNewTab("https://accounts.google.com/")}
                >
                    <FcGoogle size={24} /> Sign in with Google
                </button>
            </div>
        </div>
    );
}