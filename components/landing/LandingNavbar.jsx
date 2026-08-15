"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ArrowRight, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";

const LandingNavbar = ({ onOpenAuth }) => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/40 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-3.5 max-w-7xl mx-auto h-[72px]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
            G
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 font-ui">
            GenX
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-9 w-24 bg-gray-200/60 animate-pulse rounded-md" />
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-md shadow-sm transition-all duration-200 hover:shadow-indigo-500/20 hover:shadow-lg"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:ring-2 hover:ring-indigo-500/20 transition-all overflow-hidden focus:outline-hidden"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold">
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4 text-gray-600" />}
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate font-mono mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-gray-500" />
                      Dashboard
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-md shadow-sm transition-all duration-200 hover:shadow-indigo-500/20 hover:shadow-lg"
            >
              Start Building
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
