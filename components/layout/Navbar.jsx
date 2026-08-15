import React from 'react';
import { Download, User } from 'lucide-react';

const Navbar = () => {
  const handleExport = () => {
    window.print();
  };

  return (
    <nav className="h-16 shrink-0 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between z-20 print:hidden">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
          G
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">GenX</span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <User className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
