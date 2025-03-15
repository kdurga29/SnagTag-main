// src/app/dashboard/DashboardClient.tsx
"use client";

import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const quotes = [
  "Save more!!!",
  "Stay organized!",
  "Keep it simple!",
];

interface DashboardClientProps {
  user: KindeUser<Record<string, any>> | null; // Match the return type of getUser
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout button

  const handleLogout = () => {
    window.location.href = "/api/auth/logout"; // Redirect to logout endpoint
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative">
            {/* Profile Icon */}
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition-colors duration-200"
              aria-label="Toggle logout menu"
            >
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>

            {/* Logout Button */}
            <AnimatePresence>
              {showLogout && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={handleLogout}
                  className="absolute right-0 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-20 p-8">
        <div className="container mx-auto max-w-4xl">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, {user?.given_name || "Guest"}!
            </h2>
          </div>

          {/* Quote */}
          <div className="mb-8 text-center">
            <p className="text-gray-600 italic">
              "{quotes[Math.floor(Math.random() * quotes.length)]}"
            </p>
          </div>

          {/* Paste URL Box */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Paste your URL here..."
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                aria-label="Paste URL"
              />
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                aria-label="Add URL"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}