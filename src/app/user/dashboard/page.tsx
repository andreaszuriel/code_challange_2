"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Backendless from "@/lib/backendless";
import { AuthContext } from "@/lib/context/AuthContext";
import { toast } from "react-toastify";

interface UserProfile {
  objectId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export default function UserProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!auth?.authToken) {
      const savedToken = Cookies.get("authToken");
      const savedUserId = Cookies.get("userId");

      if (savedToken && savedUserId) {
        auth?.login(savedToken, savedUserId);
      } else {
        router.push("/auth/signin");
        return;
      }
    }

    const fetchUserData = async () => {
      try {
        const response =
          (await Backendless.UserService.getCurrentUser()) as any;
        if (!response || !response.objectId)
          throw new Error("User data not found");

        setUser({
          objectId: response.objectId,
          username: response.username || "",
          firstName: response.firstName || "",
          lastName: response.lastName || "",
          email: response.email || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user data");
        router.push("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth, router]);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUpdate = () => {
    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    if (!user) return;
    setShowConfirm(false);

    try {
      await Backendless.Data.of("Users").save(user);
      toast.success("Profile updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return <p className="text-center text-muted">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md sm:max-w-lg md:max-w-2xl p-6 shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center text-primary">
          Profile Settings
        </h2>

        <div className="space-y-4 mt-6">
          {["username", "firstName", "lastName"].map((field) => (
            <InputField
              key={field}
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              value={user?.[field as keyof UserProfile] || ""}
              onChange={(e) =>
                handleChange(field as keyof UserProfile, e.target.value)
              }
            />
          ))}
          <InputField label="Email" value={user?.email || ""} disabled />
        </div>

        <button
          onClick={handleUpdate}
          className="button button-primary w-full mt-6 py-2 text-sm md:text-base"
        >
          Update Profile
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="card p-6 text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl mb-4 text-primary">
              Are you sure you want to update your profile?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={confirmUpdate}
                className="button button-primary py-2 px-4 text-sm sm:text-base flex-1"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="button !bg-[#cf2727] text-white !hover:bg-red-700 !border-[#cf2727] py-2 px-4 text-sm sm:text-base flex-1"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label className="label block text-gray-600">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
          disabled ? "cursor-not-allowed opacity-60" : "focus:ring-blue-500"
        }`}
      />
    </div>
  );
}
