"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Download, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = ({ title, onTitleChange }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleExport = () => {
    window.print();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="h-16 shrink-0 w-full bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center justify-between z-20 print:hidden gap-1.5 sm:gap-3">
      <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
        <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-200 shadow-xs">
            G
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 font-ui hidden xs:inline">GenX</span>
        </Link>

        {pathname === '/resume' && title !== undefined && (
          <>
            <div className="h-5 w-px bg-gray-200 shrink-0"></div>
            <div className="relative flex-1 min-w-0 max-w-[100px] xs:max-w-[160px] sm:max-w-xs md:max-w-sm group/title">
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange?.(e.target.value)}
                className="w-full font-ui text-xs sm:text-sm md:text-base font-medium text-gray-700 bg-transparent border border-transparent hover:border-gray-200 hover:bg-gray-50 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded px-1.5 sm:px-3 py-1 transition-all outline-hidden truncate"
                placeholder="Untitled Resume"
                title="Rename Resume"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {session && pathname !== '/dashboard' && (
          <Link 
            href="/dashboard"
            className="flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded shadow-2xs transition-all"
            title="Go to Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        )}

        {pathname === '/resume' && (
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded shadow-xs transition-colors"
            title="Export as PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center hover:ring-2 hover:ring-indigo-500/20 transition-all overflow-hidden focus:outline-hidden"
          >
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4 text-gray-600" />}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {session?.user?.name || "Logged in user"}
                </p>
                <p className="text-[11px] text-gray-500 truncate font-mono mt-0.5">
                  {session?.user?.email || ""}
                </p>
              </div>

              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Landing Page
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
