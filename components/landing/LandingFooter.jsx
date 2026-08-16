import React from "react";

const LandingFooter = () => {
  return (
    <footer className="bg-white/60 backdrop-blur-md border-t border-gray-200/60 w-full py-8 sm:py-12 mt-12 sm:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto gap-4 sm:gap-6 text-center md:text-left">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            G
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900 font-ui">
            GenX
          </span>
        </div>



        <div className="text-[11px] font-mono text-gray-400">
          © {new Date().getFullYear()} GenX Studio.
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
