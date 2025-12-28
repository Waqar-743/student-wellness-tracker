
import React from 'react';

interface NavbarProps {
  currentStep: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentStep }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-[#e7ecf4] dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 lg:px-10 py-3">
      <div className="flex items-center gap-4">
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined !text-[32px]">health_metrics</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-tight">Wellness Tracker</h2>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-slate-600 dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
          <a className="text-slate-600 dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">Academics</a>
          <a className="text-primary text-sm font-bold" href="#">Wellness</a>
          <a className="text-slate-600 dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">Settings</a>
        </div>
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-[#e7ecf4]" style={{ backgroundImage: `url('https://picsum.photos/seed/student/100/100')` }}></div>
      </div>
      <button className="md:hidden flex items-center justify-center">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
};

export default Navbar;
