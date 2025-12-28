
import React from 'react';
import { UserData } from '../types';

interface Step1Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ data, onUpdate, onNext }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center mb-8 text-center max-w-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center size-12 rounded-xl bg-white/80 dark:bg-slate-800 shadow-soft text-primary">
            <span className="material-symbols-outlined text-[28px]">health_and_safety</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Wellness Tracker</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Your Student Wellness Companion</p>
      </div>

      <div className="relative z-10 w-full max-w-[480px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="px-8 pt-8 pb-2">
          <div className="flex justify-between items-center mb-3">
            <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold tracking-wide">Step 1 of 7</p>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">14%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '14%' }}></div>
          </div>
        </div>

        <div className="p-8 pt-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Create your profile</h2>
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder="e.g. Waqar Ahmed" 
                  type="text"
                  value={data.fullName}
                  onChange={(e) => onUpdate({ fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department / Major</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">domain</span>
                </div>
                <input 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder="e.g. Computer Science" 
                  type="text"
                  value={data.department}
                  onChange={(e) => onUpdate({ department: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Semester</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </div>
                <select 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                  value={data.semester}
                  onChange={(e) => onUpdate({ semester: e.target.value })}
                >
                  <option disabled value="">Select your semester</option>
                  <option value="1">Semester 1 (Fall)</option>
                  <option value="2">Semester 2 (Spring)</option>
                  <option value="3">Semester 3 (Fall)</option>
                  <option value="4">Semester 4 (Spring)</option>
                  <option value="5">Semester 5 (Fall)</option>
                  <option value="6">Semester 6 (Spring)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:opacity-90 active:opacity-100 text-white rounded-lg font-bold text-base tracking-wide transition-all transform active:scale-[0.98] shadow-lg shadow-primary/25"
              >
                Next
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex gap-6 text-sm text-slate-400 dark:text-slate-500 font-medium">
        <a className="hover:text-primary transition-colors" href="#">Help</a>
        <a className="hover:text-primary transition-colors" href="#">Privacy</a>
        <a className="hover:text-primary transition-colors" href="#">Terms</a>
      </div>
    </div>
  );
};

export default Step1;
