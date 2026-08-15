"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Download, LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
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
    <nav className="h-16 shrink-0 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between z-20 print:hidden">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-200 shadow-xs">
          G
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900 font-ui">GenX</span>
      </Link>

      <div className="flex items-center gap-3">
        {pathname === '/resume' && (
          <button 
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:ring-2 hover:ring-indigo-500/20 transition-all overflow-hidden focus:outline-hidden"
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
